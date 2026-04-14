'use client'

import { useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

export default function UploadForm({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFile = (f: File) => {
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError('Kun billeder (JPG, PNG, WEBP) og PDF filer er tilladt.')
      return
    }
    setError(null)
    setFile(f)
    if (f.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(f))
    } else {
      setPreview(null)
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) handleFile(dropped)
  }, [])

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)
    setError(null)

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const path = `${userId}/${Date.now()}.${ext}`

    const { error: storageError } = await supabase.storage
      .from('receipts')
      .upload(path, file)

    if (storageError) {
      setError('Upload fejlede: ' + storageError.message)
      setIsUploading(false)
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('receipts').getPublicUrl(path)

    const { error: dbError } = await supabase.from('receipts').insert({
      user_id: userId,
      file_name: file.name,
      file_url: publicUrl,
      file_path: path,
    })

    if (dbError) {
      setError('Kunne ikke gemme kvittering: ' + dbError.message)
      setIsUploading(false)
      return
    }

    router.push('/receipts')
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition ${
          isDragging
            ? 'border-[#d6b98c] bg-[#d6b98c]/10'
            : 'border-white/20 hover:border-[#d6b98c]/50 hover:bg-white/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {preview ? (
          <img
            src={preview}
            alt="Forhåndsvisning"
            className="mx-auto max-h-52 rounded-2xl object-contain"
          />
        ) : file ? (
          <div className="space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d6b98c]/15">
              <svg
                className="h-8 w-8 text-[#f0d7b0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-[#f5f1eb]">{file.name}</p>
            <p className="text-sm text-[#d2c8bc]">PDF klar til upload</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d6b98c]/15">
              <svg
                className="h-8 w-8 text-[#f0d7b0]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <p className="text-[#f5f1eb]">Træk og slip en kvittering her</p>
            <p className="text-sm text-[#d2c8bc]">eller klik for at vælge en fil</p>
            <p className="text-xs text-[#d2c8bc]">JPG, PNG, WEBP eller PDF · Maks 10 MB</p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#3a342f] px-4 py-3">
          <p className="text-sm text-[#d2c8bc]">
            Valgt: <span className="text-[#f5f1eb]">{file.name}</span>
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setFile(null)
              setPreview(null)
            }}
            className="ml-4 text-xs text-[#d2c8bc] hover:text-[#f5f1eb]"
          >
            Fjern
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full rounded-2xl bg-[#d6b98c] px-6 py-4 font-semibold text-[#2b2623] transition hover:bg-[#f0d7b0] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isUploading ? 'Uploader...' : 'Upload kvittering'}
      </button>
    </div>
  )
}
