import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { KKCMember } from '../lib/api';

interface ModalToastState {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface KKCMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<KKCMember>) => void;
  member?: KKCMember | null;
  mode: 'add' | 'edit';
  toast?: ModalToastState;
  onCloseToast?: () => void;
}

export function KKCMemberModal({ isOpen, onClose, onSubmit, member, mode, toast, onCloseToast }: KKCMemberModalProps) {
  const [formData, setFormData] = useState<Partial<KKCMember>>({
    kkc_id: '',
    full_name: '',
    mobile: '',
    membership_status: 'active',
    join_date: '',
  });

  useEffect(() => {
    if (member && mode === 'edit') {
      setFormData({
        ...member,
        full_name: member.full_name,
      });
    } else {
      setFormData({
        kkc_id: '',
        full_name: '',
        mobile: '',
        membership_status: 'active',
        join_date: '',
      });
    }
  }, [member, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {toast?.isOpen && (
          <div className="absolute top-4 right-4 z-30 w-[320px]">
            <div
              className={`flex items-start justify-between gap-3 p-3 rounded-lg shadow-lg text-sm text-white ${
                toast.type === 'success'
                  ? 'bg-emerald-500/90'
                  : toast.type === 'error'
                  ? 'bg-red-500/90'
                  : toast.type === 'warning'
                  ? 'bg-amber-500/90'
                  : 'bg-sky-500/90'
              }`}
            >
              <span className="flex-1">{toast.message}</span>
              <button
                type="button"
                onClick={() => onCloseToast?.()}
                className="text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
        <div className="sticky top-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-b border-amber-500/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'add' ? 'Add' : 'Edit'} <span className="text-amber-500">KKC Member</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                KKC ID <span className="text-red-500">*</span>
              </label>
              <Input
                required
                placeholder="Enter KKC ID"
                value={formData.kkc_id}
                onChange={(e) => setFormData({ ...formData, kkc_id: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                required
                placeholder="Enter full name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <Input
                required
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                maxLength={10}
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Join Date</label>
              <Input
                type="date"
                value={formData.join_date || ''}
                onChange={(e) => setFormData({ ...formData, join_date: e.target.value })}
              />
            </div>
          </div>
            <div>
              <label className="text-gray-300 text-sm">Status</label>
              <select
                value={formData.membership_status}
                onChange={(e) => setFormData({ ...formData, membership_status: e.target.value })}
                className="w-full p-2 rounded bg-gray-800 text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {mode === 'add' ? 'Add Member' : 'Update Member'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
