import { useEffect, useState, useRef } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { uploadToLocal } from '../../lib/api'
import { FaUpload, FaTrash, FaCheck, FaTimes, FaSpinner, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import type { SiteConfig, SlideData } from '../api/site-config'

export default function AdminSliderPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const loadConfig = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/site-config')
      const data = await res.json()
      setConfig(data)
    } catch {
      setMessage({ type: 'error', text: 'Erreur lors du chargement' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadConfig() }, [])

  const saveConfig = async (updated: SiteConfig) => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error('Erreur lors de la sauvegarde')
      setConfig(updated)
      setMessage({ type: 'success', text: 'Modifications enregistrées!' })
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Erreur' })
    } finally {
      setSaving(false)
    }
  }

  const uploadFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        reject(new Error(`${file.name}: l'image ne doit pas dépasser 5 Mo`))
        return
      }
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string
          const url = await uploadToLocal(dataUrl, 'slider')
          resolve(url)
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error(`Erreur de lecture: ${file.name}`))
      reader.readAsDataURL(file)
    })
  }

  const handleUpload = async (files: File[]) => {
    setUploading(true)
    setMessage(null)
    setUploadProgress({ current: 0, total: files.length })
    const newSlides: SlideData[] = []
    const errors: string[] = []
    for (let i = 0; i < files.length; i++) {
      setUploadProgress({ current: i + 1, total: files.length })
      try {
        const url = await uploadFile(files[i])
        newSlides.push({ image: url, title: 'Nouveau projet', location: '' })
      } catch (err) {
        errors.push(err instanceof Error ? err.message : `Erreur: ${files[i].name}`)
      }
    }
    if (newSlides.length > 0) {
      const updated = config
        ? { ...config, slides: [...config.slides, ...newSlides] }
        : { heroVideo: '', slides: newSlides }
      setConfig(updated)
      await saveConfig(updated)
    }
    if (errors.length > 0) {
      setMessage({ type: 'error', text: errors.join('; ') })
    }
    setUploadProgress(null)
    setUploading(false)
  }

  const handleDelete = async (index: number) => {
    if (!config) return
    const slide = config.slides[index]
    if (!confirm(`Supprimer « ${slide.title} » ?`)) return
    const updated = { ...config, slides: config.slides.filter((_, i) => i !== index) }
    await saveConfig(updated)
  }

  const handleMove = async (index: number, direction: -1 | 1) => {
    if (!config) return
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= config.slides.length) return
    const slides = [...config.slides]
    const temp = slides[index]
    slides[index] = slides[newIndex]
    slides[newIndex] = temp
    await saveConfig({ ...config, slides })
  }

  const startEdit = (index: number) => {
    if (!config) return
    setEditingIndex(index)
    setEditTitle(config.slides[index].title)
    setEditLocation(config.slides[index].location)
  }

  const saveEdit = async (index: number) => {
    if (!config) return
    const slides = config.slides.map((s, i) =>
      i === index ? { ...s, title: editTitle, location: editLocation } : s
    )
    setEditingIndex(null)
    await saveConfig({ ...config, slides })
  }

  if (loading) {
    return (
      <AdminLayout title="Slider">
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Slider">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Slider</h1>
            <p className="text-gray-500 text-sm mt-1">{config?.slides.length || 0} image{(config?.slides.length || 0) > 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center space-x-3">
            {saving && <FaSpinner className="animate-spin text-gray-400" />}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg font-bold text-navy-900 transition-all shadow-lg hover:scale-105 disabled:opacity-60"
              style={{ backgroundColor: '#eab308' }}
            >
              {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
              <span>{uploading ? (uploadProgress ? `Upload ${uploadProgress.current}/${uploadProgress.total}...` : 'Upload...') : 'Ajouter des images'}</span>
            </button>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileRef}
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files || [])
            if (files.length > 0) handleUpload(files)
            e.target.value = ''
          }}
        />

        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {message.type === 'success' ? <FaCheck className="inline mr-1" /> : <FaTimes className="inline mr-1" />}
            {message.text}
          </div>
        )}

        {(!config?.slides || config.slides.length === 0) ? (
          <div className="bg-white rounded-xl shadow-lg p-16 text-center text-gray-400">
            <p className="text-lg">Aucune image dans le slider</p>
            <p className="text-sm mt-2">Cliquez sur "Ajouter une image" pour commencer</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.slides.map((slide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="aspect-video bg-gray-100 relative">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                    <button onClick={() => handleMove(index, -1)} disabled={index === 0} className="p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30 transition-colors" title="Déplacer vers la gauche">
                      <FaArrowUp />
                    </button>
                    <button onClick={() => handleMove(index, 1)} disabled={index === config.slides.length - 1} className="p-2 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30 transition-colors" title="Déplacer vers la droite">
                      <FaArrowDown />
                    </button>
                    <button onClick={() => handleDelete(index)} className="p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition-colors" title="Supprimer">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  {editingIndex === index ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Titre"
                      />
                      <input
                        type="text"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Lieu"
                      />
                      <div className="flex space-x-2">
                        <button onClick={() => saveEdit(index)} className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">OK</button>
                        <button onClick={() => setEditingIndex(null)} className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400">Annuler</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium text-sm text-navy-900 truncate">{slide.title}</p>
                      <p className="text-xs text-gray-500 truncate">{slide.location || '—'}</p>
                      <button onClick={() => startEdit(index)} className="text-xs text-gold-600 hover:underline mt-1">Modifier</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
