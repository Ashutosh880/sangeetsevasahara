// import { Lock, User } from 'lucide-react';
// import { FormEvent, useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { loginAdmin } from '../lib/api';
// import { Button } from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import { Input } from '../components/ui/Input';

// export function AdminLoginPage() {
//   const { setCurrentPage, setIsAdmin } = useApp();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const result: any = await loginAdmin(username, password);
//       if (result && result.success) {
//         setIsAdmin(true);
//         setCurrentPage('admin-dashboard');
//       } else {
//         setError('Invalid username or password');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24 flex items-center justify-center">
//       <div className="max-w-md w-full px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
//               <Lock className="text-amber-500" size={32} />
//             </div>
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-2">
//             Admin <span className="text-amber-500">Login</span>
//           </h1>
//           <p className="text-gray-400">Access the admin dashboard</p>
//         </div>

//         <Card>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500 text-sm">
//                 {error}
//               </div>
//             )}

//             <div className="relative">
//               <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <Input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="pl-10"
//                 required
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-10"
//                 required
//               />
//             </div>

//             <Button type="submit" size="lg" className="w-full" isLoading={loading}>
//               Login
//             </Button>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={() => setCurrentPage('home')}
//                 className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
//               >
//                 Back to Home
//               </button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }


import { Lock, User, Scale, Shield } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useApp } from '../context/AppContext';
import { login } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';

type LoginRole = 'admin' | 'judge';

export function LoginPage() {
  const { setCurrentPage, setIsAdmin } = useApp();
  const { toast, showToast, hideToast } = useToast();
  const [role, setRole] = useState<LoginRole>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
  const result: any = await login(username, password); // single API

  if (result?.success) {
    const user = result.user;

    if (user.role === 'admin') {
      setIsAdmin(true);
      showToast('Login successful', 'success');
      setTimeout(() => setCurrentPage('admin-dashboard'), 800);

    } else if (user.role === 'judge') {
      sessionStorage.setItem(
        'judge_session',
        JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role,
        })
      );

      showToast(`Welcome, ${user.username}`, 'success');
      setTimeout(() => setCurrentPage('judge-dashboard'), 800);

    } else {
      showToast('Unauthorized role', 'error');
    }

  } else {
    showToast(result?.message || 'Invalid username or password', 'error');
  }

} catch (error) {
  console.error('Login error:', error);
  showToast('Login failed. Please try again.', 'error');
} finally {
  setLoading(false);
}

  const handleRoleChange = (newRole: LoginRole) => {
    setRole(newRole);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-24 flex items-center justify-center">
      {toast.isOpen && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      <div className="max-w-md w-full px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500/30 to-amber-600/10 rounded-2xl flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Lock className="text-amber-500" size={36} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="text-amber-500">Login</span>
          </h1>
          <p className="text-gray-400 text-lg">Sign in to your account</p>
        </div>

        <Card className="border-amber-500/20 bg-gray-900/90">
          {/* Role selector */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-400 mb-3">Login as</p>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  role === 'admin'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="login-role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => handleRoleChange('admin')}
                  className="sr-only"
                />
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  role === 'admin' ? 'bg-amber-500/20' : 'bg-gray-700/50'
                }`}>
                  <Shield size={20} className={role === 'admin' ? 'text-amber-500' : 'text-gray-400'} />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${role === 'admin' ? 'text-white' : 'text-gray-300'}`}>Admin</p>
                  <p className="text-xs text-gray-500">Manage platform</p>
                </div>
                <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role === 'admin' ? 'border-amber-500' : 'border-gray-600'
                }`}>
                  {role === 'admin' && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                </div>
              </label>

              <label
                className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  role === 'judge'
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <input
                  type="radio"
                  name="login-role"
                  value="judge"
                  checked={role === 'judge'}
                  onChange={() => handleRoleChange('judge')}
                  className="sr-only"
                />
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  role === 'judge' ? 'bg-amber-500/20' : 'bg-gray-700/50'
                }`}>
                  <Scale size={20} className={role === 'judge' ? 'text-amber-500' : 'text-gray-400'} />
                </div>
                <div>
                  <p className={`font-semibold text-sm ${role === 'judge' ? 'text-white' : 'text-gray-300'}`}>Judge</p>
                  <p className="text-xs text-gray-500">Score performers</p>
                </div>
                <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role === 'judge' ? 'border-amber-500' : 'border-gray-600'
                }`}>
                  {role === 'judge' && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                </div>
              </label>
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={20} />
              <Input
                type="text"
                placeholder={role === 'admin' ? 'Admin Username' : 'Judge Username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" size={20} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full" isLoading={loading}>
              {role === 'admin' ? 'Sign In as Admin' : 'Sign In as Judge'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setCurrentPage('home')}
                className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
}