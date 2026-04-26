import { X, User, Phone, MapPin, Calendar, Image as ImageIcon, CheckCircle, XCircle, Star, Award } from 'lucide-react';
import { RegistrationExtended } from '../lib/api';
import { Button } from '../components/ui/Button'

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: RegistrationExtended | null;
  onSelectForAudition: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UserDetailModal({
  isOpen,
  onClose,
  registration,
  onSelectForAudition,
  onDelete,
}: UserDetailModalProps) {
  if (!isOpen || !registration) return null;

  const isPaid = registration.payment_status === 'approved';
  const isSelected = registration.is_selected_for_audition;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-amber-500/30 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden">
        <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Registration Details</h2>
              <p className="text-amber-100 text-sm">Complete participant information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 transition-all p-2 rounded-lg"
          >
            <X size={28} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-100px)] p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <User className="text-amber-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white font-semibold text-lg">{registration.full_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Parent/Guardian Name</p>
                    <p className="text-white font-semibold">{registration.parent_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Date of Birth</p>
                    <p className="text-white font-semibold">
                      {new Date(registration.date_of_birth).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Gender</p>
                    <p className="text-white font-semibold">{registration.gender}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="text-green-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Contact Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Mobile Number</p>
                    <p className="text-white font-semibold">{registration.mobile}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">WhatsApp Number</p>
                    <p className="text-white font-semibold">
                      {registration.whatsapp_number || registration.mobile}
                    </p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-gray-400 text-sm">Email Address</p>
                    <p className="text-white font-semibold break-all">{registration.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-blue-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Address</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Full Address</p>
                    <p className="text-white font-semibold">{registration.full_address}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">City</p>
                      <p className="text-white font-semibold">{registration.city}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">State</p>
                      <p className="text-white font-semibold">{registration.state}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm">Pincode</p>
                      <p className="text-white font-semibold">{registration.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-purple-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Audition Details</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-semibold text-lg">{registration.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Audition Date</p>
                    <p className="text-white font-semibold text-lg">
                      {new Date(registration.audition_date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400 text-sm">Time Slot</p>
                    <p className="text-white font-semibold text-lg">{registration.slot_time || 'N/A'}</p>
                  </div>
                  {registration.is_member && (
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-gray-400 text-sm">KKC Member ID</p>
                      <div className="flex items-center gap-2">
                        <Award className="text-amber-500" size={20} />
                        <p className="text-amber-500 font-bold text-lg">{registration.kkc_id}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(registration.youtube_link_1 || registration.youtube_link_2) && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-white">YouTube Links</h3>
                  </div>
                  <div className="space-y-3">
                    {registration.youtube_link_1 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Performance 1</p>
                        <a
                          href={registration.youtube_link_1}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-500 hover:text-amber-400 font-semibold underline break-all"
                        >
                          {registration.youtube_link_1}
                        </a>
                      </div>
                    )}
                    {registration.youtube_link_2 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Performance 2</p>
                        <a
                          href={registration.youtube_link_2}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-500 hover:text-amber-400 font-semibold underline break-all"
                        >
                          {registration.youtube_link_2}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {registration.profile_image_path && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <ImageIcon className="text-pink-500" size={24} />
                    <h3 className="text-lg font-bold text-white">Profile Photo</h3>
                  </div>
                  <div className="aspect-square rounded-xl overflow-hidden border-2 border-amber-500/30">
                    <img
                      src={registration.profile_image_path}
                      alt={registration.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Payment Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white font-bold text-2xl">₹{registration.payment_amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      {isPaid ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-yellow-500" size={20} />
                      )}
                      <p
                        className={`font-bold text-lg ${isPaid ? 'text-green-500' : 'text-yellow-500'
                          }`}
                      >
                        {isPaid ? 'PAID' : 'UNPAID'}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-lg p-3 mt-3">
                      <div className="flex items-center gap-2">
                        <Star className="text-amber-500" size={20} />
                        <p className="text-amber-500 font-bold">Selected for Audition</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  {isPaid && !isSelected && (
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600"
                      onClick={() => onSelectForAudition(registration.id)}
                    >
                      <Star size={18} className="mr-2" />
                      Select for Audition
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this registration?')) {
                        onDelete(registration.id);
                      }
                    }}
                  >
                    Delete Registration
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700">
                <p className="text-gray-400 text-xs">
                  Registered on{' '}
                  {registration.created_at ? (
                    new Date(registration.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  ) : (
                    '-'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
