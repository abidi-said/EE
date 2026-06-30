import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'public', 'uploads', ...(req.query.path as string[]))

  if (req.method === 'DELETE') {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Not found' })
    }
    fs.unlinkSync(filePath)
    return res.status(200).json({ deleted: true })
  }

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Not found' })
  }
  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const data = fs.readFileSync(filePath)
  res.setHeader('Content-Type', contentType)
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  res.send(data)
}
