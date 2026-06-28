import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'
import AdminLayout from '../../../components/admin/AdminLayout'
import { deletePost, formatDate, getImageUrl, getAdminPosts } from '../../../lib/api'
import type { Post } from '../../../types/blog'

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [localImages, setLocalImages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)

  const loadPosts = () => {
    setLoading(true)
    Promise.all([
      getAdminPosts(),
      fetch('/api/post-image').then(r => r.json()).catch(() => ({})),
    ])
      .then(([data, localMap]) => {
        setPosts(data.data)
        setLocalImages(localMap)
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadPosts() }, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Supprimer « ${title} » ?`)) return
    setDeleting(id)
    try {
      await deletePost(id)
      await fetch('/api/post-image', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id }),
      }).catch(() => {})
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Erreur lors de la suppression')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <AdminLayout title="Articles">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Articles</h1>
          <p className="text-gray-500 text-sm mt-1">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg font-bold text-navy-900 transition-all duration-300 shadow-lg hover:scale-105"
          style={{ backgroundColor: '#eab308' }}
        >
          <FaPlus />
          <span>Nouvel article</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500 mb-6">Aucun article pour le moment</p>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg font-bold text-navy-900"
            style={{ backgroundColor: '#eab308' }}
          >
            <FaPlus />
            <span>Créer le premier article</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium">Article</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden md:table-cell">Statut</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden lg:table-cell">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {(() => {
                            const src = localImages[post.id] || getImageUrl(post.image)
                            return src ? (
                              <img src={src} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>
                            )
                          })()}
                        </div>
                        <div>
                          <p className="font-medium text-navy-900 line-clamp-1">{post.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {post.is_published ? (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <FaEye className="text-xs" />
                          <span>Publié</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          <FaEyeSlash className="text-xs" />
                          <span>Brouillon</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        {post.is_published && (
                          <Link
                            href={`/blog/${post.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-navy-800 transition-colors"
                            title="Voir"
                          >
                            <FaEye />
                          </Link>
                        )}
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 text-gray-400 hover:text-gold-600 transition-colors"
                          title="Modifier"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
