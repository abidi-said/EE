import Link from 'next/link'
import { FaCalendar, FaArrowRight } from 'react-icons/fa'
import { formatDate, getImageUrl } from '../../lib/api'
import type { Post } from '../../types/blog'

interface BlogCardProps {
  post: Post
  localImage?: string | null
}

export default function BlogCard({ post, localImage }: BlogCardProps) {
  const imageUrl = localImage && !localImage.startsWith('<') ? localImage : getImageUrl(post.image)
  const imageMarkup = localImage?.startsWith('<') ? localImage : null
  const imageSrc = imageMarkup ? imageMarkup.match(/src="([^"]+)"/)?.[1] : imageUrl

  return (
    <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      <Link href={`/blog/${post.id}`}>
        <div className="aspect-video bg-navy-100 overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-900">
              <img src="/images/logo/EE-logo.png" alt="" className="w-16 h-16 opacity-30" />
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FaCalendar className="mr-2 text-gold-500" />
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-navy-800 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
          <span className="inline-flex items-center text-navy-800 font-medium group-hover:text-gold-600 transition-colors">
            Lire la suite
            <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Link>
    </article>
  )
}
