import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export interface SlideData {
  image: string
  title: string
  location: string
}

export interface SiteConfig {
  heroVideo: string
  heroThumbnail: string
  slides: SlideData[]
}

const configPath = path.join(process.cwd(), 'data', 'site-config.json')

function readConfig(): SiteConfig {
  const raw = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(raw)
}

function writeConfig(config: SiteConfig) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.host === 'localhost:3000') {
      return parsed.pathname
    }
  } catch {}
  return url
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const config = readConfig()
    config.heroVideo = normalizeUrl(config.heroVideo)
    config.heroThumbnail = normalizeUrl(config.heroThumbnail)
    config.slides = config.slides.map((s) => ({ ...s, image: normalizeUrl(s.image) }))
    return res.status(200).json(config)
  }

  if (req.method === 'PUT') {
    const { heroVideo, heroThumbnail, slides } = req.body as Partial<SiteConfig>
    const current = readConfig()
    if (typeof heroVideo === 'string') current.heroVideo = heroVideo
    if (typeof heroThumbnail === 'string') current.heroThumbnail = heroThumbnail
    if (Array.isArray(slides)) current.slides = slides
    writeConfig(current)
    return res.status(200).json(current)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
