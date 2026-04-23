
// // import kkcLogo from '../../../assets/kkc_logo.png';
// // import anna from '../../../assets/anna.png';
// // import mahendra from '../../../assets/mahendra.png';
// // import kailash from '../../../assets/kailash.png';
// // import kailash1 from '../../../assets/kailash1.png';

// // import { useEffect, useState } from 'react';
// // import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
// // import { getAllGalleryItems } from '../../lib/api';




// // const BASE_URL = "https://sangeetsevasahara.in";

// // export function GallerySection() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [galleryImages, setGalleryImages] = useState<any[]>([]);

// //   const openGallery = (index: number = 0) => {
// //     setCurrentIndex(index);
// //     setIsOpen(true);
// //     document.body.style.overflow = 'hidden';
// //   };

// //   const closeGallery = () => {
// //     setIsOpen(false);
// //     document.body.style.overflow = 'unset';
// //   };



// //   const nextImage = () => {
// //     setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
// //   };

// //   const prevImage = () => {
// //     setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
// //   };

// //   useEffect(() => {
// //     fetchGallery();
// //   }, []);

// //   const fetchGallery = async () => {
// //     try {
// //       const res = await getAllGalleryItems();

// //       const images = (res.data || [])
// //         .filter(
// //           (item: any) =>
// //             item.type?.toLowerCase() === 'image' &&
// //             Number(item.is_active) === 1
// //         )
// //         .map((item: any) => ({
// //           src: BASE_URL + item.file_path,
// //           alt: item.tagline || "Gallery Image"
// //         }));

// //       setGalleryImages(images);

// //     } catch (err) {
// //       console.error("Gallery fetch failed", err);
// //     }
// //   };

// //   return (
// //     <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-12">
// //           <h2 className="text-4xl font-bold text-white mb-4">
// //             KKC Club Gallery
// //           </h2>
// //           <p className="text-gray-400 text-lg">
// //             Celebrating Musical Excellence & Achievements
// //           </p>
// //         </div>

// //         <div className="flex justify-center">
// //           <div
// //             onClick={() => openGallery(0)}
// //             className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/50"
// //           >
// //             <img
// //               src={galleryImages[currentIndex]?.src || kkcLogo}
// //               alt={galleryImages[currentIndex]?.alt || "Gallery"}
// //               className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
// //             />
// //             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
// //               <div className="text-center">
// //                 <Images className="w-16 h-16 text-amber-400 mx-auto mb-3" />
// //                 <p className="text-white text-xl font-bold">View Gallery</p>
// //                 <p className="text-amber-400 text-sm mt-2">Click to explore our moments</p>
// //               </div>
// //             </div>
// //             {galleryImages.length > 0 && (
// //               <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
// //                 {galleryImages.length} Photos
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {isOpen && (
// //         <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
// //           <button
// //             onClick={closeGallery}
// //             className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-50"
// //             aria-label="Close gallery"
// //           >
// //             <X size={40} />
// //           </button>

// //           <button
// //             onClick={prevImage}
// //             className="absolute left-4 text-white hover:text-amber-400 transition-colors z-50 p-3 bg-black/50 rounded-full"
// //             aria-label="Previous image"
// //           >
// //             <ChevronLeft size={32} />
// //           </button>

// //           <button
// //             onClick={nextImage}
// //             className="absolute right-4 text-white hover:text-amber-400 transition-colors z-50 p-3 bg-black/50 rounded-full"
// //             aria-label="Next image"
// //           >
// //             <ChevronRight size={32} />
// //           </button>

// //           <div className="max-w-6xl max-h-[90vh] w-full px-4">
// //             <img
// //               src={galleryImages[currentIndex].src}
// //               alt={galleryImages[currentIndex].alt}
// //               className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
// //             />
// //             <div className="text-center mt-4">
// //               <p className="text-white text-lg font-semibold">
// //                 {galleryImages[currentIndex].alt}
// //               </p>
// //               <p className="text-gray-400 text-sm mt-2">
// //                 {currentIndex + 1} / {galleryImages.length}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
// //             {galleryImages.map((_, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => setCurrentIndex(index)}
// //                 className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
// //                   ? 'bg-amber-500 w-8'
// //                   : 'bg-gray-500 hover:bg-gray-400'
// //                   }`}
// //                 aria-label={`Go to image ${index + 1}`}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }


// import kkcLogo from '../../../assets/kkc_logo.png';

// import { useEffect, useState } from 'react';
// import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
// import { getAllGalleryItems } from '../../lib/api';

// const BASE_URL = "https://sangeetsevasahara.in";

// export function GallerySection() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [galleryImages, setGalleryImages] = useState<any[]>([]);

//   const openGallery = (index: number = 0) => {
//     if (galleryImages.length === 0) return; // ✅ prevent empty open
//     setCurrentIndex(index);
//     setIsOpen(true);
//     document.body.style.overflow = 'hidden';
//   };

//   const closeGallery = () => {
//     setIsOpen(false);
//     document.body.style.overflow = 'unset';
//   };

//   const nextImage = () => {
//     if (galleryImages.length === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
//   };

//   const prevImage = () => {
//     if (galleryImages.length === 0) return;
//     setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const fetchGallery = async () => {
//     try {
//       const res = await getAllGalleryItems();

//       const images = (res.data || [])
//         .filter(
//           (item: any) =>
//             item.type?.toLowerCase() === 'image' &&
//             Number(item.is_active) === 1
//         )
//         .map((item: any) => ({
//           src: BASE_URL + item.file_path,
//           alt: item.tagline || "Gallery Image"
//         }));

//       setGalleryImages(images);

//     } catch (err) {
//       console.error("Gallery fetch failed", err);
//     }
//   };

//   return (
//     <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-white mb-4">
//             KKC Club Gallery
//           </h2>
//           <p className="text-gray-400 text-lg">
//             Celebrating Musical Excellence & Achievements
//           </p>
//         </div>

//         <div className="flex justify-center">
//           <div
//             onClick={() => openGallery(0)}
//             className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/50"
//           >
//             {/* ✅ Safe fallback */}
//             <img
//               src={galleryImages[currentIndex]?.src || kkcLogo}
//               alt={galleryImages[currentIndex]?.alt || "Gallery"}
//               className="w-full max-w-md h-auto object-cover"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//               <div className="text-center">
//                 <Images className="w-16 h-16 text-amber-400 mx-auto mb-3" />
//                 <p className="text-white text-xl font-bold">View Gallery</p>
//                 <p className="text-amber-400 text-sm mt-2">Click to explore our moments</p>
//               </div>
//             </div>

//             {galleryImages.length > 0 && (
//               <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
//                 {galleryImages.length} Photos
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">

//           {/* Close */}
//           <button
//             onClick={closeGallery}
//             className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors z-50"
//           >
//             <X size={40} />
//           </button>

//           {/* Prev */}
//           <button
//             onClick={prevImage}
//             className="absolute left-4 text-white hover:text-amber-400 transition-colors z-50 p-3 bg-black/50 rounded-full"
//           >
//             <ChevronLeft size={32} />
//           </button>

//           {/* Next */}
//           <button
//             onClick={nextImage}
//             className="absolute right-4 text-white hover:text-amber-400 transition-colors z-50 p-3 bg-black/50 rounded-full"
//           >
//             <ChevronRight size={32} />
//           </button>

//           {/* Image */}
//           <div className="max-w-6xl max-h-[90vh] w-full px-4">
//             {galleryImages.length > 0 && (
//               <img
//                 src={galleryImages[currentIndex]?.src}
//                 alt={galleryImages[currentIndex]?.alt}
//                 className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
//               />
//             )}

//             <div className="text-center mt-4">
//               <p className="text-white text-lg font-semibold">
//                 {galleryImages[currentIndex]?.alt}
//               </p>
//               <p className="text-gray-400 text-sm mt-2">
//                 {galleryImages.length > 0 && `${currentIndex + 1} / ${galleryImages.length}`}
//               </p>
//             </div>
//           </div>

//           {/* Dots */}
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
//             {galleryImages.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   index === currentIndex
//                     ? 'bg-amber-500 w-8'
//                     : 'bg-gray-500 hover:bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

import kkcLogo from '../../../assets/kkc_logo.png';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { getAllGalleryItems } from '../../lib/api';

const BASE_URL = "https://sangeetsevasahara.in";

export function GallerySection() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  const openGallery = (index: number = 0) => {
    if (galleryImages.length === 0) return;
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (galleryImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (galleryImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await getAllGalleryItems();

      const media = (res.data || [])
        .filter((item: any) => Number(item.is_active) === 1)
        .map((item: any) => ({
          src: BASE_URL + item.file_path,
          alt: item.tagline || "Gallery",
          type: item.type?.toLowerCase()
        }));

      setGalleryImages(media);

    } catch (err) {
      console.error("Gallery fetch failed", err);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            KKC Club Gallery
          </h2>
          <p className="text-gray-400 text-lg">
            Celebrating Musical Excellence & Achievements
          </p>
        </div>

        {/* Poster */}
        <div className="flex justify-center">
          <div
            onClick={() => openGallery(0)}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-amber-500/50"
          >
            {/* Logo always */}
            <img
              src={kkcLogo}
              alt="KKC Club Logo"
              className="w-full max-w-md h-auto object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center">
                <Images className="w-16 h-16 text-amber-400 mx-auto mb-3" />
                <p className="text-white text-xl font-bold">View Gallery</p>
                <p className="text-amber-400 text-sm mt-2">
                  Click to explore our moments
                </p>
              </div>
            </div>

            {/* Count Badge */}
            {galleryImages.length > 0 && (
              <div className="absolute top-4 right-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                {galleryImages.length} Items
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">

          {/* Close */}
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-amber-400 z-50"
          >
            <X size={40} />
          </button>

          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-amber-400 z-50 p-3 bg-black/50 rounded-full"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-amber-400 z-50 p-3 bg-black/50 rounded-full"
          >
            <ChevronRight size={32} />
          </button>

          {/* MEDIA (IMAGE + VIDEO) */}
          <div className="max-w-6xl max-h-[90vh] w-full px-4">
            {galleryImages.length > 0 && (
              galleryImages[currentIndex]?.type === 'video' ? (
                <video
                  src={galleryImages[currentIndex].src}
                  controls
                  autoPlay
                  className="w-full max-h-[85vh] rounded-lg shadow-2xl"
                />
              ) : (
                <img
                  src={galleryImages[currentIndex]?.src}
                  alt={galleryImages[currentIndex]?.alt}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              )
            )}

            {/* Caption */}
            <div className="text-center mt-4">
              <p className="text-white text-lg font-semibold">
                {galleryImages[currentIndex]?.alt}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {galleryImages.length > 0 &&
                  `${currentIndex + 1} / ${galleryImages.length}`}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                    ? 'bg-amber-500 w-8'
                    : 'bg-gray-500 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}