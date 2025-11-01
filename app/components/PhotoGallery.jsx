'use client'

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function PhotographyGallery({ preview = false }) {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch('/api/photos');
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        console.error('Failed to load photos:', err);
      }
    }
    fetchPhotos();
  }, []);


  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % photos.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToPrevious(e);
    if (e.key === 'ArrowRight') goToNext(e);
  };

  // Distribute photos into three columns
  const columns = [[], [], []];
  photos.forEach((photo, index) => {
    columns[index % 3].push({ ...photo, originalIndex: index });
  });

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Container with optional fixed height and fade */}
        <div className="relative">
          {/* Masonry Grid */}
          <div className={preview ? "h-[1200px] max-h-screen rounded-b-2xl overflow-hidden relative" : "relative"}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-6">
                  {column.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => openModal(photo.originalIndex)}
                      className="relative overflow-hidden rounded-lg cursor-pointer group"
                      style={{ aspectRatio: photo.aspect }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        height={photo.height || 600}
                        width={photo.width || 800}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Fade gradient overlay - only in preview mode */}
            {preview && (
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
            )}
          </div>

          {/* View More Link - only in preview mode */}
          {preview && (
            <a
              href="/photography"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-[#D9753B] to-[#D9753B] hover:from-[#D9753B] hover:to-[#D9753B] rounded-full text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 z-10"
            >
              More Photography →
            </a>
          )}
        </div>

        {/* Modal */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </button>

            {/* Image */}
            <div
              className="max-w-[90vw] max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                width={photos[selectedIndex].width || 800}
                height={photos[selectedIndex].height || 600}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                {selectedIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}