// import { X, Trash2, CreditCard as Edit2 } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { KKCMember } from '../lib/api';

// interface KKCMembersModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   members: KKCMember[];
//   onAdd: () => void;
//   onEdit: (member: KKCMember) => void;
//   onDelete: (id: string) => void;
// }

// export function KKCMembersModal({ isOpen, onClose, members, onAdd, onEdit, onDelete }: KKCMembersModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//       <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 shadow-2xl">
//         <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-amber-500/20 bg-black/70 px-6 py-4 backdrop-blur">
//           <div>
//             <h2 className="text-2xl font-bold text-white">KKC Members</h2>
//             <p className="text-sm text-gray-400">Manage the KKC membership list.</p>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button variant="secondary" onClick={onAdd}>
//               Add Member
//             </Button>
//             <button
//               onClick={onClose}
//               className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white transition"
//               aria-label="Close"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="max-h-[calc(90vh-110px)] overflow-y-auto p-6">
//           {members.length === 0 ? (
//             <div className="text-center text-gray-400">
//               <p className="text-lg font-medium">No KKC members yet.</p>
//               <p className="mt-2">Click &quot;Add Member&quot; to get started.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="border-b border-gray-700">
//                   <tr>
//                     <th className="text-left text-sm font-semibold text-gray-400 pb-3">KKC ID</th>
//                     <th className="text-left text-sm font-semibold text-gray-400 pb-3">Full Name</th>
//                     <th className="text-left text-sm font-semibold text-gray-400 pb-3">Mobile</th>
//                     <th className="text-left text-sm font-semibold text-gray-400 pb-3">Status</th>
//                     <th className="text-left text-sm font-semibold text-gray-400 pb-3">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {members.map((member) => (
//                     <tr key={member.id} className="border-b border-gray-800 hover:bg-gray-800/40">
//                       <td className="py-3 text-amber-500 font-semibold text-sm">{member.kkc_id}</td>
//                       <td className="py-3 text-white text-sm">{member.full_name}</td>
//                       <td className="py-3 text-gray-300 text-sm">{member.mobile}</td>
//                       <td className="py-3 text-gray-300 text-sm">{member.membership_status}</td>
//                       <td className="py-3">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => onEdit(member)}
//                             className="text-blue-500 hover:text-blue-400 p-2 hover:bg-blue-500/10 rounded-lg transition"
//                           >
//                             <Edit2 size={16} />
//                           </button>
//                           <button
//                             onClick={() => onDelete(member.id)}
//                             className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition"
//                           >
//                             <Trash2 size={16} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { X, Trash2, CreditCard as Edit2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GalleryItem, KKCMember } from '../lib/api';

interface KKCMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: KKCMember[];
  onAdd: () => void;
  onEdit: (member: KKCMember) => void;
  onDelete: (id: string) => void;
}

export function KKCMembersModal({ isOpen, onClose, members, onAdd, onEdit, onDelete }: KKCMembersModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-amber-500/20 bg-black/70 px-4 sm:px-6 py-4 backdrop-blur">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">KKC Members</h2>
            <p className="text-xs sm:text-sm text-gray-400">Manage the KKC membership list.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={onAdd} size="sm">
              Add Member
            </Button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-300 hover:bg-white/10 hover:text-white transition"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(90vh-110px)] overflow-y-auto p-4 sm:p-6">
          {members.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg font-medium">No KKC members yet.</p>
              <p className="mt-2 text-sm">Click &quot;Add Member&quot; to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr>
                      <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">KKC ID</th>
                      <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Full Name</th>
                      <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0 hidden sm:table-cell">Mobile</th>
                      <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0 hidden md:table-cell">Status</th>
                      <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b border-gray-800 hover:bg-gray-800/40">
                        <td className="py-3 text-amber-500 font-semibold text-xs sm:text-sm px-2 sm:px-0">{member.kkc_id}</td>
                        <td className="py-3 text-white text-xs sm:text-sm px-2 sm:px-0">{member.full_name}</td>
                        <td className="py-3 text-gray-300 text-xs sm:text-sm px-2 sm:px-0 hidden sm:table-cell">{member.mobile}</td>
                        <td className="py-3 text-gray-300 text-xs sm:text-sm px-2 sm:px-0 hidden md:table-cell">{member.membership_status}</td>
                        <td className="py-3 px-2 sm:px-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => onEdit(member)}
                              className="text-blue-500 hover:text-blue-400 p-2 hover:bg-blue-500/10 rounded-lg transition"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => onDelete(member.id)}
                              className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
