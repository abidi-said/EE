import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
import Toast from '../../components/admin/Toast'
import { uploadToLocal } from '../../lib/api'
import { FaUpload, FaPlay, FaSave, FaTimes, FaSpinner } from 'react-icons/fa'
import type { SiteConfig } from '../api/site-config'

const STATIC_MODE = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_STATIC_MODE === 'true'

export default function AdminVideoPage() {
  const router = useRouter()
  useEffect(() => {
    if (STATIC_MODE) router.replace('/admin/posts')
  }, [])
  if (STATIC_MODE) return null
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<'video' | 'thumbnail' | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const closeToast = useCallback(() => setToast(null), [])
  const videoRef = useRef<HTMLInputElement>(null)
  const thumbRef = useRef<HTMLInputElement>(null)

  const loadConfig = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/site-config')
      const data = await res.json()
      setConfig(data)
    } catch {
      setToast({ type: 'error', message: 'Erreur lors du chargement de la configuration' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadConfig() }, [])

  const getUploadPath = (url: string): string | null => {
    const m = url.match(/\/uploads\/(.+)$/)
    return m ? m[1] : null
  }

  const deleteFile = async (url: string) => {
    const uploadPath = getUploadPath(url)
    if (!uploadPath) return
    try {
      await fetch(`/api/uploads/${uploadPath}`, { method: 'DELETE' })
    } catch {}
  }

  const handleUpload = async (file: File, type: 'video' | 'thumbnail') => {
    const maxSize = type === 'video' ? 100 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      setToast({ type: 'error', message: type === 'video' ? 'La vidéo ne doit pas dépasser 50 Mo' : 'L\'image ne doit pas dépasser 5 Mo' })
      return
    }
    const oldUrl = config?.[type === 'video' ? 'heroVideo' : 'heroThumbnail']
    setUploading(type)
    setToast(null)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const dataUrl = reader.result as string
        const folder = type === 'video' ? 'video' : 'thumbnail'
        const url = await uploadToLocal(dataUrl, folder)
        setConfig((prev) => prev ? { ...prev, [type === 'video' ? 'heroVideo' : 'heroThumbnail']: url } : null)
        if (oldUrl) await deleteFile(oldUrl)
        setToast({ type: 'success', message: `${type === 'video' ? 'Vidéo' : 'Miniature'} uploadée avec succès!` })
        setUploading(null)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : "Échec de l'upload" })
      setUploading(null)
    }
  }

  const handleSave = async () => {
    if (!config) return
    setSaving(true)
    setToast(null)
    try {
      const res = await fetch('/api/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroVideo: config.heroVideo, heroThumbnail: config.heroThumbnail }),
      })
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde')
      setToast({ type: 'success', message: 'Vidéo enregistrée avec succès!' })
    } catch (err) {
      setToast({ type: 'error', message: err instanceof Error ? err.message : 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Vidéo Hero">
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Vidéo Hero">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-navy-900 mb-8">Vidéo de la section Hero</h1>

        {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vidéo actuelle</label>
            {config?.heroVideo ? (
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <video className="w-full max-h-80 object-contain" controls>
                  <source src={config.heroVideo} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-12 text-center text-gray-400">
                <FaPlay className="mx-auto text-3xl mb-2" />
                <p>Aucune vidéo</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Changer la vidéo</label>
            <input
              type="file"
              accept="video/mp4"
              ref={videoRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleUpload(file, 'video')
                e.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={() => videoRef.current?.click()}
              disabled={uploading === 'video'}
              className="flex items-center space-x-2 px-4 py-2.5 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
            >
              {uploading === 'video' ? <FaSpinner className="animate-spin" /> : <FaUpload />}
              <span>{uploading === 'video' ? 'Upload...' : 'Choisir une vidéo MP4'}</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">Max 100 Mo. Format MP4 uniquement.</p>
          </div>

          <div className="border-t pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Miniature de la vidéo</label>
            {config?.heroThumbnail ? (
              <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 max-w-sm">
                <img src={config.heroThumbnail} alt="Miniature" className="w-full h-48 object-cover" />
              </div>
            ) : (
              <div className="mb-3 rounded-lg bg-gray-100 p-8 text-center text-gray-400 max-w-sm">
                <p className="text-sm">Aucune miniature</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={thumbRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleUpload(file, 'thumbnail')
                e.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={() => thumbRef.current?.click()}
              disabled={uploading === 'thumbnail'}
              className="flex items-center space-x-2 px-4 py-2.5 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors disabled:opacity-50"
            >
              {uploading === 'thumbnail' ? <FaSpinner className="animate-spin" /> : <FaUpload />}
              <span>{uploading === 'thumbnail' ? 'Upload...' : 'Choisir une image'}</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">Max 5 Mo. Idéalement 1200×630 px.</p>
          </div>

          <div className="pt-4 border-t">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-bold text-navy-900 transition-all shadow-lg disabled:opacity-60"
              style={{ backgroundColor: '#eab308' }}
            >
              {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
              <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
