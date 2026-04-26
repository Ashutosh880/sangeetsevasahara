// // import { AlertCircle, CheckCircle2, Upload, Video } from 'lucide-react';
// // import { FormEvent, useState, useEffect } from 'react';
// // import { useApp } from '../context/AppContext';
// // import {
// //   checkMobile,
// //   insertOtp,
// //   verifyOtp,
// //   getMemberByKKC,
// //   adjustSlot,
// // } from '../lib/api';
// // import { Button } from '../components/ui/Button';
// // import { Card } from '../components/ui/Card';
// // import { Input } from '../components/ui/Input';
// // import { Select } from '../components/ui/Select';
// // import { Textarea } from '../components/ui/Textarea';
// // import { Toast } from '../components/ui/Toast';
// // import { useToast } from '../hooks/useToast';

// // interface FormData {
// //   full_name: string;
// //   parent_name: string;
// //   date_of_birth: string;
// //   gender: string;
// //   mobile: string;
// //   whatsapp_number: string;
// //   sameAsPrimary: boolean;
// //   email: string;
// //   full_address: string;
// //   city: string;
// //   state: string;
// //   pincode: string;
// //   audition_date: string;
// //   youtube_link_1: string;
// //   youtube_link_2: string;
// //   is_member: boolean;
// //   kkc_id: string;
// //   contribution_amount: string;
// //   wantsContribution: boolean;
// // }

// // export function RegistrationPage() {
// //   const { setCurrentPage, setRegistrationData } = useApp();
// //   const { toast, showToast, hideToast } = useToast();

// //   const [formData, setFormData] = useState<FormData>({
// //     full_name: '',
// //     parent_name: '',
// //     date_of_birth: '',
// //     gender: '',
// //     mobile: '',
// //     whatsapp_number: '',
// //     sameAsPrimary: false,
// //     email: '',
// //     full_address: '',
// //     city: '',
// //     state: '',
// //     pincode: '',
// //     audition_date: '',
// //     youtube_link_1: '',
// //     youtube_link_2: '',
// //     is_member: false,
// //     kkc_id: '',
// //     contribution_amount: '',
// //     wantsContribution: false,
// //   });

// //   const [videoFile, setVideoFile] = useState<File | null>(null);
// //   const [videoError, setVideoError] = useState('');

// //   const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
// //   const [profilePhotoError, setProfilePhotoError] = useState('');

// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState<Record<string, string>>({});

// //   const [mobileOtp, setMobileOtp] = useState('');
// //   const [mobileOtpSent, setMobileOtpSent] = useState(false);
// //   const [mobileVerified, setMobileVerified] = useState(false);
// //   const [mobileOtpTimer, setMobileOtpTimer] = useState(0);

// //   const [memberOtp, setMemberOtp] = useState('');
// //   const [memberOtpSent, setMemberOtpSent] = useState(false);
// //   const [memberVerified, setMemberVerified] = useState(false);
// //   const [memberMobile, setMemberMobile] = useState('');

// //   const [sendingOtp, setSendingOtp] = useState(false);
// //   const [verifyingOtp, setVerifyingOtp] = useState(false);
// //   const [verifyingMembership, setVerifyingMembership] = useState(false);
// //   const [verifyingMemberOtp, setVerifyingMemberOtp] = useState(false);
// //   const [acceptedTerms, setAcceptedTerms] = useState(false);

// //   const handleInputChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value, type } = e.target;
// //     const checked = (e.target as HTMLInputElement).checked;

// //     setFormData(prev => {
// //       const updated = {
// //         ...prev,
// //         [name]: type === 'checkbox' ? checked : value,
// //       };

// //       if (name === 'sameAsPrimary' && checked) {
// //         updated.whatsapp_number = updated.mobile;
// //       } else if (name === 'mobile' && updated.sameAsPrimary) {
// //         updated.whatsapp_number = value;
// //       }

// //       return updated;
// //     });

// //     if (errors[name]) {
// //       setErrors(prev => ({ ...prev, [name]: '' }));
// //     }
// //   };

// //   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     setVideoError('');

// //     if (file.type !== 'video/mp4') {
// //       setVideoError('Only MP4 format is allowed');
// //       return;
// //     }

// //     if (file.size > 30 * 1024 * 1024) {
// //       setVideoError('Video size must be less than 30MB');
// //       return;
// //     }

// //     const video = document.createElement('video');
// //     video.preload = 'metadata';
// //     video.onloadedmetadata = () => {
// //       window.URL.revokeObjectURL(video.src);
// //       if (video.duration > 120) {
// //         setVideoError('Video duration must be less than 2 minutes');
// //         setVideoFile(null);
// //       } else {
// //         setVideoFile(file);
// //       }
// //     };
// //     video.src = URL.createObjectURL(file);
// //   };

// //   const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     setProfilePhotoError('');

// //     if (!file.type.startsWith('image/')) {
// //       setProfilePhotoError('Only image files are allowed');
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       setProfilePhotoError('Profile photo size must be less than 5MB');
// //       return;
// //     }

// //     setProfilePhoto(file);
// //   };

// //   useEffect(() => {
// //     let interval: number;
// //     if (mobileOtpTimer > 0) {
// //       interval = window.setInterval(() => {
// //         setMobileOtpTimer(prev => prev - 1);
// //       }, 1000);
// //     }
// //     return () => clearInterval(interval);
// //   }, [mobileOtpTimer]);

// //   const sendMobileOtp = async () => {
// //     if (!formData.mobile || formData.mobile.length !== 10) {
// //       setErrors(prev => ({
// //         ...prev,
// //         mobile: 'Please enter a valid 10-digit mobile number',
// //       }));
// //       return;
// //     }

// //     setSendingOtp(true);
// //     try {
// //       const existing = await checkMobile(formData.mobile);
// //       if (existing && existing.length > 0) {
// //         setErrors(prev => ({
// //           ...prev,
// //           mobile: 'This mobile number is already registered',
// //         }));
// //         return;
// //       }

// //       await insertOtp({ mobile: formData.mobile });

// //       setMobileOtpSent(true);
// //       setMobileOtpTimer(60);
// //       showToast('OTP sent successfully to your mobile', 'success');
// //     } catch (err) {
// //       showToast('Failed to send OTP', 'error');
// //     } finally {
// //       setSendingOtp(false);
// //     }
// //   };

// //   const resendMobileOtp = async () => {
// //     if (mobileOtpTimer > 0) return;

// //     setSendingOtp(true);
// //     try {
// //       await insertOtp({ mobile: formData.mobile });
// //       setMobileOtpTimer(60);
// //       showToast('OTP resent successfully to your mobile', 'success');
// //     } catch (err) {
// //       showToast('Failed to resend OTP', 'error');
// //     } finally {
// //       setSendingOtp(false);
// //     }
// //   };

// //   const verifyMobileOtp = async () => {
// //     setVerifyingOtp(true);
// //     try {
// //       const res: any = await verifyOtp({
// //         mobile: formData.mobile,
// //         otp: mobileOtp,
// //       });

// //       if (res?.verified) {
// //         setMobileVerified(true);
// //         showToast('Mobile number verified successfully', 'success');
// //       } else {
// //         showToast('Invalid or expired OTP', 'error');
// //       }
// //     } catch (err) {
// //       showToast('Invalid or expired OTP', 'error');
// //     } finally {
// //       setVerifyingOtp(false);
// //     }
// //   };

// //   const fetchMemberDetails = async () => {
// //     if (!formData.kkc_id) {
// //       setErrors(prev => ({
// //         ...prev,
// //         kkc_id: 'Please enter KKC ID',
// //       }));
// //       return;
// //     }

// //     setVerifyingMembership(true);
// //     try {
// //       const data: any = await getMemberByKKC(formData.kkc_id);

// //       if (data) {
// //         setMemberMobile(data.mobile);

// //         await insertOtp({ mobile: data.mobile });

// //         setMemberOtpSent(true);
// //         showToast(`OTP sent to registered mobile ${data.mobile}`, 'success');
// //       } else {
// //         setErrors(prev => ({
// //           ...prev,
// //           kkc_id: 'Invalid KKC ID or inactive membership',
// //         }));
// //       }
// //     } catch (err) {
// //       setErrors(prev => ({
// //         ...prev,
// //         kkc_id: 'Invalid KKC ID or inactive membership',
// //       }));
// //     } finally {
// //       setVerifyingMembership(false);
// //     }
// //   };

// //   const verifyMemberOtp = async () => {
// //     setVerifyingMemberOtp(true);
// //     try {
// //       const res: any = await verifyOtp({
// //         mobile: memberMobile,
// //         otp: memberOtp,
// //       });

// //       if (res?.verified) {
// //         setMemberVerified(true);
// //         showToast('Membership verified successfully', 'success');
// //       } else {
// //         showToast('Invalid or expired OTP', 'error');
// //       }
// //     } catch (err) {
// //       showToast('Invalid or expired OTP', 'error');
// //     } finally {
// //       setVerifyingMemberOtp(false);
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors: Record<string, string> = {};

// //     if (!formData.full_name) newErrors.full_name = 'Name is required';
// //     if (!formData.parent_name) newErrors.parent_name = 'Parent name is required';
// //     if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
// //     if (!formData.gender) newErrors.gender = 'Gender is required';
// //     if (!mobileVerified) newErrors.mobile = 'Please verify your mobile number';
// //     if (!formData.whatsapp_number) newErrors.whatsapp_number = 'WhatsApp number is required';
// //     if (!formData.email) newErrors.email = 'Email is required';
// //     if (!formData.full_address) newErrors.full_address = 'Address is required';
// //     if (!formData.city) newErrors.city = 'City is required';
// //     if (!formData.state) newErrors.state = 'State is required';
// //     if (!formData.pincode) newErrors.pincode = 'Pincode is required';
// //     if (!formData.audition_date) newErrors.audition_date = 'Audition date is required';
// //     if (!videoFile) newErrors.video = 'Video is required';
// //     if (!profilePhoto) newErrors.profile_photo = 'Profile photo is required';

// //     if (formData.is_member && !memberVerified) {
// //       newErrors.kkc_id = 'Please verify your KKC membership';
// //     }

// //     if (formData.wantsContribution && !formData.contribution_amount) {
// //       newErrors.contribution_amount = 'Please enter contribution amount';
// //     }

// //     if (!acceptedTerms) {
// //       newErrors.terms = 'You must accept the terms and conditions';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e: FormEvent) => {
// //   e.preventDefault();

// //   if (!validateForm()) {
// //     showToast('Please fill all required fields', 'error');
// //     return;
// //   }

// //   setLoading(true);

// //   try {

// //     const isLifetimeMemberWithoutContribution =
// //       formData.is_member && memberVerified && !formData.wantsContribution;

// //     const paymentAmount = isLifetimeMemberWithoutContribution
// //       ? 0
// //       : (formData.wantsContribution
// //           ? parseFloat(formData.contribution_amount)
// //           : 499);

// //     // 🔴 Create FormData to send files + form fields
// //     const formDataToSend = new FormData();

// //     formDataToSend.append("full_name", formData.full_name);
// //     formDataToSend.append("parent_name", formData.parent_name);
// //     formDataToSend.append("date_of_birth", formData.date_of_birth);
// //     formDataToSend.append("gender", formData.gender);
// //     formDataToSend.append("mobile", formData.mobile);
// //     formDataToSend.append("email", formData.email);
// //     formDataToSend.append("full_address", formData.full_address);
// //     formDataToSend.append("city", formData.city);
// //     formDataToSend.append("state", formData.state);
// //     formDataToSend.append("pincode", formData.pincode);
// //     formDataToSend.append("category", "Senior"); // or dynamic if needed
// //     formDataToSend.append("audition_date", formData.audition_date);

// //     formDataToSend.append("youtube_link_1", formData.youtube_link_1);
// //     formDataToSend.append("youtube_link_2", formData.youtube_link_2);

// //     formDataToSend.append("is_member", formData.is_member ? "1" : "0");
// //     formDataToSend.append("kkc_id", formData.kkc_id);

// //     formDataToSend.append("payment_amount", paymentAmount.toString());
// //     formDataToSend.append("payment_status", "pending");

// //     // 🔴 attach files
// //     if (videoFile) {
// //       formDataToSend.append("video", videoFile);
// //     }

// //     if (profilePhoto) {
// //       formDataToSend.append("profile_photo", profilePhoto);
// //     }

// //     // If payment required → go to payment page
// // if (paymentAmount > 0) {

// //   setRegistrationData({
// //     ...formData,
// //     payment_amount: paymentAmount,
// //     videoFile,
// //     profilePhoto
// //   });

// //   setCurrentPage("payment");
// //   return;
// // }

// // // If FREE registration
// // const response = await fetch("/api/register.php", {
// //   method: "POST",
// //   body: formDataToSend
// // });

// // const result = await response.json();

// // if (!result.success) {
// //   throw new Error("Registration failed");
// // }

// // await adjustSlot(formData.audition_date);

// // showToast(
// //   "Registration successful! You will receive confirmation soon.",
// //   "success"
// // );

// // setTimeout(() => setCurrentPage("home"), 2000);

// //     // const result = await response.json();

// //     if (!result.success) {
// //       throw new Error("Registration failed");
// //     }

// //     // 🔴 Adjust slot after registration
// //     await adjustSlot(formData.audition_date);

// //     showToast(
// //       "Registration successful! You will receive confirmation soon.",
// //       "success"
// //     );

// //     setTimeout(() => setCurrentPage("home"), 2000);

// //   } catch (error) {

// //     console.error(error);

// //     showToast(
// //       "Registration failed. Please try again.",
// //       "error"
// //     );

// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   const getButtonText = () => {
// //     if (formData.is_member && memberVerified) {
// //       if (formData.wantsContribution && formData.contribution_amount) {
// //         return 'Proceed to Payment';
// //       }
// //       return 'Register';
// //     }
// //     return 'Proceed to Payment';
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

// //       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
// //             Audition <span className="text-amber-500">Registration</span>
// //           </h1>
// //           <p className="text-xl text-gray-400">Fill in your details to register for auditions</p>
// //         </div>

// //         <Card>
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Personal Information Section */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
// //                 Personal Information
// //               </h2>
// //               <div className="space-y-6">
// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <Input
// //                     label="Full Name"
// //                     name="full_name"
// //                     value={formData.full_name}
// //                     onChange={handleInputChange}
// //                     required
// //                     error={errors.full_name}
// //                     placeholder="Enter your full name"
// //                   />
// //                   <Input
// //                     label="Father/Mother Name"
// //                     name="parent_name"
// //                     value={formData.parent_name}
// //                     onChange={handleInputChange}
// //                     required
// //                     error={errors.parent_name}
// //                     placeholder="Enter parent's name"
// //                   />
// //                 </div>

// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <Input
// //                     label="Date of Birth"
// //                     name="date_of_birth"
// //                     type="date"
// //                     value={formData.date_of_birth}
// //                     onChange={handleInputChange}
// //                     required
// //                     error={errors.date_of_birth}
// //                   />
// //                   <Select
// //                     label="Gender"
// //                     name="gender"
// //                     value={formData.gender}
// //                     onChange={handleInputChange}
// //                     options={[
// //                       { value: 'Male', label: 'Male' },
// //                       { value: 'Female', label: 'Female' },
// //                       { value: 'Other', label: 'Other' }
// //                     ]}
// //                     required
// //                     error={errors.gender}
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-300 mb-2">
// //                     Upload Profile Photo <span className="text-red-500">*</span>
// //                   </label>
// //                   <p className="text-sm text-gray-400 mb-3">Max 5MB, JPG/PNG format</p>
// //                   <div className="relative">
// //                     <input
// //                       type="file"
// //                       accept="image/*"
// //                       onChange={handleProfilePhotoChange}
// //                       className="hidden"
// //                       id="profile-photo-upload"
// //                     />
// //                     <label
// //                       htmlFor="profile-photo-upload"
// //                       className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
// //                     >
// //                       {profilePhoto ? (
// //                         <>
// //                           <CheckCircle2 size={24} className="text-green-500" />
// //                           <span className="text-white">{profilePhoto.name}</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Upload size={24} className="text-gray-400" />
// //                           <span className="text-gray-400">Click to upload profile photo</span>
// //                         </>
// //                       )}
// //                     </label>
// //                   </div>
// //                   {profilePhotoError && (
// //                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle size={16} />
// //                       {profilePhotoError}
// //                     </p>
// //                   )}
// //                   {errors.profile_photo && <p className="mt-1 text-sm text-red-500">{errors.profile_photo}</p>}
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Contact Information Section */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
// //                 Contact Information
// //               </h2>
// //               <div className="space-y-6">
// //                 <div className="space-y-4">
// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <Input
// //                       label="Primary Mobile Number"
// //                       name="mobile"
// //                       type="tel"
// //                       value={formData.mobile}
// //                       onChange={handleInputChange}
// //                       maxLength={10}
// //                       required
// //                       error={errors.mobile}
// //                       disabled={mobileVerified}
// //                       placeholder="10-digit mobile number"
// //                     />
// //                     <div className="flex items-end gap-2">
// //                       {!mobileVerified && !mobileOtpSent && (
// //                         <Button type="button" onClick={sendMobileOtp} variant="secondary" className="w-full" isLoading={sendingOtp}>
// //                           Send OTP
// //                         </Button>
// //                       )}
// //                       {!mobileVerified && mobileOtpSent && mobileOtpTimer > 0 && (
// //                         <div className="flex items-center justify-center w-full text-sm text-gray-400">
// //                           Resend OTP in {mobileOtpTimer}s
// //                         </div>
// //                       )}
// //                       {!mobileVerified && mobileOtpSent && mobileOtpTimer === 0 && (
// //                         <Button type="button" onClick={resendMobileOtp} variant="secondary" className="w-full" isLoading={sendingOtp}>
// //                           Resend OTP
// //                         </Button>
// //                       )}
// //                       {mobileVerified && (
// //                         <div className="flex items-center gap-2 text-green-500 w-full justify-center bg-green-500/10 rounded-lg py-3">
// //                           <CheckCircle2 size={20} />
// //                           <span className="font-medium">Verified</span>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {mobileOtpSent && !mobileVerified && (
// //                     <div className="grid md:grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg">
// //                       <Input
// //                         label="Enter OTP"
// //                         value={mobileOtp}
// //                         onChange={(e) => setMobileOtp(e.target.value)}
// //                         maxLength={6}
// //                         placeholder="6-digit OTP"
// //                       />
// //                       <div className="flex items-end">
// //                         <Button type="button" onClick={verifyMobileOtp} variant="secondary" className="w-full" isLoading={verifyingOtp}>
// //                           Verify OTP
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="space-y-3">
// //                   <Input
// //                     label="WhatsApp Number"
// //                     name="whatsapp_number"
// //                     type="tel"
// //                     value={formData.whatsapp_number}
// //                     onChange={handleInputChange}
// //                     maxLength={10}
// //                     required
// //                     error={errors.whatsapp_number}
// //                     disabled={formData.sameAsPrimary}
// //                     placeholder="10-digit WhatsApp number"
// //                   />
// //                   <label className="flex items-center gap-2 cursor-pointer">
// //                     <input
// //                       type="checkbox"
// //                       name="sameAsPrimary"
// //                       checked={formData.sameAsPrimary}
// //                       onChange={handleInputChange}
// //                       className="w-4 h-4"
// //                     />
// //                     <span className="text-sm text-gray-300">Same as Primary Mobile Number</span>
// //                   </label>
// //                 </div>

// //                 <Input
// //                   label="Email Address"
// //                   name="email"
// //                   type="email"
// //                   value={formData.email}
// //                   onChange={handleInputChange}
// //                   required
// //                   error={errors.email}
// //                   placeholder="your.email@example.com"
// //                 />
// //               </div>
// //             </div>

// //             {/* Address Section */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
// //                 Address Details
// //               </h2>
// //               <div className="space-y-6">
// //                 <Textarea
// //                   label="Full Address"
// //                   name="full_address"
// //                   value={formData.full_address}
// //                   onChange={handleInputChange}
// //                   rows={3}
// //                   required
// //                   error={errors.full_address}
// //                   placeholder="Enter your complete address"
// //                 />

// //                 <div className="grid md:grid-cols-3 gap-6">
// //                   <Input
// //                     label="City"
// //                     name="city"
// //                     value={formData.city}
// //                     onChange={handleInputChange}
// //                     required
// //                     error={errors.city}
// //                     placeholder="City"
// //                   />
// //                   <Input
// //                     label="State"
// //                     name="state"
// //                     value={formData.state}
// //                     onChange={handleInputChange}
// //                     required
// //                     error={errors.state}
// //                     placeholder="State"
// //                   />
// //                   <Input
// //                     label="Pincode"
// //                     name="pincode"
// //                     type="text"
// //                     value={formData.pincode}
// //                     onChange={handleInputChange}
// //                     maxLength={6}
// //                     required
// //                     error={errors.pincode}
// //                     placeholder="6-digit pincode"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Audition Details Section */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
// //                 Audition Details
// //               </h2>
// //               <div className="space-y-6">
// //                 {/* <Select
// //                   label="Category"
// //                   name="category"
// //                   value={formData.category}
// //                   onChange={handleInputChange}
// //                   options={[
// //                     { value: 'Solo', label: 'Solo' },
// //                     { value: 'Duet', label: 'Duet' },
// //                     { value: 'Group', label: 'Group' }
// //                   ]}
// //                   required
// //                   error={errors.category}
// //                 /> */}

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-300 mb-3">
// //                     Select Audition Date <span className="text-red-500">*</span>
// //                   </label>
// //                   <div className="grid md:grid-cols-3 gap-4">
// //                     <label className={`relative flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                       formData.audition_date === '2026-05-23'
// //                         ? 'border-amber-500 bg-amber-500/10'
// //                         : 'border-gray-700 hover:border-amber-500/50'
// //                     }`}>
// //                       <div>
// //                         <p className="text-white font-semibold">08 May 2026</p>
// //                         <p className="text-sm text-gray-400">Friday</p>
// //                       </div>
// //                       <input
// //                         type="radio"
// //                         name="audition_date"
// //                         value="2026-05-08"
// //                         checked={formData.audition_date === '2026-05-08'}
// //                         onChange={handleInputChange}
// //                         className="w-5 h-5"
// //                       />
// //                     </label>

// //                     <label className={`relative flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                       formData.audition_date === '2026-05-09'
// //                         ? 'border-amber-500 bg-amber-500/10'
// //                         : 'border-gray-700 hover:border-amber-500/50'
// //                     }`}>
// //                       <div>
// //                         <p className="text-white font-semibold">09 May 2026</p>
// //                         <p className="text-sm text-gray-400">Saturday</p>
// //                       </div>
// //                       <input
// //                         type="radio"
// //                         name="audition_date"
// //                         value="2026-05-09"
// //                         checked={formData.audition_date === '2026-05-09'}
// //                         onChange={handleInputChange}
// //                         className="w-5 h-5"
// //                       />
// //                     </label>

// //                     <label className={`relative flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                       formData.audition_date === '2026-05-10'
// //                         ? 'border-amber-500 bg-amber-500/10'
// //                         : 'border-gray-700 hover:border-amber-500/50'
// //                     }`}>
// //                       <div>
// //                         <p className="text-white font-semibold">10 May 2026</p>
// //                         <p className="text-sm text-gray-400">Sunday</p>
// //                       </div>
// //                       <input
// //                         type="radio"
// //                         name="audition_date"
// //                         value="2026-05-10"
// //                         checked={formData.audition_date === '2026-05-10'}
// //                         onChange={handleInputChange}
// //                         className="w-5 h-5"
// //                       />
// //                     </label>
// //                   </div>
// //                   {errors.audition_date && <p className="mt-2 text-sm text-red-500">{errors.audition_date}</p>}
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-300 mb-2">
// //                     Upload Audition Video <span className="text-red-500">*</span>
// //                   </label>
// //                   <p className="text-sm text-gray-400 mb-3">Max 1 minutes, 30MB, MP4 format</p>
// //                   <div className="relative">
// //                     <input
// //                       type="file"
// //                       accept="video/mp4"
// //                       onChange={handleVideoChange}
// //                       className="hidden"
// //                       id="video-upload"
// //                     />
// //                     <label
// //                       htmlFor="video-upload"
// //                       className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
// //                     >
// //                       {videoFile ? (
// //                         <>
// //                           <CheckCircle2 size={24} className="text-green-500" />
// //                           <span className="text-white">{videoFile.name}</span>
// //                         </>
// //                       ) : (
// //                         <>
// //                           <Video size={24} className="text-gray-400" />
// //                           <span className="text-gray-400">Click to upload video</span>
// //                         </>
// //                       )}
// //                     </label>
// //                   </div>
// //                   {videoError && (
// //                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
// //                       <AlertCircle size={16} />
// //                       {videoError}
// //                     </p>
// //                   )}
// //                   {errors.video && <p className="mt-1 text-sm text-red-500">{errors.video}</p>}
// //                 </div>

// //                 <div className="grid md:grid-cols-2 gap-6">
// //                   <Input
// //                     label="YouTube Link 1 (Optional)"
// //                     name="youtube_link_1"
// //                     type="url"
// //                     value={formData.youtube_link_1}
// //                     onChange={handleInputChange}
// //                     placeholder="https://youtube.com/..."
// //                   />
// //                   <Input
// //                     label="YouTube Link 2 (Optional)"
// //                     name="youtube_link_2"
// //                     type="url"
// //                     value={formData.youtube_link_2}
// //                     onChange={handleInputChange}
// //                     placeholder="https://youtube.com/..."
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* KKC Membership Section */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
// //                 KKC Membership
// //               </h2>
// //               <div className="space-y-6">
// //                 <label className="flex items-center gap-3 cursor-pointer bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
// //                   <input
// //                     type="checkbox"
// //                     name="is_member"
// //                     checked={formData.is_member}
// //                     onChange={handleInputChange}
// //                     className="w-5 h-5"
// //                   />
// //                   <span className="text-white font-medium">I am a Lifetime KKC member</span>
// //                 </label>

// //                 {formData.is_member && (
// //                   <div className="bg-gray-800/50 p-6 rounded-lg space-y-6">
// //                     <div className="grid md:grid-cols-2 gap-4">
// //                       <Input
// //                         label="KKC ID"
// //                         name="kkc_id"
// //                         value={formData.kkc_id}
// //                         onChange={handleInputChange}
// //                         error={errors.kkc_id}
// //                         disabled={memberVerified}
// //                         placeholder="Enter your KKC ID"
// //                       />
// //                       <div className="flex items-end gap-2">
// //                         {!memberVerified && !memberOtpSent && (
// //                           <Button type="button" onClick={fetchMemberDetails} variant="secondary" className="w-full" isLoading={verifyingMembership}>
// //                             Verify Membership
// //                           </Button>
// //                         )}
// //                         {memberVerified && (
// //                           <div className="flex items-center gap-2 text-green-500 w-full justify-center bg-green-500/10 rounded-lg py-3">
// //                             <CheckCircle2 size={20} />
// //                             <span className="font-medium">Verified</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {memberOtpSent && !memberVerified && (
// //                       <div className="grid md:grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg">
// //                         <Input
// //                           label="Enter OTP"
// //                           value={memberOtp}
// //                           onChange={(e) => setMemberOtp(e.target.value)}
// //                           maxLength={6}
// //                           placeholder="6-digit OTP"
// //                         />
// //                         <div className="flex items-end">
// //                           <Button type="button" onClick={verifyMemberOtp} variant="secondary" className="w-full" isLoading={verifyingMemberOtp}>
// //                             Verify OTP
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {memberVerified && (
// //                       <div className="border-t border-gray-700 pt-6 space-y-4">
// //                         <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
// //                           <p className="text-green-500 font-medium mb-2">Lifetime Member Benefits</p>
// //                           <p className="text-sm text-gray-300">
// //                             Your registration fee is waived. You may support the contest by contributing if you wish.
// //                           </p>
// //                         </div>

// //                         <label className="flex items-center gap-3 cursor-pointer bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900/70 transition-colors">
// //                           <input
// //                             type="checkbox"
// //                             name="wantsContribution"
// //                             checked={formData.wantsContribution}
// //                             onChange={handleInputChange}
// //                             className="w-5 h-5"
// //                           />
// //                           <span className="text-white">I would like to contribute (optional)</span>
// //                         </label>

// //                         {formData.wantsContribution && (
// //                           <div className="bg-gray-900/50 p-4 rounded-lg">
// //                             <Input
// //                               label="Contribution Amount"
// //                               name="contribution_amount"
// //                               type="number"
// //                               value={formData.contribution_amount}
// //                               onChange={handleInputChange}
// //                               placeholder="Enter amount in ₹"
// //                               error={errors.contribution_amount}
// //                             />
// //                           </div>
// //                         )}
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Terms & Conditions */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
// //                 Terms & Conditions
// //               </h2>
// //               <div className="bg-gray-800/50 p-6 rounded-lg space-y-4 max-h-96 overflow-y-auto mb-6">
// //                 <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
// //                   <p>• The competition is only for singing. Participants can perform only in the singing category.</p>
// //                   <p>• The competition is open to all age groups.</p>
// //                   <p>• Participants under the age of 18 must have permission from a parent or guardian to participate in the competition.</p>
// //                   <p>• <strong className="text-white">The audition registration fee is ₹499 for advertisement. If you qualify for the Quarter Finale, you will need to pay an additional ₹999 for next advertisement registration.</strong></p>
// //                   <p>• The entry fee is taken as an advertisement or promotional fee. It is not a refundable registration fee.</p>
// //                   <p>• Participants are responsible for copyright of the songs they perform. Any copyright issues related to the song will be the responsibility of the participant.</p>
// //                   <p>• The decision of the organizers and judges will be final and binding.</p>
// //                   <p>• Participants must bear their own travel, accommodation, and personal expenses.</p>
// //                   <p>• If any dispute arises, the legal jurisdiction will be Indore, Madhya Pradesh.</p>
// //                   <p>• During the live performance, the organizers will not be responsible for any technical problems or physical issues faced by the participant.</p>
// //                   <p>• This program is not associated with any television show, OTT platform, national brand, or government organization.</p>
// //                   <p>• Selection of participants will be based entirely on the decision of the judging panel.</p>
// //                   <p>• The organizers will not be responsible for any personal loss, technical issue, copyright dispute, or external fraud.</p>
// //                   <p>• The amount paid is considered an advertisement or promotional fee and will not be refunded under any circumstances.</p>
// //                   <p>• The organizers reserve the right to change the event date, time, or rules if necessary.</p>
// //                   <p>• All disputes related to the event will be handled under the jurisdiction of Indore (Madhya Pradesh) only.</p>
// //                 </div>
// //               </div>

// //               <label className="flex items-start gap-3 cursor-pointer bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
// //                 <input
// //                   type="checkbox"
// //                   checked={acceptedTerms}
// //                   onChange={(e) => setAcceptedTerms(e.target.checked)}
// //                   className="w-5 h-5 mt-0.5"
// //                 />
// //                 <span className="text-white">
// //                   I have read and agree to all the terms and conditions mentioned above <span className="text-red-500">*</span>
// //                 </span>
// //               </label>
// //               {errors.terms && <p className="mt-2 text-sm text-red-500">{errors.terms}</p>}
// //             </div>

// //             {/* Payment Summary and Submit */}
// //             <div className="border-t border-gray-700 pt-6">
// //               <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-2 border-amber-500/30 p-6 rounded-lg mb-6">
// //                 <div className="flex justify-between items-center mb-2">
// //                   <span className="text-white font-semibold text-lg">Audition Registration Fee:</span>
// //                   <span className="text-3xl font-bold text-amber-500">
// //                     ₹{formData.is_member && memberVerified ? '0' : '499'}
// //                   </span>
// //                 </div>
// //                 {formData.is_member && memberVerified && (
// //                   <p className="text-sm text-green-500 mt-2 flex items-center gap-2">
// //                     <CheckCircle2 size={16} />
// //                     Lifetime member – registration is free
// //                   </p>
// //                 )}
// //                 {!formData.is_member || !memberVerified ? (
// //                   <p className="text-sm text-amber-400 mt-3 bg-amber-500/10 p-3 rounded-lg">
// //                     <strong>Note:</strong> Quarter Finale qualified participants will need to pay an additional ₹999
// //                   </p>
// //                 ) : null}
// //                 {formData.wantsContribution && formData.contribution_amount && (
// //                   <div className="mt-4 pt-4 border-t border-amber-500/30">
// //                     <div className="flex justify-between items-center">
// //                       <span className="text-white">Contribution Amount:</span>
// //                       <span className="text-2xl font-bold text-amber-500">₹{formData.contribution_amount}</span>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               <Button type="submit" size="lg" className="w-full" isLoading={loading}>
// //                 {getButtonText()}
// //               </Button>
// //             </div>
// //           </form>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// import { AlertCircle, CheckCircle2, Upload, Video } from 'lucide-react';
// import { FormEvent, useState, useEffect } from 'react';
// import { useApp } from '../context/AppContext';
// import {
//   checkMobile,
//   insertOtp,
//   verifyOtp,
//   getMemberByKKC,
//   adjustSlot,
// } from '../lib/api';
// import { Button } from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import { Input } from '../components/ui/Input';
// import { Select } from '../components/ui/Select';
// import { Textarea } from '../components/ui/Textarea';
// import { Modal } from '../components/ui/Modal';

// interface FormData {
//   full_name: string;
//   parent_name: string;
//   date_of_birth: string;
//   gender: string;
//   mobile: string;
//   whatsapp_number: string;
//   sameAsPrimary: boolean;
//   email: string;
//   full_address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   audition_date: string;
//   youtube_link_1: string;
//   youtube_link_2: string;
//   is_member: boolean;
//   kkc_id: string;
//   contribution_amount: string;
//   wantsContribution: boolean;
// }

// export function RegistrationPage() {
//   const { setCurrentPage, setRegistrationData } = useApp();
//   const [modalState, setModalState] = useState<{
//     isOpen: boolean;
//     type: 'success' | 'error';
//     title: string;
//     message: string;
//   }>({
//     isOpen: false,
//     type: 'success',
//     title: '',
//     message: '',
//   });

//   const [formData, setFormData] = useState<FormData>({
//     full_name: '',
//     parent_name: '',
//     date_of_birth: '',
//     gender: '',
//     mobile: '',
//     whatsapp_number: '',
//     sameAsPrimary: false,
//     email: '',
//     full_address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     category: '',
//     audition_date: '',
//     youtube_link_1: '',
//     youtube_link_2: '',
//     is_member: false,
//     kkc_id: '',
//     contribution_amount: '',
//     wantsContribution: false,
//   });

//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [videoError, setVideoError] = useState('');

//   const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
//   const [profilePhotoError, setProfilePhotoError] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const [mobileOtp, setMobileOtp] = useState('');
//   const [mobileOtpSent, setMobileOtpSent] = useState(false);
//   const [mobileVerified, setMobileVerified] = useState(false);
//   const [mobileOtpTimer, setMobileOtpTimer] = useState(0);

//   const [memberOtp, setMemberOtp] = useState('');
//   const [memberOtpSent, setMemberOtpSent] = useState(false);
//   const [memberVerified, setMemberVerified] = useState(false);
//   const [memberMobile, setMemberMobile] = useState('');

//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [verifyingOtp, setVerifyingOtp] = useState(false);
//   const [verifyingMembership, setVerifyingMembership] = useState(false);
//   const [verifyingMemberOtp, setVerifyingMemberOtp] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const showModal = (type: 'success' | 'error', title: string, message: string) => {
//     setModalState({ isOpen: true, type, title, message });
//   };

//   const closeModal = () => {
//     setModalState(prev => ({ ...prev, isOpen: false }));
//     if (modalState.type === 'success') {
//     setTimeout(() => {
//       setCurrentPage('home');
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }, 300);
//   }
// };

//   const handleRetry = () => {
//     setModalState(prev => ({ ...prev, isOpen: false }));
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, type } = e.target;
//     const checked = (e.target as HTMLInputElement).checked;

//     setFormData(prev => {
//       const updated = {
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value,
//       };

//       if (name === 'sameAsPrimary' && checked) {
//         updated.whatsapp_number = updated.mobile;
//       } else if (name === 'mobile' && updated.sameAsPrimary) {
//         updated.whatsapp_number = value;
//       }

//       return updated;
//     });

//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setVideoError('');

//     if (file.type !== 'video/mp4') {
//       setVideoError('Only MP4 format is allowed');
//       return;
//     }

//     if (file.size > 30 * 1024 * 1024) {
//       setVideoError('Video size must be less than 30MB');
//       return;
//     }

//     const video = document.createElement('video');
//     video.preload = 'metadata';
//     video.onloadedmetadata = () => {
//       window.URL.revokeObjectURL(video.src);
//       if (video.duration > 120) {
//         setVideoError('Video duration must be less than 2 minutes');
//         setVideoFile(null);
//       } else {
//         setVideoFile(file);
//       }
//     };
//     video.src = URL.createObjectURL(file);
//   };

//   const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setProfilePhotoError('');

//     if (!file.type.startsWith('image/')) {
//       setProfilePhotoError('Only image files are allowed');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setProfilePhotoError('Profile photo size must be less than 5MB');
//       return;
//     }

//     setProfilePhoto(file);
//   };

//   useEffect(() => {
//     let interval: number;
//     if (mobileOtpTimer > 0) {
//       interval = window.setInterval(() => {
//         setMobileOtpTimer(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [mobileOtpTimer]);

//   const sendMobileOtp = async () => {
//     if (!formData.mobile || formData.mobile.length !== 10) {
//       setErrors(prev => ({
//         ...prev,
//         mobile: 'Please enter a valid 10-digit mobile number',
//       }));
//       return;
//     }

//     setSendingOtp(true);
//     try {
//       const existing = await checkMobile(formData.mobile);
//       if (existing && existing.length > 0) {
//         setErrors(prev => ({
//           ...prev,
//           mobile: 'This mobile number is already registered',
//         }));
//         return;
//       }

//       await insertOtp({ mobile: formData.mobile });

//       setMobileOtpSent(true);
//       setMobileOtpTimer(60);
//       showModal('success', 'OTP Sent', 'OTP sent successfully to your mobile');
//     } catch (err) {
//       showModal('error', 'OTP Error', 'Failed to send OTP. Please try again.');
//     } finally {
//       setSendingOtp(false);
//     }
//   };

//   const resendMobileOtp = async () => {
//     if (mobileOtpTimer > 0) return;

//     setSendingOtp(true);
//     try {
//       await insertOtp({ mobile: formData.mobile });
//       setMobileOtpTimer(60);
//       showModal('success', 'OTP Sent', 'OTP resent successfully to your mobile');
//     } catch (err) {
//       showModal('error', 'OTP Error', 'Failed to resend OTP. Please try again.');
//     } finally {
//       setSendingOtp(false);
//     }
//   };

//   const verifyMobileOtp = async () => {
//     setVerifyingOtp(true);
//     try {
//       const res: any = await verifyOtp({
//         mobile: formData.mobile,
//         otp: mobileOtp,
//       });

//       if (res?.verified) {
//         setMobileVerified(true);
//         showModal('success', 'Verified', 'Mobile number verified successfully');
//       } else {
//         showModal('error', 'Verification Failed', 'Invalid or expired OTP. Please try again.');
//       }
//     } catch (err) {
//       showModal('error', 'Verification Failed', 'Invalid or expired OTP. Please try again.');
//     } finally {
//       setVerifyingOtp(false);
//     }
//   };

//   const fetchMemberDetails = async () => {
//     if (!formData.kkc_id) {
//       setErrors(prev => ({
//         ...prev,
//         kkc_id: 'Please enter KKC ID',
//       }));
//       return;
//     }

//     setVerifyingMembership(true);
//     try {
//       const data: any = await getMemberByKKC(formData.kkc_id);

//       if (data) {
//         setMemberMobile(data.mobile);

//         await insertOtp({ mobile: data.mobile });

//         setMemberOtpSent(true);
//         showModal('success', 'OTP Sent', `OTP sent to registered mobile ${data.mobile}`);
//       } else {
//         setErrors(prev => ({
//           ...prev,
//           kkc_id: 'Invalid KKC ID or inactive membership',
//         }));
//       }
//     } catch (err) {
//       setErrors(prev => ({
//         ...prev,
//         kkc_id: 'Invalid KKC ID or inactive membership',
//       }));
//     } finally {
//       setVerifyingMembership(false);
//     }
//   };

//   const verifyMemberOtp = async () => {
//     setVerifyingMemberOtp(true);
//     try {
//       const res: any = await verifyOtp({
//         mobile: memberMobile,
//         otp: memberOtp,
//       });

//       if (res?.verified) {
//         setMemberVerified(true);
//         showModal('success', 'Verified', 'Membership verified successfully');
//       } else {
//         showModal('error', 'Verification Failed', 'Invalid or expired OTP. Please try again.');
//       }
//     } catch (err) {
//       showModal('error', 'Verification Failed', 'Invalid or expired OTP. Please try again.');
//     } finally {
//       setVerifyingMemberOtp(false);
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.full_name) newErrors.full_name = 'Name is required';
//     if (!formData.parent_name) newErrors.parent_name = 'Parent name is required';
//     if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     // TODO TO REMOVE if (!mobileVerified) newErrors.mobile = 'Please verify your mobile number';
//     if (!formData.whatsapp_number) newErrors.whatsapp_number = 'WhatsApp number is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.full_address) newErrors.full_address = 'Address is required';
//     if (!formData.city) newErrors.city = 'City is required';
//     if (!formData.state) newErrors.state = 'State is required';
//     if (!formData.pincode) newErrors.pincode = 'Pincode is required';
//     if (!formData.audition_date) newErrors.audition_date = 'Audition date is required';
//     if (!videoFile) newErrors.video = 'Video is required';
//     if (!profilePhoto) newErrors.profile_photo = 'Profile photo is required';

//     if (formData.is_member && !memberVerified) {
//       newErrors.kkc_id = 'Please verify your KKC membership';
//     }

//     if (formData.wantsContribution && !formData.contribution_amount) {
//       newErrors.contribution_amount = 'Please enter contribution amount';
//     }

//     if (!acceptedTerms) {
//       newErrors.terms = 'You must accept the terms and conditions';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       showModal('error', 'Validation Error', 'Please fill all required fields correctly');
//       return;
//     }

//     setLoading(true);

//     try {

//       const isLifetimeMemberWithoutContribution =
//         formData.is_member && memberVerified && !formData.wantsContribution;

//       const paymentAmount = isLifetimeMemberWithoutContribution
//         ? 0
//         : (formData.wantsContribution
//             ? parseFloat(formData.contribution_amount)
//             : 499);

//       const formDataToSend = new FormData();

//       formDataToSend.append("full_name", formData.full_name);
//       formDataToSend.append("parent_name", formData.parent_name);
//       formDataToSend.append("date_of_birth", formData.date_of_birth);
//       formDataToSend.append("gender", formData.gender);
//       formDataToSend.append("mobile", formData.mobile);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("full_address", formData.full_address);
//       formDataToSend.append("city", formData.city);
//       formDataToSend.append("state", formData.state);
//       formDataToSend.append("pincode", formData.pincode);
//       formDataToSend.append("category", "Senior");
//       formDataToSend.append("audition_date", formData.audition_date);

//       formDataToSend.append("youtube_link_1", formData.youtube_link_1);
//       formDataToSend.append("youtube_link_2", formData.youtube_link_2);

//       formDataToSend.append("is_member", formData.is_member ? "1" : "0");
//       formDataToSend.append("kkc_id", formData.kkc_id);

//       formDataToSend.append("payment_amount", paymentAmount.toString());
//       formDataToSend.append("payment_status", "pending");

//       if (videoFile) {
//         formDataToSend.append("video", videoFile);
//       }

//       if (profilePhoto) {
//         formDataToSend.append("profile_photo", profilePhoto);
//       }

//       if (paymentAmount > 0) {

//         setRegistrationData({
//           ...formData,
//           payment_amount: paymentAmount,
//           videoFile,
//           profilePhoto
//         });

//         setLoading(false);
//         setCurrentPage("payment");
//         return;
//       }

//       const response = await fetch("/api/register.php", {
//         method: "POST",
//         body: formDataToSend
//       });

//       const result = await response.json();

//       if (!result.success) {
//         throw new Error(result.message || "Registration failed");
//       }

//       await adjustSlot(formData.audition_date);

//       setLoading(false);
//       showModal(
//         'success',
//         'Registration Successful!',
//         'Your Audition Registration is successful and soon you will get an update via WhatsApp or call.'
//       );

//     } catch (error: any) {

//       console.error(error);

//       setLoading(false);
//       showModal(
//         'error',
//         'Registration Failed',
//         error.message || 'Registration failed. Please check your internet connection and try again.'
//       );

//     }
//   };

//   const getButtonText = () => {
//     if (formData.is_member && memberVerified) {
//       if (formData.wantsContribution && formData.contribution_amount) {
//         return 'Proceed to Payment';
//       }
//       return 'Register';
//     }
//     return 'Proceed to Payment';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
//       <Modal
//         isOpen={modalState.isOpen}
//         onClose={closeModal}
//         type={modalState.type}
//         title={modalState.title}
//         message={modalState.message}
//         onConfirm={modalState.type === 'error' ? handleRetry : undefined}
//         confirmText={modalState.type === 'error' ? 'OK' : 'OK'}
//       />

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
//             Audition <span className="text-amber-500">Registration</span>
//           </h1>
//           <p className="text-xl text-gray-400">Fill in your details to register for auditions</p>
//         </div>

//         <Card>
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Personal Information Section */}
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
//                 Personal Information
//               </h2>
//               <div className="space-y-6">
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <Input
//                     label="Full Name"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleInputChange}
//                     required
//                     error={errors.full_name}
//                     placeholder="Enter your full name"
//                   />
//                   <Input
//                     label="Father/Mother Name"
//                     name="parent_name"
//                     value={formData.parent_name}
//                     onChange={handleInputChange}
//                     required
//                     error={errors.parent_name}
//                     placeholder="Enter parent's name"
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <Input
//                     label="Date of Birth"
//                     name="date_of_birth"
//                     type="date"
//                     value={formData.date_of_birth}
//                     onChange={handleInputChange}
//                     required
//                     error={errors.date_of_birth}
//                   />
//                   <Select
//                     label="Gender"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     options={[
//                       { value: 'Male', label: 'Male' },
//                       { value: 'Female', label: 'Female' },
//                       { value: 'Other', label: 'Other' }
//                     ]}
//                     required
//                     error={errors.gender}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Upload Profile Photo <span className="text-red-500">*</span>
//                   </label>
//                   <p className="text-sm text-gray-400 mb-3">Max 5MB, JPG/PNG format</p>
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleProfilePhotoChange}
//                       className="hidden"
//                       id="profile-photo-upload"
//                     />
//                     <label
//                       htmlFor="profile-photo-upload"
//                       className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
//                     >
//                       {profilePhoto ? (
//                         <>
//                           <CheckCircle2 size={24} className="text-green-500" />
//                           <span className="text-white">{profilePhoto.name}</span>
//                         </>
//                       ) : (
//                         <>
//                           <Upload size={24} className="text-gray-400" />
//                           <span className="text-gray-400">Click to upload profile photo</span>
//                         </>
//                       )}
//                     </label>
//                   </div>
//                   {profilePhotoError && (
//                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle size={16} />
//                       {profilePhotoError}
//                     </p>
//                   )}
//                   {errors.profile_photo && <p className="mt-1 text-sm text-red-500">{errors.profile_photo}</p>}
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information Section */}
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
//                 Contact Information
//               </h2>
//               <div className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <Input
//                       label="Primary Mobile Number"
//                       name="mobile"
//                       type="tel"
//                       value={formData.mobile}
//                       onChange={handleInputChange}
//                       maxLength={10}
//                       required
//                       error={errors.mobile}
//                       disabled={mobileVerified}
//                       placeholder="10-digit mobile number"
//                     />
//                     <div className="flex items-end gap-2">
//                       {!mobileVerified && !mobileOtpSent && (
//                         <Button type="button" onClick={sendMobileOtp} variant="secondary" className="w-full" isLoading={sendingOtp}>
//                           Send OTP
//                         </Button>
//                       )}
//                       {!mobileVerified && mobileOtpSent && mobileOtpTimer > 0 && (
//                         <div className="flex items-center justify-center w-full text-sm text-gray-400">
//                           Resend OTP in {mobileOtpTimer}s
//                         </div>
//                       )}
//                       {!mobileVerified && mobileOtpSent && mobileOtpTimer === 0 && (
//                         <Button type="button" onClick={resendMobileOtp} variant="secondary" className="w-full" isLoading={sendingOtp}>
//                           Resend OTP
//                         </Button>
//                       )}
//                       {mobileVerified && (
//                         <div className="flex items-center gap-2 text-green-500 w-full justify-center bg-green-500/10 rounded-lg py-3">
//                           <CheckCircle2 size={20} />
//                           <span className="font-medium">Verified</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {mobileOtpSent && !mobileVerified && (
//                     <div className="grid md:grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg">
//                       <Input
//                         label="Enter OTP"
//                         value={mobileOtp}
//                         onChange={(e) => setMobileOtp(e.target.value)}
//                         maxLength={6}
//                         placeholder="6-digit OTP"
//                       />
//                       <div className="flex items-end">
//                         <Button type="button" onClick={verifyMobileOtp} variant="secondary" className="w-full" isLoading={verifyingOtp}>
//                           Verify OTP
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-3">
//                   <Input
//                     label="WhatsApp Number"
//                     name="whatsapp_number"
//                     type="tel"
//                     value={formData.whatsapp_number}
//                     onChange={handleInputChange}
//                     maxLength={10}
//                     required
//                     error={errors.whatsapp_number}
//                     disabled={formData.sameAsPrimary}
//                     placeholder="10-digit WhatsApp number"
//                   />
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       name="sameAsPrimary"
//                       checked={formData.sameAsPrimary}
//                       onChange={handleInputChange}
//                       className="w-4 h-4"
//                     />
//                     <span className="text-sm text-gray-300">Same as Primary Mobile Number</span>
//                   </label>
//                 </div>

//                 <Input
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   error={errors.email}
//                   placeholder="your.email@example.com"
//                 />
//               </div>
//             </div>

//             {/* Address Section */}
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
//                 Address Details
//               </h2>
//               <div className="space-y-6">
//                 <Textarea
//                   label="Full Address"
//                   name="full_address"
//                   value={formData.full_address}
//                   onChange={handleInputChange}
//                   rows={3}
//                   required
//                   error={errors.full_address}
//                   placeholder="Enter your complete address"
//                 />

//                 <div className="grid md:grid-cols-3 gap-6">
//                   <Input
//                     label="City"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     required
//                     error={errors.city}
//                     placeholder="City"
//                   />
//                   <Input
//                     label="State"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     required
//                     error={errors.state}
//                     placeholder="State"
//                   />
//                   <Input
//                     label="Pincode"
//                     name="pincode"
//                     type="text"
//                     value={formData.pincode}
//                     onChange={handleInputChange}
//                     maxLength={6}
//                     required
//                     error={errors.pincode}
//                     placeholder="6-digit pincode"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Audition Details Section */}
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
//                 Audition Details
//               </h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-3">
//                     Select Audition Date <span className="text-red-500">*</span>
//                   </label>
//                   <div className="grid md:grid-cols-3 gap-4">
//                     <label className={`relative flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                       formData.audition_date === '2026-05-23'
//                         ? 'border-amber-500 bg-amber-500/10'
//                         : 'border-gray-700 hover:border-amber-500/50'
//                     }`}>
//                       <div>
//                         <p className="text-white font-semibold">08 May 2026</p>
//                         <p className="text-sm text-gray-400">Friday</p>
//                       </div>
//                       <input
//                         type="radio"
//                         name="audition_date"
//                         value="2026-05-08"
//                         checked={formData.audition_date === '2026-05-08'}
//                         onChange={handleInputChange}
//                         className="w-5 h-5"
//                       />
//                     </label>

//                     <label className={`relative flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                       formData.audition_date === '2026-05-09'
//                         ? 'border-amber-500 bg-amber-500/10'
//                         : 'border-gray-700 hover:border-amber-500/50'
//                     }`}>
//                       <div>
//                         <p className="text-white font-semibold">09 May 2026</p>
//                         <p className="text-sm text-gray-400">Saturday</p>
//                       </div>
//                       <input
//                         type="radio"
//                         name="audition_date"
//                         value="2026-05-09"
//                         checked={formData.audition_date === '2026-05-09'}
//                         onChange={handleInputChange}
//                         className="w-5 h-5"
//                       />
//                     </label>

//                     <label className={`relative flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                       formData.audition_date === '2026-05-10'
//                         ? 'border-amber-500 bg-amber-500/10'
//                         : 'border-gray-700 hover:border-amber-500/50'
//                     }`}>
//                       <div>
//                         <p className="text-white font-semibold">10 May 2026</p>
//                         <p className="text-sm text-gray-400">Sunday</p>
//                       </div>
//                       <input
//                         type="radio"
//                         name="audition_date"
//                         value="2026-05-10"
//                         checked={formData.audition_date === '2026-05-10'}
//                         onChange={handleInputChange}
//                         className="w-5 h-5"
//                       />
//                     </label>
//                   </div>
//                   {errors.audition_date && <p className="mt-2 text-sm text-red-500">{errors.audition_date}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">
//                     Upload Audition Video <span className="text-red-500">*</span>
//                   </label>
//                   <p className="text-sm text-gray-400 mb-3">Max 1 minutes, 30MB, MP4 format</p>
//                   <div className="relative">
//                     <input
//                       type="file"
//                       accept="video/mp4"
//                       onChange={handleVideoChange}
//                       className="hidden"
//                       id="video-upload"
//                     />
//                     <label
//                       htmlFor="video-upload"
//                       className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
//                     >
//                       {videoFile ? (
//                         <>
//                           <CheckCircle2 size={24} className="text-green-500" />
//                           <span className="text-white">{videoFile.name}</span>
//                         </>
//                       ) : (
//                         <>
//                           <Video size={24} className="text-gray-400" />
//                           <span className="text-gray-400">Click to upload video</span>
//                         </>
//                       )}
//                     </label>
//                   </div>
//                   {videoError && (
//                     <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
//                       <AlertCircle size={16} />
//                       {videoError}
//                     </p>
//                   )}
//                   {errors.video && <p className="mt-1 text-sm text-red-500">{errors.video}</p>}
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <Input
//                     label="YouTube Link 1 (Optional)"
//                     name="youtube_link_1"
//                     type="url"
//                     value={formData.youtube_link_1}
//                     onChange={handleInputChange}
//                     placeholder="https://youtube.com/..."
//                   />
//                   <Input
//                     label="YouTube Link 2 (Optional)"
//                     name="youtube_link_2"
//                     type="url"
//                     value={formData.youtube_link_2}
//                     onChange={handleInputChange}
//                     placeholder="https://youtube.com/..."
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* KKC Membership Section */}
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
//                 KKC Membership
//               </h2>
//               <div className="space-y-6">
//                 <label className="flex items-center gap-3 cursor-pointer bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
//                   <input
//                     type="checkbox"
//                     name="is_member"
//                     checked={formData.is_member}
//                     onChange={handleInputChange}
//                     className="w-5 h-5"
//                   />
//                   <span className="text-white font-medium">I am a Lifetime KKC member</span>
//                 </label>

//                 {formData.is_member && (
//                   <div className="bg-gray-800/50 p-6 rounded-lg space-y-6">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <Input
//                         label="KKC ID"
//                         name="kkc_id"
//                         value={formData.kkc_id}
//                         onChange={handleInputChange}
//                         error={errors.kkc_id}
//                         disabled={memberVerified}
//                         placeholder="Enter your KKC ID"
//                       />
//                       <div className="flex items-end gap-2">
//                         {!memberVerified && !memberOtpSent && (
//                           <Button type="button" onClick={fetchMemberDetails} variant="secondary" className="w-full" isLoading={verifyingMembership}>
//                             Verify Membership
//                           </Button>
//                         )}
//                         {memberVerified && (
//                           <div className="flex items-center gap-2 text-green-500 w-full justify-center bg-green-500/10 rounded-lg py-3">
//                             <CheckCircle2 size={20} />
//                             <span className="font-medium">Verified</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {memberOtpSent && !memberVerified && (
//                       <div className="grid md:grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg">
//                         <Input
//                           label="Enter OTP"
//                           value={memberOtp}
//                           onChange={(e) => setMemberOtp(e.target.value)}
//                           maxLength={6}
//                           placeholder="6-digit OTP"
//                         />
//                         <div className="flex items-end">
//                           <Button type="button" onClick={verifyMemberOtp} variant="secondary" className="w-full" isLoading={verifyingMemberOtp}>
//                             Verify OTP
//                           </Button>
//                         </div>
//                       </div>
//                     )}

//                     {memberVerified && (
//                       <div className="border-t border-gray-700 pt-6 space-y-4">
//                         <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
//                           <p className="text-green-500 font-medium mb-2">Lifetime Member Benefits</p>
//                           <p className="text-sm text-gray-300">
//                             Your registration fee is waived. You may support the contest by contributing if you wish.
//                           </p>
//                         </div>

//                         <label className="flex items-center gap-3 cursor-pointer bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900/70 transition-colors">
//                           <input
//                             type="checkbox"
//                             name="wantsContribution"
//                             checked={formData.wantsContribution}
//                             onChange={handleInputChange}
//                             className="w-5 h-5"
//                           />
//                           <span className="text-white">I would like to contribute (optional)</span>
//                         </label>

//                         {formData.wantsContribution && (
//                           <div className="bg-gray-900/50 p-4 rounded-lg">
//                             <Input
//                               label="Contribution Amount"
//                               name="contribution_amount"
//                               type="number"
//                               value={formData.contribution_amount}
//                               onChange={handleInputChange}
//                               placeholder="Enter amount in ₹"
//                               error={errors.contribution_amount}
//                             />
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Terms & Conditions */}
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
//                 Terms & Conditions
//               </h2>
//               <div className="bg-gray-800/50 p-6 rounded-lg space-y-4 max-h-96 overflow-y-auto mb-6">
//                 <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
//                   <p>• The competition is only for singing. Participants can perform only in the singing category.</p>
//                   <p>• The competition is open to all age groups.</p>
//                   <p>• Participants under the age of 18 must have permission from a parent or guardian to participate in the competition.</p>
//                   <p>• <strong className="text-white">The audition registration fee is ₹499 for advertisement. If you qualify for the Quarter Finale, you will need to pay an additional ₹999 for next advertisement registration.</strong></p>
//                   <p>• The entry fee is taken as an advertisement or promotional fee. It is not a refundable registration fee.</p>
//                   <p>• Participants are responsible for copyright of the songs they perform. Any copyright issues related to the song will be the responsibility of the participant.</p>
//                   <p>• The decision of the organizers and judges will be final and binding.</p>
//                   <p>• Participants must bear their own travel, accommodation, and personal expenses.</p>
//                   <p>• If any dispute arises, the legal jurisdiction will be Indore, Madhya Pradesh.</p>
//                   <p>• During the live performance, the organizers will not be responsible for any technical problems or physical issues faced by the participant.</p>
//                   <p>• This program is not associated with any television show, OTT platform, national brand, or government organization.</p>
//                   <p>• Selection of participants will be based entirely on the decision of the judging panel.</p>
//                   <p>• The organizers will not be responsible for any personal loss, technical issue, copyright dispute, or external fraud.</p>
//                   <p>• The amount paid is considered an advertisement or promotional fee and will not be refunded under any circumstances.</p>
//                   <p>• The organizers reserve the right to change the event date, time, or rules if necessary.</p>
//                   <p>• All disputes related to the event will be handled under the jurisdiction of Indore (Madhya Pradesh) only.</p>
//                 </div>
//               </div>

//               <label className="flex items-start gap-3 cursor-pointer bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
//                 <input
//                   type="checkbox"
//                   checked={acceptedTerms}
//                   onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   className="w-5 h-5 mt-0.5"
//                 />
//                 <span className="text-white">
//                   I have read and agree to all the terms and conditions mentioned above <span className="text-red-500">*</span>
//                 </span>
//               </label>
//               {errors.terms && <p className="mt-2 text-sm text-red-500">{errors.terms}</p>}
//             </div>

//             {/* Payment Summary and Submit */}
//             <div className="border-t border-gray-700 pt-6">
//               <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-2 border-amber-500/30 p-6 rounded-lg mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-white font-semibold text-lg">Audition Registration Fee:</span>
//                   <span className="text-3xl font-bold text-amber-500">
//                     ₹{formData.is_member && memberVerified ? '0' : '499'}
//                   </span>
//                 </div>
//                 {formData.is_member && memberVerified && (
//                   <p className="text-sm text-green-500 mt-2 flex items-center gap-2">
//                     <CheckCircle2 size={16} />
//                     Lifetime member – registration is free
//                   </p>
//                 )}
//                 {!formData.is_member || !memberVerified ? (
//                   <p className="text-sm text-amber-400 mt-3 bg-amber-500/10 p-3 rounded-lg">
//                     <strong>Note:</strong> Quarter Finale qualified participants will need to pay an additional ₹999
//                   </p>
//                 ) : null}
//                 {formData.wantsContribution && formData.contribution_amount && (
//                   <div className="mt-4 pt-4 border-t border-amber-500/30">
//                     <div className="flex justify-between items-center">
//                       <span className="text-white">Contribution Amount:</span>
//                       <span className="text-2xl font-bold text-amber-500">₹{formData.contribution_amount}</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <Button type="submit" size="lg" className="w-full" isLoading={loading}>
//                 {getButtonText()}
//               </Button>
//             </div>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { FormEvent, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  checkMobile,
  insertOtp,
  verifyOtp,
  getMemberByKKC,
  getSlots,
  adjustSlot,
} from '../lib/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Modal } from '../components/ui/Modal';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';

interface FormData {
  full_name: string;
  parent_name: string;
  date_of_birth: string;
  gender: string;
  mobile: string;
  whatsapp_number: string;
  sameAsPrimary: boolean;
  email: string;
  full_address: string;
  city: string;
  state: string;
  pincode: string;
  audition_date: string;
  time_slot: string;
  youtube_link_1: string;
  youtube_link_2: string;
  is_member: boolean;
  kkc_id: string;
  contribution_amount: string;
  wantsContribution: boolean;
}

export function RegistrationPage() {
  const { setCurrentPage, setRegistrationData } = useApp();
  const { toast, showToast, hideToast } = useToast();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
  });

  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    parent_name: '',
    date_of_birth: '',
    gender: '',
    mobile: '',
    whatsapp_number: '',
    sameAsPrimary: false,
    email: '',
    full_address: '',
    city: '',
    state: '',
    pincode: '',
    audition_date: '',
    time_slot: '',
    youtube_link_1: '',
    youtube_link_2: '',
    is_member: false,
    kkc_id: '',
    contribution_amount: '',
    wantsContribution: false,
  });

  const [slots, setSlots] = useState<Array<{
    audition_date: string;
    time_slot: string;
    total_slots: number;
    booked_slots: number;
  }>>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotFetchError, setSlotFetchError] = useState('');

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoError, setProfilePhotoError] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileOtpTimer, setMobileOtpTimer] = useState(0);

  const [memberOtp, setMemberOtp] = useState('');
  const [memberOtpSent, setMemberOtpSent] = useState(false);
  const [memberVerified, setMemberVerified] = useState(false);
  const [memberMobile, setMemberMobile] = useState('');

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [verifyingMembership, setVerifyingMembership] = useState(false);
  const [verifyingMemberOtp, setVerifyingMemberOtp] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const showModal = (type: 'success' | 'error', title: string, message: string) => {
    setModalState({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (modalState.type === 'success') {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setCurrentPage('home');
      }, 300);
    }
  };

  const handleRetry = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      if (name === 'sameAsPrimary' && checked) {
        updated.whatsapp_number = updated.mobile;
      } else if (name === 'mobile' && updated.sameAsPrimary) {
        updated.whatsapp_number = value;
      }

      return updated;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePhotoError('');

    if (!file.type.startsWith('image/')) {
      setProfilePhotoError('Only image files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfilePhotoError('Profile photo size must be less than 5MB');
      return;
    }

    setProfilePhoto(file);
  };

  const fetchSlots = async () => {
    setSlotsLoading(true);
    setSlotFetchError('');

    try {
      const data: any = await getSlots();
      const slotRows = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setSlots(slotRows);
    } catch (err) {
      console.error('getSlots error:', err);
      setSlotFetchError('Failed to load audition slots. Please refresh the page.');
    } finally {
      setSlotsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const getSlotInfo = (audition_date: string, time_slot: string) =>
    slots.find(
      slot => slot.audition_date === audition_date && slot.time_slot === time_slot
    );

  const getAvailableSeats = (audition_date: string, time_slot: string) => {
    const slot = getSlotInfo(audition_date, time_slot);
    return slot ? Math.max(0, slot.total_slots - slot.booked_slots) : 0;
  };

  const isSlotFull = (audition_date: string, time_slot: string) =>
    getAvailableSeats(audition_date, time_slot) <= 0;

  const handleSlotSelect = (audition_date: string, time_slot: string) => {
    if (isSlotFull(audition_date, time_slot)) return;

    setFormData(prev => ({
      ...prev,
      time_slot,
    }));

    if (errors.time_slot) {
      setErrors(prev => ({ ...prev, time_slot: '' }));
    }
  };

  useEffect(() => {
    let interval: number;
    if (mobileOtpTimer > 0) {
      interval = window.setInterval(() => {
        setMobileOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mobileOtpTimer]);

  const sendMobileOtp = async () => {
    if (!formData.mobile || formData.mobile.length !== 10) {
      setErrors(prev => ({
        ...prev,
        mobile: 'Please enter a valid 10-digit mobile number',
      }));
      return;
    }

    setSendingOtp(true);
    try {
      const existing = await checkMobile(formData.mobile);
      if (existing && existing.length > 0) {
        setErrors(prev => ({
          ...prev,
          mobile: 'This mobile number is already registered',
        }));
        return;
      }

      await insertOtp({ mobile: formData.mobile });

      setMobileOtpSent(true);
      setMobileOtpTimer(60);
      showToast('OTP sent successfully to your mobile', 'success');
    } catch (err) {
      showToast('Failed to send OTP. Please try again.', 'error');
    } finally {
      setSendingOtp(false);
    }
  };

  const resendMobileOtp = async () => {
    if (mobileOtpTimer > 0) return;

    setSendingOtp(true);
    try {
      await insertOtp({ mobile: formData.mobile });
      setMobileOtpTimer(60);
      showToast('OTP resent successfully to your mobile', 'success');
    } catch (err) {
      showToast('Failed to resend OTP. Please try again.', 'error');
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyMobileOtp = async () => {
    setVerifyingOtp(true);
    try {
      const res: any = await verifyOtp({
        mobile: formData.mobile,
        otp: mobileOtp,
      });

      if (res?.verified) {
        setMobileVerified(true);
        showToast('Mobile number verified successfully', 'success');
      } else {
        showToast('Invalid or expired OTP. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Invalid or expired OTP. Please try again.', 'error');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const fetchMemberDetails = async () => {
    if (!formData.kkc_id) {
      setErrors(prev => ({
        ...prev,
        kkc_id: 'Please enter KKC ID',
      }));
      return;
    }

    setVerifyingMembership(true);
    try {
      const data: any = await getMemberByKKC(formData.kkc_id);

      if (data) {
        setMemberMobile(data.mobile);

        await insertOtp({ mobile: data.mobile });

        setMemberOtpSent(true);
        showToast(`OTP sent to registered mobile ${data.mobile}`, 'success');
      } else {
        setErrors(prev => ({
          ...prev,
          kkc_id: 'Invalid KKC ID or inactive membership',
        }));
      }
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        kkc_id: 'Invalid KKC ID or inactive membership',
      }));
    } finally {
      setVerifyingMembership(false);
    }
  };

  const verifyMemberOtp = async () => {
    setVerifyingMemberOtp(true);
    try {
      const res: any = await verifyOtp({
        mobile: memberMobile,
        otp: memberOtp,
      });

      if (res?.verified) {
        setMemberVerified(true);
        showToast('Membership verified successfully', 'success');
      } else {
        showToast('Invalid or expired OTP. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Invalid or expired OTP. Please try again.', 'error');
    } finally {
      setVerifyingMemberOtp(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.full_name) newErrors.full_name = 'Name is required';
    if (!formData.parent_name) newErrors.parent_name = 'Parent name is required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!mobileVerified) newErrors.mobile = 'Please verify your mobile number';
    if (!formData.whatsapp_number) newErrors.whatsapp_number = 'WhatsApp number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.full_address) newErrors.full_address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.audition_date) newErrors.audition_date = 'Audition date is required';
    if (!formData.time_slot) {
      newErrors.time_slot = 'Please select an audition slot';
    } else if (isSlotFull(formData.audition_date, formData.time_slot)) {
      newErrors.time_slot = 'Selected slot is no longer available';
    }
    if (!profilePhoto) newErrors.profile_photo = 'Profile photo is required';

    if (formData.is_member && !memberVerified) {
      newErrors.kkc_id = 'Please verify your KKC membership';
    }

    if (formData.wantsContribution && !formData.contribution_amount) {
      newErrors.contribution_amount = 'Please enter contribution amount';
    }

    if (!acceptedTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showModal('error', 'Validation Error', 'Please fill all required fields correctly');
      return;
    }

    setLoading(true);

    try {

      const isLifetimeMemberWithoutContribution =
        formData.is_member && memberVerified && !formData.wantsContribution;

      const paymentAmount = isLifetimeMemberWithoutContribution
        ? 0
        : (formData.wantsContribution
            ? parseFloat(formData.contribution_amount)
            : 499);

      const formDataToSend = new FormData();

      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("parent_name", formData.parent_name);
      formDataToSend.append("date_of_birth", formData.date_of_birth);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("whatsapp_number", formData.whatsapp_number);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("full_address", formData.full_address);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("state", formData.state);
      formDataToSend.append("pincode", formData.pincode);
      formDataToSend.append("category", "Senior");
      formDataToSend.append("audition_date", formData.audition_date);
      formDataToSend.append("time_slot", formData.time_slot);

      formDataToSend.append("youtube_link_1", formData.youtube_link_1);
      formDataToSend.append("youtube_link_2", formData.youtube_link_2);

      formDataToSend.append("is_member", formData.is_member ? "1" : "0");
      formDataToSend.append("kkc_id", formData.kkc_id);

      formDataToSend.append("payment_amount", paymentAmount.toString());
      formDataToSend.append("payment_status", "pending");

      if (profilePhoto) {
        formDataToSend.append("profile_photo", profilePhoto);
      }

      if (paymentAmount > 0) {

        setRegistrationData({
          ...formData,
          category: "Senior",
          payment_amount: paymentAmount,
          time_slot: formData.time_slot,
          profilePhoto
        });

        setLoading(false);
        setCurrentPage("payment");
        return;
      }

      const response = await fetch("/api/register.php", {
        method: "POST",
        body: formDataToSend
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Registration failed");
      }

      await adjustSlot(formData.audition_date, formData.time_slot, 1);

      setLoading(false);
      showModal(
        'success',
        'Registration Successful!',
        'Your Audition Registration is successful and soon you will get an update via WhatsApp or call.'
      );

    } catch (error: any) {

      console.error(error);

      setLoading(false);
      showModal(
        'error',
        'Registration Failed',
        error.message || 'Registration failed. Please check your internet connection and try again.'
      );

    }
  };

  const getButtonText = () => {
    if (formData.is_member && memberVerified) {
      if (formData.wantsContribution && formData.contribution_amount) {
        return 'Proceed to Payment';
      }
      return 'Register';
    }
    return 'Proceed to Payment';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
      {toast.isOpen && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.type === 'error' ? handleRetry : undefined}
        confirmText={modalState.type === 'error' ? 'OK' : 'OK'}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Audition <span className="text-amber-500">Registration</span>
          </h1>
          <p className="text-xl text-gray-400">Fill in your details to register for auditions</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                Personal Information
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                    error={errors.full_name}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Father/Mother Name"
                    name="parent_name"
                    value={formData.parent_name}
                    onChange={handleInputChange}
                    required
                    error={errors.parent_name}
                    placeholder="Enter parent's name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Date of Birth"
                    name="date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    required
                    error={errors.date_of_birth}
                  />
                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' },
                      { value: 'Other', label: 'Other' }
                    ]}
                    required
                    error={errors.gender}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Profile Photo <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-400 mb-3">Max 5MB, JPG/PNG format</p>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                      id="profile-photo-upload"
                    />
                    <label
                      htmlFor="profile-photo-upload"
                      className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
                    >
                      {profilePhoto ? (
                        <>
                          <CheckCircle2 size={24} className="text-green-500" />
                          <span className="text-white">{profilePhoto.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-400" />
                          <span className="text-gray-400">Click to upload profile photo</span>
                        </>
                      )}
                    </label>
                  </div>
                  {profilePhotoError && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {profilePhotoError}
                    </p>
                  )}
                  {errors.profile_photo && <p className="mt-1 text-sm text-red-500">{errors.profile_photo}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Primary Mobile Number"
                      name="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      maxLength={10}
                      required
                      error={errors.mobile}
                      disabled={mobileVerified}
                      placeholder="10-digit mobile number"
                    />
                    <div className="flex items-end gap-2">
                      {!mobileVerified && !mobileOtpSent && (
                        <Button type="button" onClick={sendMobileOtp} variant="secondary" className="w-full" isLoading={sendingOtp}>
                          Send OTP
                        </Button>
                      )}
                      {!mobileVerified && mobileOtpSent && mobileOtpTimer > 0 && (
                        <div className="flex items-center justify-center w-full text-sm text-gray-400">
                          Resend OTP in {mobileOtpTimer}s
                        </div>
                      )}
                      {!mobileVerified && mobileOtpSent && mobileOtpTimer === 0 && (
                        <Button type="button" onClick={resendMobileOtp} variant="secondary" className="w-full" isLoading={sendingOtp}>
                          Resend OTP
                        </Button>
                      )}
                      {mobileVerified && (
                        <div className="flex items-center gap-2 text-green-500 w-full justify-center bg-green-500/10 rounded-lg py-3">
                          <CheckCircle2 size={20} />
                          <span className="font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {mobileOtpSent && !mobileVerified && (
                    <div className="grid md:grid-cols-2 gap-4 bg-gray-800/50 p-4 rounded-lg">
                      <Input
                        label="Enter OTP"
                        value={mobileOtp}
                        onChange={(e) => setMobileOtp(e.target.value)}
                        maxLength={6}
                        placeholder="6-digit OTP"
                      />
                      <div className="flex items-end">
                        <Button type="button" onClick={verifyMobileOtp} variant="secondary" className="w-full" isLoading={verifyingOtp}>
                          Verify OTP
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Input
                    label="WhatsApp Number"
                    name="whatsapp_number"
                    type="tel"
                    value={formData.whatsapp_number}
                    onChange={handleInputChange}
                    maxLength={10}
                    required
                    error={errors.whatsapp_number}
                    disabled={formData.sameAsPrimary}
                    placeholder="10-digit WhatsApp number"
                  />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sameAsPrimary"
                      checked={formData.sameAsPrimary}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-300">Same as Primary Mobile Number</span>
                  </label>
                </div>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  error={errors.email}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                Address Details
              </h2>
              <div className="space-y-6">
                <Textarea
                  label="Full Address"
                  name="full_address"
                  value={formData.full_address}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  error={errors.full_address}
                  placeholder="Enter your complete address"
                />

                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    error={errors.city}
                    placeholder="City"
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    error={errors.state}
                    placeholder="State"
                  />
                  <Input
                    label="Pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength={6}
                    required
                    error={errors.pincode}
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>

            {/* Audition Details Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                Audition Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select Audition Date <span className="text-red-500">*</span>
                  </label>
                  {slotFetchError && (
                    <p className="text-sm text-red-500 mb-3">{slotFetchError}</p>
                  )}

                  {slotsLoading ? (
                    <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 text-gray-300">
                      Loading available audition slots...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Date Selection */}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Choose your preferred date:</p>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            { date: '2026-05-08', label: '08 May 2026', day: 'Friday' },
                            { date: '2026-05-09', label: '09 May 2026', day: 'Saturday' },
                            { date: '2026-05-10', label: '10 May 2026', day: 'Sunday' },
                          ].map(dateOption => {
                            const hasAvailableSlots = ['10AM-2PM', '3PM-7PM'].some(slot => 
                              getAvailableSeats(dateOption.date, slot) > 0
                            );
                            const selected = formData.audition_date === dateOption.date;

                            return (
                              <button
                                key={dateOption.date}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, audition_date: dateOption.date, time_slot: '' }))}
                                disabled={!hasAvailableSlots}
                                className={`p-3 rounded-lg border-2 text-center transition-all ${
                                  selected
                                    ? 'border-amber-500 bg-amber-500/10 text-amber-200'
                                    : !hasAvailableSlots
                                    ? 'border-red-500 bg-red-500/10 text-red-300 cursor-not-allowed opacity-60'
                                    : 'border-gray-700 hover:border-amber-500/50 bg-gray-900/70 text-gray-300 hover:text-white'
                                }`}
                              >
                                <div className="text-sm font-medium">{dateOption.label}</div>
                                <div className="text-xs text-gray-400">{dateOption.day}</div>
                                {!hasAvailableSlots && (
                                  <div className="text-xs text-red-400 mt-1">No slots available</div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slot Selection - Only show when date is selected */}
                      {formData.audition_date && (
                        <div className="space-y-3 pt-4 border-t border-gray-700">
                          <p className="text-sm text-gray-400">Choose your preferred time slot:</p>
                          <div className="space-y-2">
                            {['10AM-2PM', '3PM-7PM'].map(timeSlot => {
                              const available = getAvailableSeats(formData.audition_date, timeSlot);
                              const full = available === 0;
                              const selected = formData.time_slot === timeSlot;

                              return (
                                <label
                                  key={timeSlot}
                                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    selected
                                      ? 'border-amber-500 bg-amber-500/10'
                                      : full
                                      ? 'border-red-500 bg-red-500/10 cursor-not-allowed opacity-60'
                                      : 'border-gray-700 hover:border-amber-500/50 bg-gray-900/70'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="time_slot"
                                    value={timeSlot}
                                    checked={selected}
                                    onChange={() => handleSlotSelect(formData.audition_date, timeSlot)}
                                    disabled={full}
                                    className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                                  />
                                  <div className="flex-1">
                                    <div className={`text-sm font-medium ${selected ? 'text-amber-200' : full ? 'text-red-300' : 'text-white'}`}>
                                      {timeSlot}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                      {full ? 'No availability' : `${available} seats left`}
                                    </div>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {errors.audition_date && <p className="mt-2 text-sm text-red-500">{errors.audition_date}</p>}
                  {errors.time_slot && <p className="mt-2 text-sm text-red-500">{errors.time_slot}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="YouTube Link 1 (Optional)"
                    name="youtube_link_1"
                    type="url"
                    value={formData.youtube_link_1}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                  />
                  <Input
                    label="YouTube Link 2 (Optional)"
                    name="youtube_link_2"
                    type="url"
                    value={formData.youtube_link_2}
                    onChange={handleInputChange}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>
            </div>

            {/* KKC Membership Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                KKC Membership
              </h2>
              <div className="space-y-6">
                <label className="flex items-center gap-3 cursor-pointer bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <input
                    type="checkbox"
                    name="is_member"
                    checked={formData.is_member}
                    onChange={handleInputChange}
                    className="w-5 h-5"
                  />
                  <span className="text-white font-medium">I am a Lifetime KKC member</span>
                </label>

                {formData.is_member && (
                  <div className="bg-gray-800/50 p-6 rounded-lg space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="KKC ID"
                        name="kkc_id"
                        value={formData.kkc_id}
                        onChange={handleInputChange}
                        error={errors.kkc_id}
                        disabled={memberVerified}
                        placeholder="Enter your KKC ID"
                      />
                      <div className="flex items-end gap-2">
                        {!memberVerified && !memberOtpSent && (
                          <Button type="button" onClick={fetchMemberDetails} variant="secondary" className="w-full" isLoading={verifyingMembership}>
                            Verify Membership
                          </Button>
                        )}
                        {memberVerified && (
                          <div className="flex items-center gap-2 text-green-500 w-full justify-center bg-green-500/10 rounded-lg py-3">
                            <CheckCircle2 size={20} />
                            <span className="font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {memberOtpSent && !memberVerified && (
                      <div className="grid md:grid-cols-2 gap-4 bg-gray-900/50 p-4 rounded-lg">
                        <Input
                          label="Enter OTP"
                          value={memberOtp}
                          onChange={(e) => setMemberOtp(e.target.value)}
                          maxLength={6}
                          placeholder="6-digit OTP"
                        />
                        <div className="flex items-end">
                          <Button type="button" onClick={verifyMemberOtp} variant="secondary" className="w-full" isLoading={verifyingMemberOtp}>
                            Verify OTP
                          </Button>
                        </div>
                      </div>
                    )}

                    {memberVerified && (
                      <div className="border-t border-gray-700 pt-6 space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <p className="text-green-500 font-medium mb-2">Lifetime Member Benefits</p>
                          <p className="text-sm text-gray-300">
                            Your registration fee is waived. You may support the contest by contributing if you wish.
                          </p>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer bg-gray-900/50 p-4 rounded-lg hover:bg-gray-900/70 transition-colors">
                          <input
                            type="checkbox"
                            name="wantsContribution"
                            checked={formData.wantsContribution}
                            onChange={handleInputChange}
                            className="w-5 h-5"
                          />
                          <span className="text-white">I would like to contribute (optional)</span>
                        </label>

                        {formData.wantsContribution && (
                          <div className="bg-gray-900/50 p-4 rounded-lg">
                            <Input
                              label="Contribution Amount"
                              name="contribution_amount"
                              type="number"
                              value={formData.contribution_amount}
                              onChange={handleInputChange}
                              placeholder="Enter amount in ₹"
                              error={errors.contribution_amount}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                Terms & Conditions
              </h2>
              <div className="bg-gray-800/50 p-6 rounded-lg space-y-4 max-h-96 overflow-y-auto mb-6">
                <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
                  <p>• The competition is only for singing. Participants can perform only in the singing category.</p>
                  <p>• The competition is open to all age groups.</p>
                  <p>• Participants under the age of 18 must have permission from a parent or guardian to participate in the competition.</p>
                  <p>• <strong className="text-white">The audition registration fee is ₹499 for advertisement. If you qualify for the Quarter Finale, you will need to pay an additional ₹999 for next advertisement registration.</strong></p>
                  <p>• The entry fee is taken as an advertisement or promotional fee. It is not a refundable registration fee.</p>
                  <p>• Participants are responsible for copyright of the songs they perform. Any copyright issues related to the song will be the responsibility of the participant.</p>
                  <p>• The decision of the organizers and judges will be final and binding.</p>
                  <p>• Participants must bear their own travel, accommodation, and personal expenses.</p>
                  <p>• If any dispute arises, the legal jurisdiction will be Indore, Madhya Pradesh.</p>
                  <p>• During the live performance, the organizers will not be responsible for any technical problems or physical issues faced by the participant.</p>
                  <p>• This program is not associated with any television show, OTT platform, national brand, or government organization.</p>
                  <p>• Selection of participants will be based entirely on the decision of the judging panel.</p>
                  <p>• The organizers will not be responsible for any personal loss, technical issue, copyright dispute, or external fraud.</p>
                  <p>• The amount paid is considered an advertisement or promotional fee and will not be refunded under any circumstances.</p>
                  <p>• The organizers reserve the right to change the event date, time, or rules if necessary.</p>
                  <p>• All disputes related to the event will be handled under the jurisdiction of Indore (Madhya Pradesh) only.</p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer bg-gray-800/30 p-4 rounded-lg hover:bg-gray-800/50 transition-colors">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5"
                />
                <span className="text-white">
                  I have read and agree to all the terms and conditions mentioned above <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.terms && <p className="mt-2 text-sm text-red-500">{errors.terms}</p>}
            </div>

            {/* Payment Summary and Submit */}
            <div className="border-t border-gray-700 pt-6">
              <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-2 border-amber-500/30 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold text-lg">Audition Registration Fee:</span>
                  <span className="text-3xl font-bold text-amber-500">
                    ₹{formData.is_member && memberVerified ? '0' : '499'}
                  </span>
                </div>
                {formData.is_member && memberVerified && (
                  <p className="text-sm text-green-500 mt-2 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    Lifetime member – registration is free
                  </p>
                )}
                {!formData.is_member || !memberVerified ? (
                  <p className="text-sm text-amber-400 mt-3 bg-amber-500/10 p-3 rounded-lg">
                    <strong>Note:</strong> Quarter Finale qualified participants will need to pay an additional ₹999
                  </p>
                ) : null}
                {formData.wantsContribution && formData.contribution_amount && (
                  <div className="mt-4 pt-4 border-t border-amber-500/30">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Contribution Amount:</span>
                      <span className="text-2xl font-bold text-amber-500">₹{formData.contribution_amount}</span>
                    </div>
                  </div>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full" isLoading={loading}>
                {getButtonText()}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
