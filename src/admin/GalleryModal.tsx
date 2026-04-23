// import { X, Trash2, Image as ImageIcon, Video as VideoIcon, Plus } from 'lucide-react';
// import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { GalleryItem } from '../lib/api';
import { Toast } from '../components/ui/Toast';
import { X, Trash2, Image as ImageIcon, Video as VideoIcon, Plus } from 'lucide-react';
import { useState } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryItems: GalleryItem[];
  onAddImage: () => void;
  onAddVideo: () => void;
  onDelete: (id: string) => void;
}

export function GalleryModal({
  isOpen,
  onClose,
  galleryItems,
  onAddImage,
  onAddVideo,
  onDelete,
}: GalleryModalProps) {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ isOpen: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 3000);
  };

  const BASE_URL = "https://sangeetsevasahara.in";

  const handleDelete = async (id: string, tagline: string) => {
    if (!confirm(`Are you sure you want to remove "${tagline}"?`)) return;

    try {
      await onDelete(id);
      showToast('Item removed successfully', 'success');
    } catch (err) {
      console.error('Error deleting item', err);
      showToast('Failed to remove item', 'error');
    }
  };

  const images = galleryItems.filter(
    (item) =>
      item.type?.toLowerCase() === 'image' &&
      Number(item.is_active) === 1
  );
  const videos = galleryItems.filter(
    (item) =>
      item.type?.toLowerCase() === 'video' &&
      Number(item.is_active) === 1
  );
  const displayItems = activeTab === 'images' ? images : videos;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      {toast.isOpen && (
        <div className="fixed top-4 right-4 z-[70]">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
          />
        </div>
      )}

      <div className="w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3">
            <ImageIcon className="text-white" size={24} />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Gallery Management</h2>
              <p className="text-amber-100 text-xs sm:text-sm hidden sm:block">
                Manage photos and videos displayed on the home page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 transition-all p-2 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="border-b border-gray-700 bg-black/30 px-4 sm:px-6">
          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base transition-colors relative ${activeTab === 'images'
                  ? 'text-amber-500'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon size={18} />
                <span>Images ({images.length})</span>
              </div>
              {activeTab === 'images' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base transition-colors relative ${activeTab === 'videos'
                  ? 'text-amber-500'
                  : 'text-gray-400 hover:text-gray-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <VideoIcon size={18} />
                <span>Videos ({videos.length})</span>
              </div>
              {activeTab === 'videos' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              onClick={onAddImage}
              variant="secondary"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              <Plus size={20} className="mr-2" />
              Add Photo
            </Button>
            <Button
              onClick={onAddVideo}
              variant="secondary"
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            >
              <Plus size={20} className="mr-2" />
              Add Video
            </Button>
          </div>

          <div className="max-h-[calc(95vh-280px)] sm:max-h-[calc(95vh-250px)] overflow-y-auto">
            {displayItems.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="mb-4">
                  {activeTab === 'images' ? (
                    <ImageIcon size={64} className="mx-auto opacity-30" />
                  ) : (
                    <VideoIcon size={64} className="mx-auto opacity-30" />
                  )}
                </div>
                <p className="text-lg font-medium">No {activeTab} yet</p>
                <p className="text-sm mt-2">
                  Click &quot;Add {activeTab === 'images' ? 'Photo' : 'Video'}&quot; to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {displayItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-amber-500/50 transition-all"
                  >
                    <div className="aspect-video bg-black relative">
                      {item.type === 'image' ? (
                        <img
                          src={BASE_URL + item.file_path}
                          alt={item.tagline}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={BASE_URL + item.file_path}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1 line-clamp-1">
                        {item.tagline}
                      </h3>
                      {item.description && (
                        <p className="text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(item.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id, item.tagline)}
                          className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
