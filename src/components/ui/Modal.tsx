// import { CheckCircle, X, XCircle } from 'lucide-react';
// import { Button } from './Button';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   type: 'success' | 'error';
//   title: string;
//   message: string;
//   onConfirm?: () => void;
//   confirmText?: string;
// }

// export function Modal({
//   isOpen,
//   onClose,
//   type,
//   title,
//   message,
//   onConfirm,
//   confirmText = 'OK',
// }: ModalProps) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
//       <div className="bg-gray-900 border-2 border-gray-700 rounded-xl shadow-2xl max-w-md w-full animate-scale-in">
//         <div className="p-6">
//           <div className="flex items-center justify-center mb-4">
//             {type === 'success' ? (
//               <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
//                 <CheckCircle size={40} className="text-green-500" />
//               </div>
//             ) : (
//               <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
//                 <XCircle size={40} className="text-red-500" />
//               </div>
//             )}
//           </div>

//           <h2 className="text-2xl font-bold text-white text-center mb-3">
//             {title}
//           </h2>

//           <p className="text-gray-300 text-center mb-6">
//             {message}
//           </p>

//           <div className="flex gap-3">
//             {onConfirm && (
//               <Button
//                 onClick={onConfirm}
//                 className="flex-1"
//                 variant={type === 'success' ? 'primary' : 'secondary'}
//               >
//                 {confirmText}
//               </Button>
//             )}
//             <Button
//               onClick={onClose}
//               className="flex-1"
//               variant="outline"
//             >
//               Close
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { CheckCircle, X, XCircle } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
}

export function Modal({
  isOpen,
  onClose,
  type,
  title,
  message,
  onConfirm,
  confirmText = 'OK',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 border-2 border-gray-700 rounded-xl shadow-2xl max-w-md w-full animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            {type === 'success' ? (
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle size={40} className="text-green-500" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <XCircle size={40} className="text-red-500" />
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-3">
            {title}
          </h2>

          <p className="text-gray-300 text-center mb-6">
            {message}
          </p>

          <div className="flex gap-3">
            {onConfirm ? (
              <>
                <Button
                  onClick={onConfirm}
                  className="flex-1"
                  variant="primary"
                >
                  {confirmText}
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1"
                  variant="outline"
                >
                  Close
                </Button>
              </>
            ) : (
              <Button
                onClick={onClose}
                className="w-full"
                variant="primary"
              >
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
