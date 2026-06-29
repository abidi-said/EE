import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'post-images.json')

type ImageMap = Record<string, string>

function readMap(): ImageMap {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  } catch {
    return {}
  }
}

function writeMap(map: ImageMap) {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(map, null, 2))
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const map = readMap()
    const { id } = req.query
    if (id) return res.status(200).json({ imagePath: map[String(id)] || null })
    return res.status(200).json(map)
  }

  if (req.method === 'PUT') {
    const { postId, imagePath } = req.body
    if (!postId) return res.status(400).json({ error: 'Missing postId' })
    const map = readMap()
    if (imagePath) {
      map[String(postId)] = imagePath
    } else {
      delete map[String(postId)]
    }
    writeMap(map)
    return res.status(200).json({ success: true })
  }

  if (req.method === 'DELETE') {
    const { postId } = req.body
    if (!postId) return res.status(400).json({ error: 'Missing postId' })
    const map = readMap()
    delete map[String(postId)]
    writeMap(map)
    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
