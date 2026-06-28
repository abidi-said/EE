import type { LoginResponse, PaginatedPosts, Post } from '../types/blog'

const API_BASE = 'https://api.epoxy.tn/api'

const TOKEN_KEY = 'epoxy_admin_token'
const USER_KEY = 'epoxy_admin_user'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setAuth(token: string, user: LoginResponse['user']) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

function authHeaders(): HeadersInit {
  const token = getToken()
  const headers: HeadersInit = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json()
  if (!res.ok) {
    const message = data.message || data.error || 'Une erreur est survenue'
    throw new Error(typeof message === 'string' ? message : JSON.stringify(message))
  }
  return data
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const params = new URLSearchParams({ email, password })
  const res = await fetch(`${API_BASE}/login?${params}`, { method: 'POST' })
  const data = await handleResponse<LoginResponse>(res)
  setAuth(data.token, data.user)
  return data
}

export async function getPosts(): Promise<PaginatedPosts> {
  const res = await fetch(`${API_BASE}/posts`)
  const data = await handleResponse<{ status: boolean; posts: PaginatedPosts }>(res)
  return data.posts
}

export async function getAdminPosts(): Promise<PaginatedPosts> {
  const res = await fetch(`${API_BASE}/posts`, { headers: authHeaders() })
  const data = await handleResponse<{ status: boolean; posts: PaginatedPosts }>(res)
  return data.posts
}

export async function getPost(id: string | number): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`)
  const data = await handleResponse<{ status: boolean; post: Post }>(res)
  return data.post
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData()
  form.append('source', file)
  const res = await fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5', {
    method: 'POST',
    body: form,
  })
  const data = await res.json()
  if (data.status_code !== 200) throw new Error(data.error?.message || "Échec de l'upload de l'image")
  return data.image.url
}

export async function uploadToLocal(dataUrl: string, folder?: string): Promise<string> {
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: dataUrl, folder }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Échec de l'upload local")
  return data.url
}

async function jsonPostFields(fields: {
  title: string
  body: string
  excerpt: string
  meta_title: string
  meta_description: string
  keywords: string
  is_published: boolean
  image?: string | null
}) {
  const body: Record<string, unknown> = {
    title: fields.title,
    body: fields.body,
    excerpt: fields.excerpt,
    meta_title: fields.meta_title,
    meta_description: fields.meta_description,
    keywords: fields.keywords,
    is_published: fields.is_published,
  }
  if (fields.image) body.image = fields.image
  return JSON.stringify(body)
}

export async function createPost(fields: {
  title: string
  body: string
  excerpt: string
  meta_title: string
  meta_description: string
  keywords: string
  is_published: boolean
  image?: string | null
}): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: await jsonPostFields(fields),
  })
  const data = await handleResponse<{ status: boolean; post: Post }>(res)
  return data.post
}

export async function updatePost(
  id: string | number,
  fields: {
    title: string
    body: string
    excerpt: string
    meta_title: string
    meta_description: string
    keywords: string
    is_published: boolean
    image?: string | null
  }
): Promise<Post> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: await jsonPostFields(fields),
  })
  const data = await handleResponse<{ status: boolean; post: Post }>(res)
  return data.post
}

export async function deletePost(id: string | number): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  await handleResponse(res)
}

export function getImageUrl(image: string | null): string | null {
  if (!image) return null
  if (image.startsWith('data:')) return image
  if (image.startsWith('/tmp/')) return null
  if (image.startsWith('/uploads/')) return image
  if (image.startsWith('http')) return image
  return `https://api.epoxy.tn/storage/${image}`
}

export function processBody(body: string): string {
  let html = body
  html = html.replace(/((?:^[-•]\s.+(\n|$))+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^[-•]\s+?/, '')}</li>`).join('')
    return `<ul>${items}</ul>\n`
  })
  html = html.replace(/((?:^\d+\.\s.+(\n|$))+)/gm, (match) => {
    const items = match.trim().split('\n').map(l => `<li>${l.replace(/^\d+\.\s+?/, '')}</li>`).join('')
    return `<ol>${items}</ol>\n`
  })
  return html
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
