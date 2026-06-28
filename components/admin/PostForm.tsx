import { FormEvent, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FaSave, FaArrowLeft, FaImage, FaBold, FaItalic, FaHeading, FaListUl, FaListOl, FaLink, FaQuoteLeft, FaEye, FaCode, FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa'
import AdminLayout from './AdminLayout'
import { createPost, getPost, getImageUrl, updatePost, uploadToLocal, processBody } from '../../lib/api'
import type { PostFormData } from '../../types/blog'

interface PostFormProps {
  postId?: string
}

const emptyForm: PostFormData = {
  title: '',
  body: '',
  excerpt: '',
  meta_title: '',
  meta_description: '',
  keywords: '',
  is_published: false,
  image: null,
}

export default function PostForm({ postId }: PostFormProps) {
  const router = useRouter()
  const isEdit = !!postId
  const [form, setForm] = useState<PostFormData>(emptyForm)
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!postId) return
    getPost(postId)
      .then((post) => {
        setForm({
          title: post.title,
          body: post.body,
          excerpt: post.excerpt,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          keywords: post.keywords,
          is_published: !!post.is_published,
          image: null,
        })
        setExistingImage(getImageUrl(post.image))
      })
      .catch(() => setError('Impossible de charger l\'article'))
      .finally(() => setLoading(false))
  }, [postId])

  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (field: keyof PostFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const formatText = (before: string, after: string) => {
    const el = bodyRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = form.body
    const selected = text.substring(start, end)
    const replacement = selected ? `${before}${selected}${after}` : before
    const newBody = text.substring(0, start) + replacement + text.substring(end)
    setForm((prev) => ({ ...prev, body: newBody }))
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + replacement.length - after.length)
    })
  }

  const formatLink = () => {
    const el = bodyRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = form.body
    const selected = text.substring(start, end)
    const url = prompt('Lien URL:', 'https://')
    if (!url) return
    const linkText = selected || 'texte du lien'
    const replacement = `<a href="${url}">${linkText}</a>`
    const newBody = text.substring(0, start) + replacement + text.substring(end)
    setForm((prev) => ({ ...prev, body: newBody }))
  }

  const [showPreview, setShowPreview] = useState(false)
  const [fileError, setFileError] = useState('')

  const prependToLine = (prefix: string) => {
    const el = bodyRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = form.body
    if (start === end) {
      const before = text.substring(0, start)
      const after = text.substring(start)
      const newBody = before + prefix + after
      setForm((prev) => ({ ...prev, body: newBody }))
      requestAnimationFrame(() => {
        el.focus()
        el.setSelectionRange(start + prefix.length, start + prefix.length)
      })
      return
    }
    const lines = text.split('\n')
    let charCount = 0
    const newLines = lines.map((line, i) => {
      const lineStart = charCount
      const lineEnd = charCount + line.length
      charCount += line.length + 1
      if (lineEnd < start || lineStart > end) return line
      if (line.trim().startsWith(prefix.trim())) return line
      return prefix + line
    })
    setForm((prev) => ({ ...prev, body: newLines.join('\n') }))
    requestAnimationFrame(() => { el.focus() })
  }



  const bodyImageRef = useRef<HTMLInputElement>(null)
  const [bodyImageUploading, setBodyImageUploading] = useState(false)

  const resizeImage = (dataUrl: string, maxW: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const w = Math.min(img.width, maxW)
        const h = Math.round(img.height * (w / img.width))
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) { resolve(dataUrl); return }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.onerror = () => resolve(dataUrl)
      img.src = dataUrl
    })
  }

  const insertBodyImage = async (file: File) => {
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setFileError('L\'image ne doit pas dépasser 5 Mo')
      return
    }
    setBodyImageUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const dataUrl = reader.result as string
        const resized = await resizeImage(dataUrl, 800)
        const url = await uploadToLocal(resized, 'posts')
        const el = bodyRef.current
        if (!el) return
        const start = el.selectionStart
        const end = el.selectionEnd
        const text = form.body
        const imgTag = `<img src="${url}" alt="" />`
        const newBody = text.substring(0, start) + imgTag + text.substring(end)
        setForm((prev) => ({ ...prev, body: newBody }))
        requestAnimationFrame(() => {
          el.focus()
          el.setSelectionRange(start + imgTag.length, start + imgTag.length)
        })
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setFileError(err instanceof Error ? err.message : "Échec de l'upload de l'image")
    } finally {
      setBodyImageUploading(false)
    }
  }

  const handleImageChange = (file: File | null) => {
    setFileError('')
    if (file) {
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        setFileError('L\'image ne doit pas dépasser 5 Mo')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
      setPreview(URL.createObjectURL(file))
    } else {
      setForm((prev) => ({ ...prev, image: null }))
      setPreview(null)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const fields = { ...form }
      if (fields.image && fields.image.startsWith('data:')) {
        fields.image = await uploadToLocal(fields.image)
      }
      let result
      if (isEdit && postId) {
        result = await updatePost(postId, fields)
      } else {
        result = await createPost(fields)
      }
      setSuccess(result.is_published ? 'Article publié avec succès!' : 'Article enregistré (brouillon)')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title={isEdit ? 'Modifier l\'article' : 'Nouvel article'}>
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isEdit ? 'Modifier l\'article' : 'Nouvel article'}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/posts" className="text-gray-500 hover:text-navy-800 transition-colors">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold text-navy-900">
            {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-5">
            <h2 className="text-lg font-semibold text-navy-800 border-b pb-3">Contenu</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Extrait *</label>
              <textarea
                required
                rows={3}
                value={form.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-gray-50 resize-none"
                placeholder="Résumé court affiché dans la liste des articles"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Corps de l&apos;article *</label>
              <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-100 rounded-lg border border-gray-300">
                <button type="button" onClick={() => formatText('<strong>', '</strong>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm font-bold transition-colors" title="Gras"><FaBold /></button>
                <button type="button" onClick={() => formatText('<em>', '</em>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm italic transition-colors" title="Italique"><FaItalic /></button>
                <button type="button" onClick={() => formatText('<h2>', '</h2>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm font-bold transition-colors" title="Titre H2"><FaHeading /><sup>2</sup></button>
                <button type="button" onClick={() => formatText('<h3>', '</h3>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm font-bold transition-colors" title="Titre H3"><FaHeading /><sup>3</sup></button>
                <button type="button" onClick={() => prependToLine('- ')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Liste à puces (-)"><FaListUl /></button>
                <button type="button" onClick={() => prependToLine('1. ')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Liste numérotée (1.)"><FaListOl /></button>
                <button type="button" onClick={formatLink} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Lien"><FaLink /></button>
                <span className="w-px h-6 bg-gray-300 mx-1 self-center" />
                <button type="button" onClick={() => formatText('<div style="text-align: left;">', '</div>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Aligné à gauche"><FaAlignLeft /></button>
                <button type="button" onClick={() => formatText('<div style="text-align: center;">', '</div>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Centré"><FaAlignCenter /></button>
                <button type="button" onClick={() => formatText('<div style="text-align: right;">', '</div>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Aligné à droite"><FaAlignRight /></button>
                <span className="w-px h-6 bg-gray-300 mx-1 self-center" />
                <button type="button" onClick={() => formatText('<blockquote><p>', '</p></blockquote>')} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Citation"><FaQuoteLeft /></button>
                <button type="button" onClick={() => bodyImageRef.current?.click()} disabled={bodyImageUploading} className="px-3 py-1.5 bg-white rounded hover:bg-gold-100 text-sm transition-colors" title="Insérer une image"><FaImage /></button>
                <span className="w-px h-6 bg-gray-300 mx-1 self-center" />
                <button type="button" onClick={() => setShowPreview(!showPreview)} className={`px-3 py-1.5 rounded text-sm transition-colors ${showPreview ? 'bg-gold-500 text-white' : 'bg-white hover:bg-gold-100'}`} title="Aperçu">{showPreview ? <FaCode /> : <FaEye />}</button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={bodyImageRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) insertBodyImage(file)
                  e.target.value = ''
                }}
              />
              {showPreview ? (
                <div className="prose prose-lg max-w-none p-6 border border-gray-300 rounded-lg bg-white min-h-[200px] overflow-auto" dangerouslySetInnerHTML={{ __html: processBody(form.body) }} />
              ) : (
                <textarea
                  ref={bodyRef}
                  required
                  rows={12}
                  value={form.body}
                  onChange={(e) => handleChange('body', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-gray-50 resize-y font-mono text-sm"
                  placeholder="Contenu complet de l'article (HTML supporté)"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="flex items-start space-x-4">
                {(preview || existingImage) && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={preview || existingImage!} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  {fileError && (
                    <p className="text-red-600 text-sm mb-2">{fileError}</p>
                  )}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gold-500 hover:bg-gold-50 transition-colors">
                  <FaImage className="text-2xl text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Cliquez pour choisir une image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
            </div>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => handleChange('is_published', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500 bg-gray-50"
              />
              <span className="text-sm font-medium text-gray-700">Publier l&apos;article</span>
            </label>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 space-y-5">
            <h2 className="text-lg font-semibold text-navy-800 border-b pb-3">SEO</h2>

            {(form.meta_title || form.meta_description) && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-lg">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Aperçu Google</p>
                <p className="text-blue-700 text-sm font-medium leading-tight truncate">{form.meta_title || 'Titre de l\'article'}</p>
                <p className="text-green-700 text-xs mt-0.5">{typeof window !== 'undefined' ? window.location.origin : ''}/blog/{form.title?.toLowerCase().replace(/\s+/g, '-') || 'slug'}</p>
                <p className="text-gray-600 text-xs mt-0.5 line-clamp-2">{form.meta_description || 'Description de l\'article...'}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title *</label>
              <p className="text-xs text-gray-500 mb-2">Titre affiché dans l&apos;onglet du navigateur et comme lien cliquable dans Google. 50-60 caractères recommandé.</p>
              <input
                type="text"
                required
                value={form.meta_title}
                onChange={(e) => handleChange('meta_title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-gray-50"
                placeholder="Ex: Étanchéité Toiture Tunis | Prix et Devis Gratuit | Époxy & Étanchéité"
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{form.meta_title.length} caractères</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description *</label>
              <p className="text-xs text-gray-500 mb-2">Court résumé (1-2 phrases) qui apparaît sous le titre dans Google. 150-160 caractères recommandé.</p>
              <textarea
                required
                rows={2}
                value={form.meta_description}
                onChange={(e) => handleChange('meta_description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-gray-50 resize-none"
                placeholder="Ex: Découvrez nos services d'étanchéité de toiture à Tunis. Devis gratuit et intervention rapide pour protéger votre maison des infiltrations d'eau."
              />
              <p className="text-xs text-gray-400 mt-1 text-right">{form.meta_description.length} caractères</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mots-clés *</label>
              <input
                type="text"
                required
                value={form.keywords}
                onChange={(e) => handleChange('keywords', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-gray-50"
                placeholder="époxy, étanchéité, toiture"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/posts"
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-bold text-navy-900 transition-all duration-300 shadow-lg disabled:opacity-60"
              style={{ backgroundColor: '#eab308' }}
            >
              <FaSave />
              <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
