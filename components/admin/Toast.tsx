import { useEffect } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

interface ToastProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
  duration?: number
}

export default function Toast({ type, message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center space-x-3 px-5 py-4 rounded-xl shadow-2xl text-sm font-medium border ${
          type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}
      >
        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {type === 'success' ? <FaCheck /> : <FaTimes />}
        </span>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded-full transition-colors ${
            type === 'success' ? 'hover:bg-green-100' : 'hover:bg-red-100'
          }`}
        >
          <FaTimes className="text-xs opacity-60" />
        </button>
      </div>
    </div>
  )
}
