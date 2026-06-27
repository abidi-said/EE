import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = { url: string } | { error: string }

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { image, folder } = req.body
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'Missing image data' })
  }

  const matches = image.match(/^data:image\/(\w+);base64,(.+)$/)
  if (!matches) {
    return res.status(400).json({ error: 'Invalid image format' })
  }

  const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
  const data = matches[2]
  const buffer = Buffer.from(data, 'base64')
  const filename = `${Date.now()}.${ext}`
  const subfolder = typeof folder === 'string' ? folder : ''
  const dir = path.join(process.cwd(), 'public', 'uploads', subfolder)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  const filepath = path.join(dir, filename)
  fs.writeFileSync(filepath, buffer)

  const host = req.headers.host || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const url = `${protocol}://${host}/uploads/${subfolder}${subfolder ? '/' : ''}${filename}`

  res.status(200).json({ url })
}
