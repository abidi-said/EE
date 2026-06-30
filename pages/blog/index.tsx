import { useEffect, useState } from 'react'
import { FaNewspaper } from 'react-icons/fa'
import BlogLayout from '../../components/blog/BlogLayout'
import BlogCard from '../../components/blog/BlogCard'
import { getPosts } from '../../lib/api'
import type { Post } from '../../types/blog'

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then((paginated) => setPosts(paginated.data.filter(p => p.is_published)))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <BlogLayout
      title="Blog"
      description="Actualités, conseils et guides sur l'étanchéité et l'époxy en Tunisie."
    >
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-6">
              <FaNewspaper className="text-2xl text-gold-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Conseils, actualités et guides sur l&apos;étanchéité et les revêtements époxy
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun article publié pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Revenez bientôt pour découvrir nos actualités.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  )
}
