// // import { CheckCircle2 } from 'lucide-react';
// // import { useEffect, useState } from 'react';
// // import { useApp } from '../context/AppContext';
// // import { Button } from '../components/ui/Button';
// // import { Card } from '../components/ui/Card';
// // import { Toast } from '../components/ui/Toast';
// // import { useToast } from '../hooks/useToast';

// // declare global {
// //   interface Window {
// //     Razorpay: any;
// //   }
// // }

// // export function PaymentPage() {
// //   const { registrationData, setCurrentPage } = useApp();
// //   const { toast, showToast, hideToast } = useToast();
// //   const [processing, setProcessing] = useState(false);

// //   useEffect(() => {
// //     if (!registrationData) {
// //       setCurrentPage('auditions');
// //       return;
// //     }
// //   }, [registrationData, setCurrentPage]);

// //   const handlePayment = async () => {
// //   if (!registrationData) return;

// //   setProcessing(true);

// //   try {
// //     if (registrationData.payment_amount > 0) {

// //       // 🔹 Create Razorpay order
// //       const orderResponse = await fetch("/api/create-order.php", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({
// //           amount: registrationData.payment_amount,
// //           receipt: registrationData.mobile
// //         })
// //       });

// //       const orderData = await orderResponse.json();

// //       if (!orderData.success) {
// //         throw new Error(orderData.message);
// //       }

// //       // 🔹 Razorpay options
// //       const options = {
// //         key: "rzp_live_SQp0CZzgDtMsVQ",
// //         amount: orderData.amount,
// //         currency: orderData.currency,
// //         order_id: orderData.id,
// //         name: "KKC Talent Show",
// //         description: "Audition Registration",

// //         handler: async (response: any) => {
// //           try {

// //             // 🔹 Prepare FormData
// //             const formData = new FormData();

// //             Object.keys(registrationData).forEach((key) => {
// //               formData.append(key, registrationData[key]);
// //             });

// //             formData.append("razorpay_order_id", response.razorpay_order_id);
// //             formData.append("razorpay_payment_id", response.razorpay_payment_id);
// //             formData.append("razorpay_signature", response.razorpay_signature);

// //             // 🔹 Verify payment
// //             const verifyResponse = await fetch("/api/verify-payment.php", {
// //               method: "POST",
// //               body: formData
// //             });

// //             const verifyData = await verifyResponse.json();

// //             if (verifyData.success) {
// //               showToast("Registration successful!", "success");
// //               setCurrentPage("home");
// //             } else {
// //               throw new Error(verifyData.message);
// //             }

// //           } catch (error: any) {
// //             showToast("Payment verification failed: " + error.message, "error");
// //           }
// //         },

// //         prefill: {
// //           name: registrationData.full_name,
// //           email: registrationData.email,
// //           contact: registrationData.mobile
// //         },

// //         theme: {
// //           color: "#f59e0b"
// //         }
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();

// //     } else {

// //       // 🔹 FREE Registration
// //       const formData = new FormData();

// //       Object.keys(registrationData).forEach((key) => {
// //         formData.append(key, registrationData[key]);
// //       });

// //       const verifyResponse = await fetch("/api/verify-payment.php", {
// //         method: "POST",
// //         body: formData
// //       });

// //       const verifyData = await verifyResponse.json();

// //       if (verifyData.success) {
// //         showToast("Registration successful!", "success");
// //         setCurrentPage("home");
// //       } else {
// //         throw new Error(verifyData.message);
// //       }
// //     }

// //   } catch (error: any) {
// //     showToast("Error: " + error.message, "error");
// //   } finally {
// //     setProcessing(false);
// //   }
// // };

// //   if (!registrationData) {
// //     return null;
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
// //       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
// //             Complete <span className="text-amber-500">Registration</span>
// //           </h1>
// //           <p className="text-xl text-gray-400">
// //             {registrationData.payment_amount > 0
// //               ? 'Proceed to payment to complete your registration'
// //               : 'Confirm your registration details'}
// //           </p>
// //         </div>

// //         <Card>
// //           <h2 className="text-2xl font-bold text-white mb-6">Registration Summary</h2>
// //           <div className="space-y-3 text-gray-300">
// //             <div className="flex justify-between">
// //               <span>Name:</span>
// //               <span className="font-semibold text-white">{registrationData.full_name}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Category:</span>
// //               <span className="font-semibold text-white">{registrationData.category}</span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Audition Date:</span>
// //               <span className="font-semibold text-white">
// //                 {new Date(registrationData.audition_date).toLocaleDateString('en-IN', {
// //                   day: 'numeric',
// //                   month: 'long',
// //                   year: 'numeric'
// //                 })}
// //               </span>
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Amount:</span>
// //               <span className="font-semibold text-white">₹{registrationData.payment_amount}</span>
// //             </div>
// //           </div>

// //           <div className="mt-8">
// //             <Button
// //               onClick={handlePayment}
// //               isLoading={processing}
// //               className="w-full"
// //               size="lg"
// //             >
// //               {registrationData.payment_amount > 0 ? 'Proceed to Payment' : 'Complete Registration'}
// //               <CheckCircle2 className="ml-2" size={20} />
// //             </Button>
// //           </div>
// //         </Card>

// //         {toast.isOpen && (
// //           <Toast
// //             message={toast.message}
// //             type={toast.type}
// //             onClose={hideToast}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// import { CreditCard, Shield, Smartphone } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useApp } from '../context/AppContext';
// import { createRazorpayOrder, verifyRazorpayPayment, adjustSlot } from '../lib/api';
// import { Button } from '../components/ui/Button';
// import { Card } from '../components/ui/Card';
// import { Modal } from '../components/ui/Modal';

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// export function PaymentPage() {
//   const { registrationData, setCurrentPage } = useApp();
//   const [submitting, setSubmitting] = useState(false);
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
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

//   useEffect(() => {
//     if (!registrationData) {
//       setCurrentPage('auditions');
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => setRazorpayLoaded(true);
//     document.body.appendChild(script);

//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, [registrationData, setCurrentPage]);

//   const showModal = (type: 'success' | 'error', title: string, message: string) => {
//     setModalState({ isOpen: true, type, title, message });
//   };

//   const closeModal = () => {
//     setModalState(prev => ({ ...prev, isOpen: false }));
//     if (modalState.type === 'success') {
//       setTimeout(() => setCurrentPage('home'), 300);
//     }
//   };

//   const handleRetry = () => {
//     setModalState(prev => ({ ...prev, isOpen: false }));
//     setTimeout(() => handlePayment(), 300);
//   };

//   const handlePayment = async () => {
//     if (!razorpayLoaded) {
//       showModal('error', 'Loading', 'Payment gateway is still loading. Please wait...');
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const receipt = `KKC_${Date.now()}_${registrationData.mobile}`;

//       const order = await createRazorpayOrder({
//         amount: registrationData.payment_amount,
//         receipt: receipt,
//       });

//       if (!order || !order.id) {
//         throw new Error('Failed to create payment order');
//       }

//       const options = {
//         key: "rzp_live_SQp0CZzgDtMsVQ",
//         amount: order.amount,
//         currency: order.currency,
//         name: 'KKC Talent Show',
//         description: 'Audition Registration Fee',
//         order_id: order.id,
//         prefill: {
//           name: registrationData.full_name,
//           email: registrationData.email,
//           contact: registrationData.mobile,
//         },
//         theme: {
//           color: '#F59E0B',
//         },
//         handler: async function (response: any) {
//           try {
//             const verifyData = await verifyRazorpayPayment({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               registrationData: {
//                 ...registrationData,
//                 payment_status: 'approved',
//                 payment_screenshot: response.razorpay_payment_id,
//               },
//             });

//             if (verifyData && verifyData.success) {
//               await adjustSlot(registrationData.audition_date, 1);

//               showModal(
//                 'success',
//                 'Registration Successful!',
//                 'Your Audition Registration is successful and soon you will get an update via WhatsApp or call.'
//               );
//             } else {
//               throw new Error('Payment verification failed');
//             }
//           } catch (error) {
//             console.error('Payment verification error:', error);
//             showModal(
//               'error',
//               'Verification Failed',
//               `Payment verification failed. Please contact support with your payment ID: ${response.razorpay_payment_id}`
//             );
//           } finally {
//             setSubmitting(false);
//           }
//         },
//         modal: {
//           ondismiss: function () {
//             setSubmitting(false);
//             showModal('error', 'Payment Cancelled', 'You cancelled the payment. Please try again to complete your registration.');
//           },
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error:', error);
//       showModal('error', 'Payment Failed', 'Failed to initialize payment. Please check your internet connection and try again.');
//       setSubmitting(false);
//     }
//   };

//   if (!registrationData) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
//       <Modal
//         isOpen={modalState.isOpen}
//         onClose={closeModal}
//         type={modalState.type}
//         title={modalState.title}
//         message={modalState.message}
//         onConfirm={modalState.type === 'error' ? handleRetry : undefined}
//         confirmText={modalState.type === 'error' ? 'Retry Payment' : 'OK'}
//       />

//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
//             Complete <span className="text-amber-500">Payment</span>
//           </h1>
//           <p className="text-xl text-gray-400">Secure payment powered by Razorpay</p>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <h2 className="text-2xl font-bold text-white mb-6">Registration Summary</h2>
//             <div className="space-y-3 text-gray-300">
//               <div className="flex justify-between">
//                 <span>Name:</span>
//                 <span className="font-semibold text-white">{registrationData.full_name}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Category:</span>
//                 <span className="font-semibold text-white">{registrationData.category}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Audition Date:</span>
//                 <span className="font-semibold text-white">
//                   {new Date(registrationData.audition_date).toLocaleDateString('en-IN', {
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric'
//                   })}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Mobile:</span>
//                 <span className="font-semibold text-white">{registrationData.mobile}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>WhatsApp:</span>
//                 <span className="font-semibold text-white">{registrationData.whatsapp_number}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Email:</span>
//                 <span className="font-semibold text-white">{registrationData.email}</span>
//               </div>
//               {registrationData.is_member && (
//                 <div className="flex justify-between text-green-500">
//                   <span>Member Discount:</span>
//                   <span className="font-semibold">-₹500</span>
//                 </div>
//               )}
//               <div className="border-t border-gray-700 pt-3 flex justify-between text-xl">
//                 <span className="font-bold text-white">Total Amount:</span>
//                 <span className="font-bold text-amber-500">₹{registrationData.payment_amount}</span>
//               </div>
//             </div>
//           </Card>

//           <Card className="text-center">
//             <div className="mb-6">
//               <div className="flex items-center justify-center gap-2 mb-4">
//                 <Shield className="text-amber-500" size={32} />
//                 <h3 className="text-2xl font-bold text-white">Secure Payment Gateway</h3>
//               </div>
//               <p className="text-gray-400">Pay safely using UPI, Cards, Net Banking, or Wallets</p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-4 mb-8">
//               <div className="p-4 bg-gray-800/50 rounded-lg">
//                 <Smartphone className="text-amber-500 mx-auto mb-2" size={32} />
//                 <p className="text-white font-semibold">UPI</p>
//                 <p className="text-sm text-gray-400">Google Pay, PhonePe, Paytm</p>
//               </div>
//               <div className="p-4 bg-gray-800/50 rounded-lg">
//                 <CreditCard className="text-amber-500 mx-auto mb-2" size={32} />
//                 <p className="text-white font-semibold">Cards</p>
//                 <p className="text-sm text-gray-400">Debit & Credit Cards</p>
//               </div>
//               <div className="p-4 bg-gray-800/50 rounded-lg">
//                 <Shield className="text-amber-500 mx-auto mb-2" size={32} />
//                 <p className="text-white font-semibold">Net Banking</p>
//                 <p className="text-sm text-gray-400">All Major Banks</p>
//               </div>
//             </div>

//             <Button
//               onClick={handlePayment}
//               size="lg"
//               className="w-full"
//               isLoading={submitting}
//               disabled={!razorpayLoaded}
//             >
//               {razorpayLoaded ? `Pay ₹${registrationData.payment_amount}` : 'Loading Payment Gateway...'}
//             </Button>

//             <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
//               <div className="flex items-center gap-1">
//                 <Shield size={16} className="text-green-500" />
//                 <span>100% Secure</span>
//               </div>
//               <div className="h-4 w-px bg-gray-700"></div>
//               <div>
//                 <span>Powered by Razorpay</span>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-amber-500/10 border-amber-500/50">
//             <div className="space-y-2 text-sm text-gray-300">
//               <p>
//                 <span className="font-semibold text-amber-500">Note:</span> After successful payment, your registration will be confirmed immediately.
//               </p>
//               <p>You will receive a confirmation email and SMS with your registration details.</p>
//             </div>
//           </Card>

//           <Card className="bg-blue-500/10 border-blue-500/50">
//             <div className="text-sm text-gray-300">
//               <p className="font-semibold text-blue-400 mb-2">Payment Methods Accepted:</p>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
//                 <li>Credit Cards (Visa, Mastercard, American Express, Rupay)</li>
//                 <li>Debit Cards (All major banks)</li>
//                 <li>Net Banking (All major banks)</li>
//                 <li>Wallets (Paytm, PhonePe, Amazon Pay, etc.)</li>
//               </ul>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }



import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function PaymentPage() {
  const { registrationData, setCurrentPage } = useApp();
  const [processing, setProcessing] = useState(false);
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

  useEffect(() => {
    if (!registrationData) {
      setCurrentPage('auditions');
      return;
    }
  }, [registrationData, setCurrentPage]);

  const showModal = (type: 'success' | 'error', title: string, message: string) => {
    setModalState({ isOpen: true, type, title, message });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (modalState.type === 'success') {
      setTimeout(() => setCurrentPage('home'), 300);
    }
  };

  const handleRetry = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    setTimeout(() => handlePayment(), 300);
  };

  const handlePayment = async () => {
    if (!registrationData) return;

    setProcessing(true);

    try {
      if (registrationData.payment_amount > 0) {

        const orderResponse = await fetch("/api/create-order.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: registrationData.payment_amount,
            receipt: registrationData.mobile
          })
        });

        const orderData = await orderResponse.json();

        if (!orderData.success) {
          throw new Error(orderData.message);
        }

        const options = {
          key: "rzp_live_SQp0CZzgDtMsVQ",
          amount: orderData.amount,
          currency: orderData.currency,
          order_id: orderData.id,
          name: "KKC Talent Show",
          description: "Audition Registration",

          handler: async (response: any) => {
            try {

              const formData = new FormData();

              Object.keys(registrationData).forEach((key) => {
                formData.append(key, registrationData[key]);
              });

              formData.append("razorpay_order_id", response.razorpay_order_id);
              formData.append("razorpay_payment_id", response.razorpay_payment_id);
              formData.append("razorpay_signature", response.razorpay_signature);

              const verifyResponse = await fetch("/api/verify-payment.php", {
                method: "POST",
                body: formData
              });

              let verifyData;

              // 🔥 HANDLE NON-JSON (502 case)
              try {
                verifyData = await verifyResponse.json();
              } catch (e) {
                throw new Error("SERVER_ERROR");
              }

              if (verifyData.success) {
                setProcessing(false);
                showModal(
                  'success',
                  'Registration Successful!',
                  'Your Audition Registration is successful and soon you will get an update via WhatsApp or call.'
                );
              } else {
                throw new Error(verifyData.message);
              }

            } catch (error: any) {

              console.error("Verification Error:", error);

              // 🔥 CALL REFUND API (SAFE)
              try {
                await fetch("/api/check-and-refund.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    payment_id: response.razorpay_payment_id
                  })
                });
              } catch (refundErr) {
                console.error("Refund API failed:", refundErr);
              }

              setProcessing(false);

              showModal(
                'error',
                'Payment Verification Issue',
                'We couldn’t confirm your registration due to a temporary server issue.\n\nIf your amount has been debited, don’t worry — it will be automatically refunded within a few minutes.\n\nYou can also retry the process.'
              );
            }
          },

          prefill: {
            name: registrationData.full_name,
            email: registrationData.email,
            contact: registrationData.mobile
          },

          theme: {
            color: "#f59e0b"
          },

          modal: {
            ondismiss: function () {
              setProcessing(false);
              showModal(
                'error',
                'Payment Cancelled',
                'You cancelled the payment. Please try again to complete your registration.'
              );
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {

        // 🔹 FREE Registration (unchanged except JSON safety)

        const formData = new FormData();

        Object.keys(registrationData).forEach((key) => {
          formData.append(key, registrationData[key]);
        });

        const verifyResponse = await fetch("/api/verify-payment.php", {
          method: "POST",
          body: formData
        });

        let verifyData;

        try {
          verifyData = await verifyResponse.json();
        } catch (e) {
          throw new Error("Server error. Please try again.");
        }

        if (verifyData.success) {
          setProcessing(false);
          showModal(
            'success',
            'Registration Successful!',
            'Your Audition Registration is successful and soon you will get an update via WhatsApp or call.'
          );
        } else {
          throw new Error(verifyData.message);
        }
      }

    } catch (error: any) {
      setProcessing(false);
      showModal(
        'error',
        'Registration Failed',
        error.message || 'Failed to process your registration. Please check your internet connection and try again.'
      );
    }
  };

  if (!registrationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        title={modalState.title}
        message={modalState.message}
        onConfirm={modalState.type === 'error' ? handleRetry : undefined}
        confirmText={modalState.type === 'error' ? 'Retry Payment' : 'OK'}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Complete <span className="text-amber-500">Registration</span>
          </h1>
          <p className="text-xl text-gray-400">
            {registrationData.payment_amount > 0
              ? 'Proceed to payment to complete your registration'
              : 'Confirm your registration details'}
          </p>
        </div>

        <Card>
          <h2 className="text-2xl font-bold text-white mb-6">Registration Summary</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Name:</span>
              <span className="font-semibold text-white">{registrationData.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-semibold text-white">{registrationData.category}</span>
            </div>
            <div className="flex justify-between">
              <span>Audition Date:</span>
              <span className="font-semibold text-white">
                {new Date(registrationData.audition_date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-semibold text-white">₹{registrationData.payment_amount}</span>
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={handlePayment}
              isLoading={processing}
              className="w-full"
              size="lg"
            >
              {registrationData.payment_amount > 0 ? 'Proceed to Payment' : 'Complete Registration'}
              {!processing && <CheckCircle2 className="ml-2" size={20} />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
