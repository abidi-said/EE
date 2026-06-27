import { FaNewspaper } from 'react-icons/fa'
import BlogLayout from '../../components/blog/BlogLayout'
import BlogCard from '../../components/blog/BlogCard'
import type { Post } from '../../types/blog'

interface BlogIndexPageProps {
  initialPosts: Post[]
}

export default function BlogIndexPage({ initialPosts }: BlogIndexPageProps) {
  return (
    <BlogLayout
      title="Blog"
      description="Actualités, conseils et guides sur l'étanchéité et l'époxy en Tunisie."
    >
      <section className="py-12 bg-gray-50">
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

          {initialPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucun article publié pour le moment.</p>
              <p className="text-gray-400 text-sm mt-2">Revenez bientôt pour découvrir nos actualités.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {initialPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  )
}

export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.epoxy.tn/api'
    const res = await fetch(`${baseUrl}/posts`)
    const json = await res.json()
    const posts: Post[] = (json.posts?.data || []).filter((p: Post) => p.is_published)
    return { props: { initialPosts: posts } }
  } catch {
    return { props: { initialPosts: [] } }
  }
}
