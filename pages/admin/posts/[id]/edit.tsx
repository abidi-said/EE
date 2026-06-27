import { useRouter } from 'next/router'
import PostForm from '../../../../components/admin/PostForm'

export default function EditPostPage() {
  const router = useRouter()
  const { id } = router.query
  return <PostForm postId={typeof id === 'string' ? id : undefined} />
}
