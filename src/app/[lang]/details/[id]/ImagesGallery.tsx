'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react'
import { Gallery, Image as GalleryImage } from 'react-grid-gallery';
import { Lightbox } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ImagesGallery = ({ images }: { images: string[] }) => {

  const { id } = useParams();
  const [imageDimensions, setImageDimensions] = useState<{ [key: string]: { width: number, height: number } }>({});

  // Function to load image dimensions
  const loadImageDimensions = useCallback((imageUrl: string): Promise<{ width: number, height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        // Fallback to default aspect ratio if image fails to load
        resolve({ width: 16, height: 9 });
      };
      img.src = imageUrl;
    });
  }, []);

  // Load all image dimensions when images are available
  useEffect(() => {
    const loadAllDimensions = async () => {
      if (!images || images.length === 0) return;

      const dimensions: { [key: string]: { width: number, height: number } } = {};

      for (const imageUrl of images) {
        const dims = await loadImageDimensions(imageUrl);
        // Normalize dimensions to reasonable values for the gallery
        const aspectRatio = dims.width / dims.height;
        dimensions[imageUrl] = {
          width: Math.max(1, Math.min(6, Math.round(aspectRatio * 6))), // Scale to 1-6 range
          height: 6 // Standard height for consistency
        };
      }

      setImageDimensions(dimensions);
    };

    loadAllDimensions();
  }, [images, loadImageDimensions]);

  // Preload images for lightbox
  useEffect(() => {
    if (!images || images.length === 0) return;

    images.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  }, [images]);

  const imagesArray: GalleryImage[] = images?.map((image) => {
    const dims = imageDimensions[image] || { width: 4, height: 3 };
    return {
      src: image,
      thumbnail: image,
      caption: image,
      width: dims.width,
      height: dims.height,
    };
  }) || [];

  // For Lightbox, prepare slides as { src: string }
  const slides = imagesArray.map(img => ({ src: img.src }));

  const [index, setIndex] = useState(-1);

  const handleClick = (clickedIndex: number) => {
    setIndex(clickedIndex);
  };

  // Calculate how many images can fit in 2 rows (roughly 6-8 images depending on layout)
  const maxVisibleImages = 6; // Adjust this based on your layout
  const hasMoreImages = images.length > maxVisibleImages;
  const remainingCount = images.length - maxVisibleImages;

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <Gallery
        images={imagesArray}
        onClick={handleClick}
        enableImageSelection={false}
        rowHeight={380}
        margin={4}
        thumbnailStyle={{
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
        maxRows={2}
      />
      
      {/* Overlay for "View All" when there are more images */}
      {hasMoreImages && (
        <button 
          className="z-[1000] absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-90 transition-all duration-200"
          onClick={() => setIndex(maxVisibleImages)} // Open lightbox at the first hidden image
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIndex(maxVisibleImages);
            }
          }}
          aria-label={`View ${remainingCount} more images`}
        >
          <span className="text-sm font-medium">+{remainingCount} more</span>
        </button>
      )}
      
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        index={index}
        on={{ view: ({ index: i }) => setIndex(i) }}
        styles={{
          container: {
            backgroundColor: '#000000d9',
          },
        }}
      />
    </div>
  )
}

export default ImagesGallery
