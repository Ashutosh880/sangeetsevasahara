// // import { Calendar, CheckCircle, Clock, Download, Eye, Search, Trash2, Users, XCircle } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useApp } from '../context/AppContext';
// // import {
// //   getRegistrations,
// //   updateRegistrationStatus,
// //   removeRegistration,
// //   adjustSlot,
// //   Registration,
// // } from '../lib/api';
// // import { Button } from '../components/ui/Button';
// // import { Card } from '../components/ui/Card';
// // import { Input } from '../components/ui/Input';
// // import { Select } from '../components/ui/Select';
// // import { Toast } from '../components/ui/Toast';
// // import { Modal } from '../components/ui/Modal';
// // import { useToast } from '../hooks/useToast';

// // export function AdminDashboard() {
// //   const { setCurrentPage, isAdmin, setIsAdmin } = useApp();
// //   const navigate = useNavigate();
// //   const { toast, showToast, hideToast } = useToast();
// //   const [registrations, setRegistrations] = useState<Registration[]>([]);
// //   const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
// //   const [stats, setStats] = useState({
// //     total: 0,
// //     date1: 0,
// //     date2: 0,
// //     pending: 0,
// //     approved: 0,
// //   });
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [dateFilter, setDateFilter] = useState('');
// //   const [categoryFilter, setCategoryFilter] = useState('');
// //   const [statusFilter, setStatusFilter] = useState('');
// //   const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
// //   const [modalState, setModalState] = useState<{
// //     isOpen: boolean;
// //     type: 'success' | 'error';
// //     title: string;
// //     message: string;
// //   }>({
// //     isOpen: false,
// //     type: 'success',
// //     title: '',
// //     message: '',
// //   });

// //   useEffect(() => {
// //     if (!isAdmin) {
// //       navigate('/admin-login');
// //       return;
// //     }
// //     fetchRegistrations();
// //   }, [isAdmin, navigate]);

// //   useEffect(() => {
// //     applyFilters();
// //   }, [searchTerm, dateFilter, categoryFilter, statusFilter, registrations]);

// //   const showModal = (type: 'success' | 'error', title: string, message: string) => {
// //     setModalState({ isOpen: true, type, title, message });
// //   };

// //   const closeModal = () => {
// //     setModalState(prev => ({ ...prev, isOpen: false }));
// //   };

// //   const fetchRegistrations = async () => {
// //     try {
// //       const data: Registration[] = await getRegistrations();
// //       setRegistrations(data);
// //       calculateStats(data);
// //     } catch (err) {
// //       console.error('Failed to fetch registrations', err);
// //       showToast('Failed to fetch registrations', 'error');
// //     }
// //   };

// //   const calculateStats = (data: Registration[]) => {
// //     setStats({
// //       total: data.length,
// //       date1: data.filter(r => r.audition_date === '2026-05-23').length,
// //       date2: data.filter(r => r.audition_date === '2026-05-24').length,
// //       pending: data.filter(r => r.payment_status === 'pending').length,
// //       approved: data.filter(r => r.payment_status === 'approved').length,
// //     });
// //   };

// //   const applyFilters = () => {
// //     let filtered = [...registrations];

// //     if (searchTerm) {
// //       filtered = filtered.filter(r =>
// //         r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         r.mobile.includes(searchTerm) ||
// //         r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         r.kkc_id?.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }

// //     if (dateFilter) {
// //       filtered = filtered.filter(r => r.audition_date === dateFilter);
// //     }

// //     if (categoryFilter) {
// //       filtered = filtered.filter(r => r.category === categoryFilter);
// //     }

// //     if (statusFilter) {
// //       filtered = filtered.filter(r => r.payment_status === statusFilter);
// //     }

// //     setFilteredRegistrations(filtered);
// //   };

// //   const updateStatus = async (id: string, status: string) => {
// //     try {
// //       await updateRegistrationStatus(id, status);
// //       fetchRegistrations();
// //       if (selectedRegistration?.id === id) {
// //         setSelectedRegistration({ ...selectedRegistration, payment_status: status });
// //       }
// //       showToast(`Status updated to ${status}`, 'success');
// //     } catch (err) {
// //       console.error('Error updating status', err);
// //       showToast('Failed to update status', 'error');
// //     }
// //   };

// //   const deleteRegistration = async (id: string) => {
// //     const registration = registrations.find(r => r.id === id);
// //     if (!registration) return;

// //     if (registration.payment_status === 'approved') {
// //       try {
// //         await adjustSlot(registration.audition_date, -1);
// //       } catch (err) {
// //         console.error('Failed to adjust slot count', err);
// //       }
// //     }

// //     try {
// //       await removeRegistration(id);
// //       fetchRegistrations();
// //       setSelectedRegistration(null);
// //       showModal('success', 'Deleted', 'Registration deleted successfully');
// //     } catch (err) {
// //       console.error('Error deleting registration', err);
// //       showModal('error', 'Error', 'Failed to delete registration');
// //     }
// //   };

// //   const confirmDelete = (id: string) => {
// //     if (confirm('Are you sure you want to delete this registration?')) {
// //       deleteRegistration(id);
// //     }
// //   };

// //   const exportToExcel = () => {
// //     const dataToExport = filteredRegistrations.length > 0 ? filteredRegistrations : registrations;

// //     const headers = ['Name', 'Mobile', 'WhatsApp', 'Email', 'City', 'Category', 'Date', 'Member', 'Amount', 'Status'];
// //     const rows = dataToExport.map(r => [
// //       r.full_name,
// //       r.mobile,
// //       r.whatsapp_number || r.mobile,
// //       r.email,
// //       r.city,
// //       r.category,
// //       r.audition_date,
// //       r.is_member ? 'Yes' : 'No',
// //       r.payment_amount,
// //       r.payment_status
// //     ]);

// //     let csv = headers.join(',') + '\n';
// //     rows.forEach(row => {
// //       csv += row.join(',') + '\n';
// //     });

// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `registrations_${new Date().toISOString()}.csv`;
// //     a.click();

// //     showToast('Data exported successfully', 'success');
// //   };

// //   const handleLogout = () => {
// //     setIsAdmin(false);
// //     navigate('/audition');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
// //       {toast.isOpen && (
// //         <Toast
// //           message={toast.message}
// //           type={toast.type}
// //           onClose={hideToast}
// //         />
// //       )}

// //       <Modal
// //         isOpen={modalState.isOpen}
// //         onClose={closeModal}
// //         type={modalState.type}
// //         title={modalState.title}
// //         message={modalState.message}
// //       />

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
// //           <div>
// //             <h1 className="text-4xl font-bold text-white mb-2">
// //               Admin <span className="text-amber-500">Dashboard</span>
// //             </h1>
// //             <p className="text-gray-400">Manage audition registrations</p>
// //           </div>
// //           <div className="flex gap-3">
// //             <Button onClick={() => navigate('/form-management')}>
// //               Manage Forms
// //             </Button>
// //             <Button variant="outline" onClick={handleLogout}>
// //               Logout
// //             </Button>
// //           </div>
// //         </div>

// //         <div className="grid md:grid-cols-5 gap-6 mb-8">
// //           <Card hover>
// //             <div className="flex items-center gap-3">
// //               <Users className="text-amber-500" size={32} />
// //               <div>
// //                 <p className="text-gray-400 text-sm">Total</p>
// //                 <p className="text-2xl font-bold text-white">{stats.total}</p>
// //               </div>
// //             </div>
// //           </Card>

// //           <Card hover>
// //             <div className="flex items-center gap-3">
// //               <Calendar className="text-blue-500" size={32} />
// //               <div>
// //                 <p className="text-gray-400 text-sm">23 May</p>
// //                 <p className="text-2xl font-bold text-white">{stats.date1}</p>
// //               </div>
// //             </div>
// //           </Card>

// //           <Card hover>
// //             <div className="flex items-center gap-3">
// //               <Calendar className="text-green-500" size={32} />
// //               <div>
// //                 <p className="text-gray-400 text-sm">24 May</p>
// //                 <p className="text-2xl font-bold text-white">{stats.date2}</p>
// //               </div>
// //             </div>
// //           </Card>

// //           <Card hover>
// //             <div className="flex items-center gap-3">
// //               <Clock className="text-yellow-500" size={32} />
// //               <div>
// //                 <p className="text-gray-400 text-sm">Pending</p>
// //                 <p className="text-2xl font-bold text-white">{stats.pending}</p>
// //               </div>
// //             </div>
// //           </Card>

// //           <Card hover>
// //             <div className="flex items-center gap-3">
// //               <CheckCircle className="text-green-500" size={32} />
// //               <div>
// //                 <p className="text-gray-400 text-sm">Approved</p>
// //                 <p className="text-2xl font-bold text-white">{stats.approved}</p>
// //               </div>
// //             </div>
// //           </Card>
// //         </div>

// //         <Card className="mb-6">
// //           <div className="flex flex-col lg:flex-row gap-4 mb-4">
// //             <div className="flex-1">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
// //                 <Input
// //                   placeholder="Search by name, mobile, city, or KKC ID..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10"
// //                 />
// //               </div>
// //             </div>

// //             <Select
// //               value={dateFilter}
// //               onChange={(e) => setDateFilter(e.target.value)}
// //               options={[
// //                 { value: '2026-05-08', label: '08 May 2026' },
// //                 { value: '2026-05-09', label: '09 May 2026' },
// //                 { value: '2026-05-10', label: '10 May 2026' }
// //               ]}
// //               className="lg:w-48"
// //             />

// //             <Select
// //               value={categoryFilter}
// //               onChange={(e) => setCategoryFilter(e.target.value)}
// //               options={[
// //                 { value: 'Junior', label: 'Junior' },
// //                 { value: 'Senior', label: 'Senior' }
// //               ]}
// //               className="lg:w-48"
// //             />

// //             <Select
// //               value={statusFilter}
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //               options={[
// //                 { value: 'pending', label: 'Pending' },
// //                 { value: 'approved', label: 'Approved' },
// //                 { value: 'rejected', label: 'Rejected' }
// //               ]}
// //               className="lg:w-48"
// //             />

// //             <Button onClick={exportToExcel} variant="secondary">
// //               <Download size={20} className="mr-2" />
// //               Export
// //             </Button>
// //           </div>
// //         </Card>

// //         <div className="grid lg:grid-cols-3 gap-6">
// //           <div className="lg:col-span-2">
// //             <Card>
// //               <h2 className="text-xl font-bold text-white mb-4">Registrations ({filteredRegistrations.length})</h2>
// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead className="border-b border-gray-700">
// //                     <tr>
// //                       <th className="text-left text-sm font-semibold text-gray-400 pb-3">Name</th>
// //                       <th className="text-left text-sm font-semibold text-gray-400 pb-3">Mobile</th>
// //                       <th className="text-left text-sm font-semibold text-gray-400 pb-3">Category</th>
// //                       <th className="text-left text-sm font-semibold text-gray-400 pb-3">Date</th>
// //                       <th className="text-left text-sm font-semibold text-gray-400 pb-3">Status</th>
// //                       <th className="text-left text-sm font-semibold text-gray-400 pb-3">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredRegistrations.map((reg) => (
// //                       <tr key={reg.id} className="border-b border-gray-800 hover:bg-gray-800/50">
// //                         <td className="py-3 text-white text-sm">{reg.full_name}</td>
// //                         <td className="py-3 text-gray-300 text-sm">{reg.mobile}</td>
// //                         <td className="py-3 text-gray-300 text-sm">{reg.category}</td>
// //                         <td className="py-3 text-gray-300 text-sm">
// //                           {new Date(reg.audition_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
// //                         </td>
// //                         <td className="py-3">
// //                           <span className={`px-2 py-1 rounded text-xs font-semibold ${
// //                             reg.payment_status === 'approved' ? 'bg-green-500/20 text-green-500' :
// //                             reg.payment_status === 'rejected' ? 'bg-red-500/20 text-red-500' :
// //                             'bg-yellow-500/20 text-yellow-500'
// //                           }`}>
// //                             {reg.payment_status}
// //                           </span>
// //                         </td>
// //                         <td className="py-3">
// //                           <button
// //                             onClick={() => setSelectedRegistration(reg)}
// //                             className="text-amber-500 hover:text-amber-400"
// //                           >
// //                             <Eye size={18} />
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //                 {filteredRegistrations.length === 0 && (
// //                   <div className="text-center py-8 text-gray-400">
// //                     No registrations found
// //                   </div>
// //                 )}
// //               </div>
// //             </Card>
// //           </div>

// //           <div className="lg:col-span-1">
// //             {selectedRegistration ? (
// //               <Card>
// //                 <h2 className="text-xl font-bold text-white mb-4">Registration Details</h2>
// //                 <div className="space-y-3 text-sm">
// //                   <div>
// //                     <p className="text-gray-400">Full Name</p>
// //                     <p className="text-white font-semibold">{selectedRegistration.full_name}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Parent Name</p>
// //                     <p className="text-white">{selectedRegistration.parent_name}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">DOB</p>
// //                     <p className="text-white">{new Date(selectedRegistration.date_of_birth).toLocaleDateString()}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Gender</p>
// //                     <p className="text-white">{selectedRegistration.gender}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Mobile</p>
// //                     <p className="text-white">{selectedRegistration.mobile}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">WhatsApp</p>
// //                     <p className="text-white">{selectedRegistration.whatsapp_number || selectedRegistration.mobile}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Email</p>
// //                     <p className="text-white text-xs">{selectedRegistration.email}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Address</p>
// //                     <p className="text-white">{selectedRegistration.full_address}</p>
// //                     <p className="text-white">{selectedRegistration.city}, {selectedRegistration.state} - {selectedRegistration.pincode}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Category</p>
// //                     <p className="text-white">{selectedRegistration.category}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Audition Date</p>
// //                     <p className="text-white">{new Date(selectedRegistration.audition_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
// //                   </div>
// //                   {selectedRegistration.is_member && (
// //                     <div>
// //                       <p className="text-gray-400">KKC ID</p>
// //                       <p className="text-white">{selectedRegistration.kkc_id}</p>
// //                     </div>
// //                   )}
// //                   <div>
// //                     <p className="text-gray-400">Amount</p>
// //                     <p className="text-white font-bold">₹{selectedRegistration.payment_amount}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400">Status</p>
// //                     <p className={`font-semibold ${
// //                       selectedRegistration.payment_status === 'approved' ? 'text-green-500' :
// //                       selectedRegistration.payment_status === 'rejected' ? 'text-red-500' :
// //                       'text-yellow-500'
// //                     }`}>
// //                       {selectedRegistration.payment_status.toUpperCase()}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="mt-6 space-y-3">
// //                   {selectedRegistration.payment_status === 'pending' && (
// //                     <>
// //                       <Button
// //                         size="sm"
// //                         className="w-full"
// //                         onClick={() => updateStatus(selectedRegistration.id, 'approved')}
// //                       >
// //                         <CheckCircle size={18} className="mr-2" />
// //                         Approve
// //                       </Button>
// //                       <Button
// //                         size="sm"
// //                         variant="secondary"
// //                         className="w-full"
// //                         onClick={() => updateStatus(selectedRegistration.id, 'rejected')}
// //                       >
// //                         <XCircle size={18} className="mr-2" />
// //                         Reject
// //                       </Button>
// //                     </>
// //                   )}
// //                   <Button
// //                     size="sm"
// //                     variant="outline"
// //                     className="w-full border-red-500 text-red-500 hover:bg-red-500"
// //                     onClick={() => confirmDelete(selectedRegistration.id)}
// //                   >
// //                     <Trash2 size={18} className="mr-2" />
// //                     Delete
// //                   </Button>
// //                 </div>
// //               </Card>
// //             ) : (
// //               <Card className="text-center py-12">
// //                 <Eye className="text-gray-600 mx-auto mb-4" size={48} />
// //                 <p className="text-gray-400">Select a registration to view details</p>
// //               </Card>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { Calendar, CheckCircle, Clock, Download, Eye, Search, Users, Star, ChevronLeft, ChevronRight, RotateCcw, Award } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useApp } from '../context/AppContext';
// import {
//   getRegistrations,
//   updateRegistrationStatus,
//   removeRegistration,
//   adjustSlot,
//   RegistrationExtended,
//   getAllKKCMembers,
//   addKKCMember,
//   editKKCMember,
//   removeKKCMember,
//   KKCMember,
// } from '../lib/api';
// import { Button } from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import { Input } from '../components/ui/Input';
// import { Select } from '../components/ui/Select';
// import { Toast } from '../components/ui/Toast';
// import { useToast } from '../hooks/useToast';
// import { KKCMemberModal } from '../admin/KKCMemberModal';
// import { KKCMembersModal } from '../admin/KKCMembersModal';
// import { UserDetailModal } from '../admin/UserDetailModal';

// const DEFAULT_ITEMS_PER_PAGE = 10;

// export function AdminDashboard() {
//   const { setCurrentPage, isAdmin, setIsAdmin } = useApp();
//   const { toast, showToast, hideToast } = useToast();

//   const [registrations, setRegistrations] = useState<RegistrationExtended[]>([]);
//   const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationExtended[]>([]);
//   const [kkcMembers, setKKCMembers] = useState<KKCMember[]>([]);

//   const [stats, setStats] = useState({
//   total: 0,
//   pending: 0,
//   approved: 0,
//   selected: 0,
// });

//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [selectedRegistration, setSelectedRegistration] = useState<RegistrationExtended | null>(null);

//   const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
//   const [currentPageNum, setCurrentPageNum] = useState(1);
//   const [showKKCMembersModal, setShowKKCMembersModal] = useState(false);
//   const [showKKCModal, setShowKKCModal] = useState(false);
//   const [kkcModalMode, setKKCModalMode] = useState<'add' | 'edit'>('add');
//   const [selectedKKCMember, setSelectedKKCMember] = useState<KKCMember | null>(null);
//   const [showUserDetailModal, setShowUserDetailModal] = useState(false);

//   const [kkcModalToast, setKKCModalToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info'; isOpen: boolean }>({
//     message: '',
//     type: 'success',
//     isOpen: false,
//   });

//   useEffect(() => {
//     if (!isAdmin) {
//       setCurrentPage('admin-login');
//       return;
//     }
//     fetchRegistrations();
//     fetchKKCMembers();
//   }, [isAdmin]);

//   useEffect(() => {
//     applyFilters();
//   }, [searchTerm, dateFilter, statusFilter, registrations]);

//   const fetchRegistrations = async () => {
//     try {
//       console.log("sbghshs");
//       const data: RegistrationExtended[] = await getRegistrations();
//       console.log("dhjsjksksi", data);
//       setRegistrations(data);
//       calculateStats(data);
//     } catch (err) {
//       console.error('Failed to fetch registrations', err);
//       showToast('Failed to fetch registrations', 'error');
//     }
//   };

//   const fetchKKCMembers = async () => {
//   try {
//     const data = await getAllKKCMembers();
//     setKKCMembers(Array.isArray(data) ? data : []);
//   } catch (err) {
//     console.error('Failed to fetch KKC members', err);
//     setKKCMembers([]);
//   }
// };

//   const calculateStats = (data: RegistrationExtended[]) => {
//     setStats({
//   total: data.length,
//   pending: data.filter((r) => r.payment_status === 'pending').length,
//   approved: data.filter((r) => r.payment_status === 'approved').length,
//   selected: data.filter((r) => r.is_selected_for_audition).length,
// });
//   };

//   const applyFilters = () => {
//     let filtered = [...registrations];

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (r) =>
//           r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           r.mobile.includes(searchTerm) ||
//           r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           r.kkc_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           r.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (dateFilter) {
//       filtered = filtered.filter((r) => r.audition_date === dateFilter);
//     }

//     if (statusFilter) {
//       filtered = filtered.filter((r) => r.payment_status === statusFilter);
//     }

//     setFilteredRegistrations(filtered);
//     setCurrentPageNum(1);
//   };

//   const resetFilters = () => {
//     setSearchTerm('');
//     setDateFilter('');
//     setStatusFilter('');
//   };

//   const showKKCModalToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
//     setKKCModalToast({ message, type, isOpen: true });
//     setTimeout(() => {
//       setKKCModalToast((prev) => ({ ...prev, isOpen: false }));
//     }, 3000);
//   };

//   const updateStatus = async (id: string, status: RegistrationExtended['payment_status']) => {
//     try {
//       await updateRegistrationStatus(id, status);
//       fetchRegistrations();
//       if (selectedRegistration?.id === id) {
//         setSelectedRegistration({ ...selectedRegistration, payment_status: status });
//       }
//       showToast(`Payment ${status}`, 'success');
//     } catch (err) {
//       console.error('Error updating status', err);
//       showToast('Failed to update status', 'error');
//     }
//   };

//   const selectForAudition = async (id: string) => {
//     try {
//       const registration = registrations.find((r) => r.id === id);
//       if (!registration) return;

//       const updatedReg = { ...registration, is_selected_for_audition: true, selected_at: new Date().toISOString() };

//       const updatedList = registrations.map((r) => (r.id === id ? updatedReg : r));
//       setRegistrations(updatedList);

//       if (selectedRegistration?.id === id) {
//         setSelectedRegistration(updatedReg);
//       }

//       showToast('Participant selected for audition', 'success');
//     } catch (err) {
//       console.error('Error selecting for audition', err);
//       showToast('Failed to select for audition', 'error');
//     }
//   };

//   const deleteRegistration = async (id: string) => {
//     const registration = registrations.find((r) => r.id === id);
//     if (!registration) return;

//     if (registration.payment_status === 'approved') {
//       try {
//         await adjustSlot(registration.audition_date, -1);
//       } catch (err) {
//         console.error('Failed to adjust slot count', err);
//       }
//     }

//     try {
//       await removeRegistration(id);
//       fetchRegistrations();
//       setSelectedRegistration(null);
//       setShowUserDetailModal(false);
//       showToast('Registration deleted successfully', 'success');
//     } catch (err) {
//       console.error('Error deleting registration', err);
//       showToast('Failed to delete registration', 'error');
//     }
//   };

//   const handleKKCMemberSubmit = async (data: Partial<KKCMember>) => {
//     try {
//       let res;

//       if (kkcModalMode === 'add') {
//         res = await addKKCMember(data);
//       } else {
//         res = await editKKCMember(data);
//       }

//       showKKCModalToast(res.message, 'success');
//       fetchKKCMembers();
//       setShowKKCModal(false);
//     } catch (err: any) {
//       showKKCModalToast(err.message, 'error');
//     }
//   };

//   const handleDeleteKKCMember = async (id: string) => {
//     try {
//       const res = await removeKKCMember(id);

//       showKKCModalToast(res.message, 'success');
//       fetchKKCMembers();
//     } catch (err: any) {
//       showKKCModalToast(err.message, 'error');
//     }
//   };

//   const exportToExcel = () => {
//     const dataToExport = filteredRegistrations.length > 0 ? filteredRegistrations : registrations;

//     const headers = [
//       'Name',
//       'Mobile',
//       'WhatsApp',
//       'Email',
//       'City',
//       'Date',
//       'Member',
//       'Amount',
//       'Status',
//       'Selected',
//     ];
//     const rows = dataToExport.map((r) => [
//       r.full_name,
//       r.mobile,
//       r.whatsapp_number || r.mobile,
//       r.email,
//       r.city,
//       r.audition_date,
//       r.is_member ? 'Yes' : 'No',
//       r.payment_amount,
//       r.payment_status,
//       r.is_selected_for_audition ? 'Yes' : 'No',
//     ]);

//     let csv = headers.join(',') + '\n';
//     rows.forEach((row) => {
//       csv += row.join(',') + '\n';
//     });

//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `registrations_${new Date().toISOString()}.csv`;
//     a.click();

//     showToast('Data exported successfully', 'success');
//   };

//   const handleLogout = () => {
//     setIsAdmin(false);
//     setCurrentPage('admin-login');
//   };

//   const dateCounts = registrations.reduce((acc: any, r) => {
//   acc[r.audition_date] = (acc[r.audition_date] || 0) + 1;
//   return acc;
// }, {});

//   const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
//   const startIndex = (currentPageNum - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);

//   const goToPage = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPageNum(page);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
//       {toast.isOpen && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

//       <KKCMembersModal
//         isOpen={showKKCMembersModal}
//         onClose={() => setShowKKCMembersModal(false)}
//         members={kkcMembers}
//         onAdd={() => {
//           setKKCModalMode('add');
//           setSelectedKKCMember(null);
//           setShowKKCModal(true);
//         }}
//         onEdit={(member) => {
//           setSelectedKKCMember(member);
//           setKKCModalMode('edit');
//           setShowKKCModal(true);
//         }}
//         onDelete={handleDeleteKKCMember}
//       />

//       <KKCMemberModal
//         isOpen={showKKCModal}
//         onClose={() => {
//           setShowKKCModal(false);
//           setSelectedKKCMember(null);
//           setKKCModalToast((prev) => ({ ...prev, isOpen: false }));
//         }}
//         onSubmit={handleKKCMemberSubmit}
//         member={selectedKKCMember}
//         mode={kkcModalMode}
//         toast={kkcModalToast}
//         onCloseToast={() => setKKCModalToast((prev) => ({ ...prev, isOpen: false }))}
//       />

//       <UserDetailModal
//         isOpen={showUserDetailModal}
//         onClose={() => {
//           setShowUserDetailModal(false);
//           setSelectedRegistration(null);
//         }}
//         registration={selectedRegistration}
//         onApprove={(id) => updateStatus(id, 'approved')}
//         onReject={(id) => updateStatus(id, 'rejected')}
//         onSelectForAudition={selectForAudition}
//         onDelete={deleteRegistration}
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">
//               Admin <span className="text-amber-500">Dashboard</span>
//             </h1>
//             <p className="text-gray-400">Manage audition registrations and KKC members</p>
//           </div>
//           <div className="flex gap-3">
//             <Button variant="secondary" onClick={() => setShowKKCMembersModal(true)}>
//               <Users size={20} className="mr-2" />
//               KKC Members
//             </Button>
//             <Button onClick={() => setCurrentPage('form-management')}>Manage Forms</Button>
//             <Button variant="outline" onClick={handleLogout}>
//               Logout
//             </Button>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-6 gap-4 mb-8">
//           <Card hover className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30">
//             <div className="flex items-center gap-3">
//               <Users className="text-amber-500" size={32} />
//               <div>
//                 <p className="text-gray-400 text-sm">Total</p>
//                 <p className="text-2xl font-bold text-white">{stats.total}</p>
//               </div>
//             </div>
//           </Card>

//           {Object.entries(dateCounts).map(([date, count]) => (
//   <Card key={date}>
//     <div className="flex items-center gap-3">
//       <Calendar className="text-blue-500" size={32} />
//       <div>
//         <p className="text-gray-400 text-sm">
//           {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
//         </p>
//         <p className="text-2xl font-bold text-white">{count as number}</p>
//       </div>
//     </div>
//   </Card>
// ))}

//           <Card hover className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
//             <div className="flex items-center gap-3">
//               <Clock className="text-yellow-500" size={32} />
//               <div>
//                 <p className="text-gray-400 text-sm">Pending</p>
//                 <p className="text-2xl font-bold text-white">{stats.pending}</p>
//               </div>
//             </div>
//           </Card>

//           <Card hover className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
//             <div className="flex items-center gap-3">
//               <CheckCircle className="text-green-500" size={32} />
//               <div>
//                 <p className="text-gray-400 text-sm">Approved</p>
//                 <p className="text-2xl font-bold text-white">{stats.approved}</p>
//               </div>
//             </div>
//           </Card>

//           <Card hover className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-amber-500/30">
//             <div className="flex items-center gap-3">
//               <Star className="text-amber-500" size={32} />
//               <div>
//                 <p className="text-gray-400 text-sm">Selected</p>
//                 <p className="text-2xl font-bold text-white">{stats.selected}</p>
//               </div>
//             </div>
//           </Card>
//         </div>

//         <Card className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
//           <div className="flex flex-col lg:flex-row gap-4 mb-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <Input
//                   placeholder="Search by name, mobile, email, city, or KKC ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             <Select
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//               options={[
//                 { value: '2026-05-08', label: '08 May 2026' },
//                 { value: '2026-05-09', label: '09 May 2026' },
//                 { value: '2026-05-10', label: '10 May 2026' },
//               ]}
//               className="lg:w-48"
//             />

//             <Select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               options={[
//                 { value: 'pending', label: 'Pending' },
//                 { value: 'approved', label: 'Approved' },
//                 { value: 'rejected', label: 'Rejected' },
//               ]}
//               className="lg:w-48"
//             />

//             <Select
//               value={itemsPerPage.toString()}
//               onChange={(e) => {
//                 setItemsPerPage(Number(e.target.value));
//                 setCurrentPageNum(1);
//               }}
//               options={[
//                 { value: '10', label: '10 per page' },
//                 { value: '25', label: '25 per page' },
//                 { value: '50', label: '50 per page' },
//                 { value: '100', label: '100 per page' },
//               ]}
//               className="lg:w-48"
//             />

//             <Button onClick={resetFilters} variant="outline">
//               <RotateCcw size={20} className="mr-2" />
//               Reset
//             </Button>

//             <Button onClick={exportToExcel} variant="secondary">
//               <Download size={20} className="mr-2" />
//               Export
//             </Button>
//           </div>
//         </Card>

//         <Card className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-white">
//               Registrations ({filteredRegistrations.length})
//             </h2>
//             {totalPages > 1 && (
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => goToPage(currentPageNum - 1)}
//                   disabled={currentPageNum === 1}
//                   className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <span className="text-gray-300 text-sm">
//                   Page {currentPageNum} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => goToPage(currentPageNum + 1)}
//                   disabled={currentPageNum === totalPages}
//                   className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b border-gray-700">
//                 <tr>
//                   <th className="text-left text-sm font-semibold text-gray-400 pb-3">Name</th>
//                   <th className="text-left text-sm font-semibold text-gray-400 pb-3">Mobile</th>
//                   <th className="text-left text-sm font-semibold text-gray-400 pb-3">City</th>
//                   <th className="text-left text-sm font-semibold text-gray-400 pb-3">Date</th>
//                   <th className="text-left text-sm font-semibold text-gray-400 pb-3">Status</th>
//                   <th className="text-left text-sm font-semibold text-gray-400 pb-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedRegistrations.map((reg) => (
//                   <tr
//                     key={reg.id}
//                     className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors"
//                     onClick={() => {
//                       setSelectedRegistration(reg);
//                       setShowUserDetailModal(true);
//                     }}
//                   >
//                     <td className="py-4">
//                       <div className="flex items-center gap-2">
//                         <span className="text-white text-sm font-medium">{reg.full_name}</span>
//                         {reg.is_member && <Award className="text-amber-500" size={16} />}
//                         {reg.is_selected_for_audition && <Star className="text-amber-500" size={16} />}
//                       </div>
//                     </td>
//                     <td className="py-4 text-gray-300 text-sm">{reg.mobile}</td>
//                     <td className="py-4 text-gray-300 text-sm">{reg.city}</td>
//                     <td className="py-4 text-gray-300 text-sm">
//                       {new Date(reg.audition_date).toLocaleDateString('en-IN', {
//                         day: '2-digit',
//                         month: 'short',
//                       })}
//                     </td>
//                     <td className="py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           reg.payment_status === 'approved'
//                             ? 'bg-green-500/20 text-green-500 border border-green-500/30'
//                             : reg.payment_status === 'rejected'
//                             ? 'bg-red-500/20 text-red-500 border border-red-500/30'
//                             : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
//                         }`}
//                       >
//                         {reg.payment_status}
//                       </span>
//                     </td>
//                     <td className="py-4">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setSelectedRegistration(reg);
//                           setShowUserDetailModal(true);
//                         }}
//                         className="text-amber-500 hover:text-amber-400 p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
//                       >
//                         <Eye size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {filteredRegistrations.length === 0 && (
//               <div className="text-center py-12 text-gray-400">
//                 <Users size={48} className="mx-auto mb-4 opacity-50" />
//                 <p className="text-lg">No registrations found</p>
//               </div>
//             )}
//           </div>

//           {totalPages > 1 && (
//             <div className="flex items-center justify-center gap-2 mt-6">
//               <button
//                 onClick={() => goToPage(currentPageNum - 1)}
//                 disabled={currentPageNum === 1}
//                 className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPageNum <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPageNum >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPageNum - 2 + i;
//                 }
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => goToPage(pageNum)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium ${
//                       currentPageNum === pageNum
//                         ? 'bg-amber-500 text-white'
//                         : 'bg-gray-700 hover:bg-gray-600 text-white'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//               <button
//                 onClick={() => goToPage(currentPageNum + 1)}
//                 disabled={currentPageNum === totalPages}
//                 className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </Card>

//       </div>
//     </div>
//   );
// }
import { Calendar, CheckCircle, Clock, Download, Eye, Search, Users, Star, ChevronLeft, ChevronRight, RotateCcw, Award, ChevronDown, Image as ImageIconLucide } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  getRegistrations,
  updateRegistrationStatus,
  removeRegistration,
  adjustSlot,
  RegistrationExtended,
  getAllKKCMembers,
  addKKCMember,
  editKKCMember,
  removeKKCMember,
  KKCMember,
  getAllGalleryItems,
  addGalleryItem,
  removeGalleryItem,
  GalleryItem,
} from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { KKCMemberModal } from '../admin/KKCMemberModal';
import { KKCMembersModal } from '../admin/KKCMembersModal';
import { UserDetailModal } from '../admin/UserDetailModal';
import { GalleryModal } from '../admin/GalleryModal';
import { AddGalleryItemModal } from '../admin/AddGalleryItemModal';

const DEFAULT_ITEMS_PER_PAGE = 10;

export function AdminDashboard() {
  const { setCurrentPage, isAdmin, setIsAdmin } = useApp();
  const { toast, showToast, hideToast } = useToast();

  const [registrations, setRegistrations] = useState<RegistrationExtended[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationExtended[]>([]);
  const [kkcMembers, setKKCMembers] = useState<KKCMember[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const [stats, setStats] = useState({
    total: 0,
    unpaid: 0,
    paid: 0,
    selected: 0,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationExtended | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [showKKCMembersModal, setShowKKCMembersModal] = useState(false);
  const [showKKCModal, setShowKKCModal] = useState(false);
  const [kkcModalMode, setKKCModalMode] = useState<'add' | 'edit'>('add');
  const [selectedKKCMember, setSelectedKKCMember] = useState<KKCMember | null>(null);
  const [showUserDetailModal, setShowUserDetailModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [galleryModalType, setGalleryModalType] = useState<'image' | 'video'>('image');
  const [showManageUsDropdown, setShowManageUsDropdown] = useState(false);

  const manageUsRef = useRef<HTMLDivElement>(null);

  const [kkcModalToast, setKKCModalToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info'; isOpen: boolean }>({
    message: '',
    type: 'success',
    isOpen: false,
  });

  useEffect(() => {
    if (!isAdmin) {
      setCurrentPage('admin-login');
      return;
    }
    fetchRegistrations();
    fetchKKCMembers();
    fetchGalleryItems();
  }, [isAdmin]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, dateFilter, statusFilter, registrations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (manageUsRef.current && !manageUsRef.current.contains(event.target as Node)) {
        setShowManageUsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      window.history.pushState(null, '', window.location.pathname);
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const fetchRegistrations = async () => {
    try {
      const data: RegistrationExtended[] = await getRegistrations();
      const activeRegistrations = data.filter((r) => {
        if (typeof r.is_deleted === 'boolean') return !r.is_deleted;
        if (typeof r.is_deleted === 'string') return r.is_deleted.toLowerCase() !== 'true';
        if (typeof r.is_deleted === 'number') return r.is_deleted === 0;
        return true;
      });
      setRegistrations(activeRegistrations);
      calculateStats(activeRegistrations);
    } catch (err) {
      console.error('Failed to fetch registrations', err);
      showToast('Failed to fetch registrations', 'error');
    }
  };

  const fetchKKCMembers = async () => {
    try {
      const data = await getAllKKCMembers();
      setKKCMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch KKC members', err);
      setKKCMembers([]);
    }
  };

 const fetchGalleryItems = async () => {
  try {
    const res = await getAllGalleryItems();
    console.log("Gallery API Response:", res);

    setGalleryItems(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error('Failed to fetch gallery items', err);
    setGalleryItems([]);
  }
};

  const calculateStats = (data: RegistrationExtended[]) => {
    setStats({
      total: data.length,
      unpaid: data.filter((r) => r.payment_status !== 'PAID').length,
      paid: data.filter((r) => r.payment_status === 'PAID').length,
      selected: data.filter((r) => r.is_selected_for_audition).length,
    });
  };

  const applyFilters = () => {
    let filtered = [...registrations];

    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.mobile.includes(searchTerm) ||
          r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.kkc_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((r) => r.audition_date === dateFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((r) => {
        const paymentStatus = r.payment_status;
        return paymentStatus === statusFilter;
      });
    }

    setFilteredRegistrations(filtered);
    setCurrentPageNum(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setStatusFilter('');
  };

  const showKKCModalToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setKKCModalToast({ message, type, isOpen: true });
    setTimeout(() => {
      setKKCModalToast((prev) => ({ ...prev, isOpen: false }));
    }, 3000);
  };

  const updateStatus = async (id: string, status: RegistrationExtended['payment_status']) => {
    try {
      await updateRegistrationStatus(id, status);
      fetchRegistrations();
      if (selectedRegistration?.id === id) {
        setSelectedRegistration({ ...selectedRegistration, payment_status: status });
      }
      showToast(`Payment ${status}`, 'success');
    } catch (err) {
      console.error('Error updating status', err);
      showToast('Failed to update status', 'error');
    }
  };

  const selectForAudition = async (id: string) => {
    try {
      const registration = registrations.find((r) => r.id === id);
      if (!registration) return;

      const updatedReg = { ...registration, is_selected_for_audition: true, selected_at: new Date().toISOString() };

      const updatedList = registrations.map((r) => (r.id === id ? updatedReg : r));
      setRegistrations(updatedList);

      if (selectedRegistration?.id === id) {
        setSelectedRegistration(updatedReg);
      }

      showToast('Participant selected for audition', 'success');
    } catch (err) {
      console.error('Error selecting for audition', err);
      showToast('Failed to select for audition', 'error');
    }
  };

  const deleteRegistration = async (id: string) => {
  try {
    await removeRegistration(id);

    fetchRegistrations();
    setSelectedRegistration(null);
    setShowUserDetailModal(false);

    showToast('Registration deleted successfully', 'success');
  } catch (err) {
    console.error('Error deleting registration', err);
    showToast('Failed to delete registration', 'error');
  }
};

  const handleKKCMemberSubmit = async (data: Partial<KKCMember>) => {
    try {
      let res;

      if (kkcModalMode === 'add') {
        res = await addKKCMember(data);
      } else {
        res = await editKKCMember(data);
      }

      showKKCModalToast(res.message, 'success');
      fetchKKCMembers();
      setShowKKCModal(false);
    } catch (err: any) {
      showKKCModalToast(err.message, 'error');
    }
  };

  const handleDeleteKKCMember = async (id: string) => {
    try {
      const res = await removeKKCMember(id);

      showKKCModalToast(res.message, 'success');
      fetchKKCMembers();
    } catch (err: any) {
      showKKCModalToast(err.message, 'error');
    }
  };

  const handleAddGalleryItem = async (data: FormData) => {
    try {
      const res = await addGalleryItem(data);
      if (res.success) {
        showToast('Gallery item added successfully', 'success');
        fetchGalleryItems();
        setShowAddGalleryModal(false);
      } else {
        showToast(res.message || 'Failed to add gallery item', 'error');
      }
    } catch (err) {
      console.error('Error adding gallery item', err);
      showToast('Failed to add gallery item', 'error');
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    try {
      const res = await removeGalleryItem(id);
      if (res.success) {
        fetchGalleryItems();
      }
    } catch (err) {
      console.error('Error deleting gallery item', err);
    }
  };

  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.length > 0 ? filteredRegistrations : registrations;

    const headers = [
      'Name',
      'Mobile',
      'WhatsApp',
      'Email',
      'City',
      'Date',
      'Time Slot',
      'Member',
      'Amount',
      'Status',
      'Selected',
    ];
    const rows = dataToExport.map((r) => [
      r.full_name,
      r.mobile,
      r.whatsapp_number || r.mobile,
      r.email,
      r.city,
      r.audition_date,
      r.time_slot || 'N/A',
      r.is_member ? 'Yes' : 'No',
      r.payment_amount,
      r.payment_status,
      r.is_selected_for_audition ? 'Yes' : 'No',
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString()}.csv`;
    a.click();

    showToast('Data exported successfully', 'success');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setCurrentPage('admin-login');
  };

  const dateCounts = registrations.reduce((acc: any, r) => {
    acc[r.audition_date] = (acc[r.audition_date] || 0) + 1;
    return acc;
  }, {});

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const startIndex = (currentPageNum - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRegistrations = filteredRegistrations.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPageNum(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-16 sm:py-24">
      {toast.isOpen && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <KKCMembersModal
        isOpen={showKKCMembersModal}
        onClose={() => setShowKKCMembersModal(false)}
        members={kkcMembers}
        onAdd={() => {
          setKKCModalMode('add');
          setSelectedKKCMember(null);
          setShowKKCModal(true);
        }}
        onEdit={(member) => {
          setSelectedKKCMember(member);
          setKKCModalMode('edit');
          setShowKKCModal(true);
        }}
        onDelete={handleDeleteKKCMember}
      />

      <KKCMemberModal
        isOpen={showKKCModal}
        onClose={() => {
          setShowKKCModal(false);
          setSelectedKKCMember(null);
          setKKCModalToast((prev) => ({ ...prev, isOpen: false }));
        }}
        onSubmit={handleKKCMemberSubmit}
        member={selectedKKCMember}
        mode={kkcModalMode}
        toast={kkcModalToast}
        onCloseToast={() => setKKCModalToast((prev) => ({ ...prev, isOpen: false }))}
      />

      <UserDetailModal
        isOpen={showUserDetailModal}
        onClose={() => {
          setShowUserDetailModal(false);
          setSelectedRegistration(null);
        }}
        registration={selectedRegistration}
        onSelectForAudition={selectForAudition}
        onDelete={deleteRegistration}
      />

      <GalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        galleryItems={galleryItems}
        onAddImage={() => {
          setGalleryModalType('image');
          setShowAddGalleryModal(true);
        }}
        onAddVideo={() => {
          setGalleryModalType('video');
          setShowAddGalleryModal(true);
        }}
        onDelete={handleDeleteGalleryItem}
      />

      <AddGalleryItemModal
        isOpen={showAddGalleryModal}
        onClose={() => setShowAddGalleryModal(false)}
        onSubmit={handleAddGalleryItem}
        type={galleryModalType}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Admin <span className="text-amber-500">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage audition registrations and KKC members</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <Button variant="secondary" onClick={() => setShowKKCMembersModal(true)} className="flex-1 sm:flex-none">
              <Users size={18} className="mr-2" />
              <span className="text-sm">KKC Members</span>
            </Button>
            <div className="relative flex-1 sm:flex-none" ref={manageUsRef}>
              <Button
                onClick={() => setShowManageUsDropdown(!showManageUsDropdown)}
                className="w-full"
              >
                <span className="text-sm">Manage Us</span>
                <ChevronDown size={18} className="ml-2" />
              </Button>
              {showManageUsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <button
                    onClick={() => {
                      setShowGalleryModal(true);
                      setShowManageUsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-white hover:bg-gray-700 rounded-t-lg transition-colors flex items-center gap-2"
                  >
                    <ImageIconLucide size={18} className="text-amber-500" />
                    <span className="text-sm">Manage Gallery</span>
                  </button>
                </div>
              )}
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex-1 sm:flex-none">
              <span className="text-sm">Logout</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card hover className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="text-amber-500" size={24} />
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </Card>

          {Object.entries(dateCounts).map(([date, count]) => (
            <Card key={date}>
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="text-blue-500" size={24} />
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-white">{count as number}</p>
                </div>
              </div>
            </Card>
          ))}

          <Card hover className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Clock className="text-yellow-500" size={24} />
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Unpaid</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.unpaid}</p>
              </div>
            </div>
          </Card>

          <Card hover className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Paid</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.paid}</p>
              </div>
            </div>
          </Card>

          <Card hover className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border-amber-500/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <Star className="text-amber-500" size={24} />
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Selected</p>
                <p className="text-xl sm:text-2xl font-bold text-white">{stats.selected}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mb-4 sm:mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="w-full">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search by name, mobile, email, city, or KKC ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              <Select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                options={[
                  { value: '2026-05-08', label: '08 May 2026' },
                  { value: '2026-05-09', label: '09 May 2026' },
                  { value: '2026-05-10', label: '10 May 2026' },
                ]}
                className="text-sm"
              />

              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: 'paid', label: 'Paid' },
                  { value: 'unpaid', label: 'Unpaid' },
                ]}
                className="text-sm"
              />

              <Select
                value={itemsPerPage.toString()}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPageNum(1);
                }}
                options={[
                  { value: '10', label: '10 per page' },
                  { value: '25', label: '25 per page' },
                  { value: '50', label: '50 per page' },
                  { value: '100', label: '100 per page' },
                ]}
                className="text-sm"
              />

              <div className="col-span-2 lg:col-span-1 flex gap-2">
                <Button onClick={resetFilters} variant="outline" className="flex-1" size="sm">
                  <RotateCcw size={16} className="mr-1" />
                  <span className="text-xs sm:text-sm">Reset</span>
                </Button>

                <Button onClick={exportToExcel} variant="secondary" className="flex-1" size="sm">
                  <Download size={16} className="mr-1" />
                  <span className="text-xs sm:text-sm">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Registrations ({filteredRegistrations.length})
            </h2>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPageNum - 1)}
                  disabled={currentPageNum === 1}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-gray-300 text-xs sm:text-sm">
                  Page {currentPageNum} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPageNum + 1)}
                  disabled={currentPageNum === totalPages}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Name</th>
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Mobile</th>
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0 hidden md:table-cell">City</th>
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Date</th>
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Payment Status</th>
                    <th className="text-left text-xs sm:text-sm font-semibold text-gray-400 pb-3 px-2 sm:px-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRegistrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedRegistration(reg);
                        setShowUserDetailModal(true);
                      }}
                    >
                      <td className="py-3 sm:py-4 px-2 sm:px-0">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-white text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
                            {reg.full_name}
                          </span>
                          {Boolean(reg.is_member) && <Award className="text-amber-500 flex-shrink-0" size={14} />}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 text-gray-300 text-xs sm:text-sm px-2 sm:px-0">{reg.mobile}</td>
                      <td className="py-3 sm:py-4 text-gray-300 text-xs sm:text-sm px-2 sm:px-0 hidden md:table-cell">{reg.city}</td>
                      <td className="py-3 sm:py-4 text-gray-300 text-xs sm:text-sm px-2 sm:px-0">
                        {new Date(reg.audition_date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-0">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            reg.payment_status === 'PAID'
                              ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
                          }`}
                        >
                          {reg.payment_status}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRegistration(reg);
                            setShowUserDetailModal(true);
                          }}
                          className="text-amber-500 hover:text-amber-400 p-2 hover:bg-amber-500/10 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-base sm:text-lg">No registrations found</p>
                </div>
              )}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 flex-wrap">
              <button
                onClick={() => goToPage(currentPageNum - 1)}
                disabled={currentPageNum === 1}
                className="px-3 sm:px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPageNum <= 3) {
                  pageNum = i + 1;
                } else if (currentPageNum >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPageNum - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                      currentPageNum === pageNum
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => goToPage(currentPageNum + 1)}
                disabled={currentPageNum === totalPages}
                className="px-3 sm:px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium"
              >
                Next
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
