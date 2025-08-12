"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useDropzone } from "react-dropzone"
import { Camera, Upload, X, Download, Heart } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: string
  url: string
  name: string
  likes: number
}

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const newPhoto: Photo = {
          id: Math.random().toString(36).substr(2, 9),
          url: reader.result as string,
          name: file.name,
          likes: 0
        }
        setPhotos(prev => [...prev, newPhoto])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: true
  })

  const likePhoto = (id: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
    ))
  }

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id))
  }

  return (
    <section id="photos" className="py-20 px-4 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Construction Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Share your amazing construction party moments!
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="border-2 border-dashed border-orange-300 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20">
            <CardContent className="p-12">
              <div
                {...getRootProps()}
                className={`cursor-pointer text-center transition-all duration-300 ${
                  isDragActive ? 'scale-105' : ''
                }`}
              >
                <input {...getInputProps()} />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="p-6 rounded-full bg-orange-500 text-white">
                    <Camera className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Upload Construction Photos
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Drag & drop photos here or click to browse
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden group bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deletePhoto(photo.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{photo.name}</p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => likePhoto(photo.id)}
                        className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{photo.likes}</span>
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {photos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-gray-400 dark:text-gray-600">
              <Upload className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xl">No photos yet. Be the first to share!</p>
            </div>
          </motion.div>
        )}

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedPhoto.url}
                    alt={selectedPhoto.name}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[80vh]"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-4 right-4"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{selectedPhoto.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => likePhoto(selectedPhoto.id)}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        {selectedPhoto.likes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}