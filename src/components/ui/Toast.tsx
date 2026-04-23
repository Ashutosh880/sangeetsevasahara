import { CheckCircle, X, XCircle, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle size={24} className="text-green-500" />,
    error: <XCircle size={24} className="text-red-500" />,
    warning: <AlertCircle size={24} className="text-yellow-500" />,
    info: <Info size={24} className="text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-500/10 border-green-500',
    error: 'bg-red-500/10 border-red-500',
    warning: 'bg-yellow-500/10 border-yellow-500',
    info: 'bg-blue-500/10 border-blue-500',
  };

  return (
    <div className="fixed top-24 right-4 z-[9999] animate-slide-in">
      <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${bgColors[type]} backdrop-blur-lg shadow-xl min-w-[300px] max-w-md`}>
        {icons[type]}
        <p className="text-white flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
