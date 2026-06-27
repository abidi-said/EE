export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  body: string
  meta_title: string
  meta_description: string
  keywords: string
  image: string | null
  is_published: number | boolean
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface PaginatedPosts {
  current_page: number
  data: Post[]
  last_page: number
  per_page: number
  total: number
}

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface PostFormData {
  title: string
  body: string
  excerpt: string
  meta_title: string
  meta_description: string
  keywords: string
  is_published: boolean
  image?: string | null
}
