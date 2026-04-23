// import { X, Upload, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
// import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

// interface AddGalleryItemModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: FormData) => void;
//   type: 'image' | 'video';
// }

// export function AddGalleryItemModal({ isOpen, onClose, onSubmit, type }: AddGalleryItemModalProps) {
//   const [formData, setFormData] = useState({
//     tagline: '',
//     description: '',
//   });
//   const [file, setFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);

//       const url = URL.createObjectURL(selectedFile);
//       setPreviewUrl(url);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!file) {
//       alert('Please select a file');
//       return;
//     }

//     setIsSubmitting(true);

//     const data = new FormData();
//     data.append('type', type);
//     data.append('tagline', formData.tagline);
//     data.append('description', formData.description);
//     data.append('file', file);

//     try {
//       await onSubmit(data);
//       handleClose();
//     } catch (err) {
//       console.error('Error submitting gallery item', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({ tagline: '', description: '' });
//     setFile(null);
//     setPreviewUrl(null);
//     setIsSubmitting(false);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//       <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {type === 'image' ? (
//               <ImageIcon className="text-amber-500" size={24} />
//             ) : (
//               <VideoIcon className="text-amber-500" size={24} />
//             )}
//             <div>
//               <h2 className="text-2xl font-bold text-white">
//                 Add {type === 'image' ? 'Photo' : 'Video'}
//               </h2>
//               <p className="text-gray-400 text-sm">Upload a new {type} to the gallery</p>
//             </div>
//           </div>
//           <button
//             onClick={handleClose}
//             className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Tagline <span className="text-red-500">*</span>
//             </label>
//             <Input
//               required
//               placeholder="Enter a catchy tagline"
//               value={formData.tagline}
//               onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Description
//             </label>
//             <Textarea
//               placeholder="Enter a description (optional)"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               rows={3}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               {type === 'image' ? 'Image' : 'Video'} File <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type="file"
//                 accept={type === 'image' ? 'image/*' : 'video/*'}
//                 onChange={handleFileChange}
//                 className="hidden"
//                 id="gallery-file-input"
//                 required
//               />
//               <label
//                 htmlFor="gallery-file-input"
//                 className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-amber-500 transition-colors bg-gray-800/50"
//               >
//                 {previewUrl ? (
//                   type === 'image' ? (
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="w-full h-full object-contain rounded-xl"
//                     />
//                   ) : (
//                     <video
//                       src={previewUrl}
//                       className="w-full h-full object-contain rounded-xl"
//                       controls
//                     />
//                   )
//                 ) : (
//                   <div className="flex flex-col items-center justify-center text-gray-400">
//                     <Upload size={48} className="mb-3" />
//                     <p className="text-sm font-medium">Click to upload</p>
//                     <p className="text-xs mt-1">
//                       {type === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, WebM up to 50MB'}
//                     </p>
//                   </div>
//                 )}
//               </label>
//             </div>
//             {file && (
//               <p className="text-sm text-gray-400 mt-2">
//                 Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
//               </p>
//             )}
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button type="submit" className="flex-1" disabled={isSubmitting}>
//               {isSubmitting ? 'Uploading...' : 'Upload'}
//             </Button>
//             <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={isSubmitting}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { X, Upload, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { useState } from 'react';

interface AddGalleryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  type: 'image' | 'video';
}

export function AddGalleryItemModal({ isOpen, onClose, onSubmit, type }: AddGalleryItemModalProps) {
  const [formData, setFormData] = useState({
    tagline: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append('type', type);
    data.append('tagline', formData.tagline);
    data.append('description', formData.description);
    data.append('file', file);

    try {
      await onSubmit(data);
      handleClose();
    } catch (err) {
      console.error('Error submitting gallery item', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ tagline: '', description: '' });
    setFile(null);
    setPreviewUrl(null);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {type === 'image' ? (
              <ImageIcon className="text-amber-500" size={24} />
            ) : (
              <VideoIcon className="text-amber-500" size={24} />
            )}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Add {type === 'image' ? 'Photo' : 'Video'}
              </h2>
              <p className="text-gray-400 text-sm">Upload a new {type} to the gallery</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tagline <span className="text-red-500">*</span>
            </label>
            <Input
              required
              placeholder="Enter a catchy tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <Textarea
              placeholder="Enter a description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {type === 'image' ? 'Image' : 'Video'} File <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept={type === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
                className="hidden"
                id="gallery-file-input"
                required
              />
              <label
                htmlFor="gallery-file-input"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-amber-500 transition-colors bg-gray-800/50"
              >
                {previewUrl ? (
                  type === 'image' ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <video
                      src={previewUrl}
                      className="w-full h-full object-contain rounded-xl"
                      controls
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Upload size={48} className="mb-3" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs mt-1">
                      {type === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, WebM up to 50MB'}
                    </p>
                  </div>
                )}
              </label>
            </div>
            {file && (
              <p className="text-sm text-gray-400 mt-2">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Uploading...' : 'Upload'}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
