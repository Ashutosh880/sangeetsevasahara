// import { ChevronDown } from 'lucide-react';
// import { useState } from 'react';
// import { Card } from '../ui/Card';

// export function FAQSection() {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   const faqs = [
//     {
//       question: 'Who can participate in KKC Talent Show?',
//       answer: 'Anyone passionate about singing can participate, regardless of age or background. We welcome all aspiring singers to showcase their talent and compete for a chance to win exciting prizes and gain national recognition.',
//     },
//     {
//       question: 'What is the registration fee?',
//       answer: '₹499 for this audition round.',
//     },
//     {
//       question: 'What are the audition dates?',
//       answer: 'Auditions will be held on May 8, May 9, and May 10, 2026.',
//     },
//     {
//       question: 'What should I include in my audition video?',
//       answer: 'A two-minute video of your favorite song which clearly shows your face. Make sure the audio quality is good and your face is visible throughout the performance.',
//     },
//     {
//       question: 'How will I know if I am selected?',
//       answer: 'Our team will reach out to you if you are selected through WhatsApp or by a phone call.',
//     },
//     {
//       question: 'What if payment verification fails?',
//       answer: 'Send us your screenshot of the payment and we will verify it manually.',
//     },
//     {
//       question: 'Is there an age limit?',
//       answer: 'No, there is no age limit for participation.',
//     },
//     {
//       question: 'Are there any additional fees after registration?',
//       answer: 'Yes, participants who qualify for the Quarter Final will be required to pay an additional ₹999.',
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
//             Frequently Asked <span className="text-amber-500">Questions</span>
//           </h2>
//           <p className="text-xl text-gray-400">Got questions? We have answers!</p>
//         </div>

//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <Card key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
//                 <ChevronDown
//                   className={`text-amber-500 flex-shrink-0 transition-transform ${
//                     openIndex === index ? 'rotate-180' : ''
//                   }`}
//                   size={24}
//                 />
//               </div>
//               {openIndex === index && (
//                 <p className="mt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
//               )}
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/Card';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Who can participate in KKC Talent Show?',
      answer:
        `Anyone who is passionate about singing can participate.

• There is no specific age limit.
• Participants below 18 years must have permission from a parent or guardian.`,
    },
    {
      question: 'What is the registration fee?',
      answer:
        `Audition registration fee details:

• ₹499 for regular participants
• Free for existing KKC lifetime members`,
    },
    {
      question: 'Are there any additional fees after registration?',
      answer:
        `Yes. Participants who qualify for the Quarter Finale will need to pay:

• ₹999 for the next stage registration.`,
    },
    {
      question: 'What are the audition dates?',
      answer:
        `Auditions will be conducted on the following dates:

• 8 May 2026
• 9 May 2026
• 10 May 2026

Each date has limited slots available.`,
    },
    {
      question: 'How will I know if I am selected?',
      answer:
        `Selected participants will be notified by:

• Whatsapp
• Phone call
• SMS

This usually happens within two weeks after the audition review.`,
    },
    {
      question: 'Can I upload YouTube links along with my audition?',
      answer:
        `Yes, you may optionally provide YouTube links.

• These links help us see more of your performances.
• However, the uploaded audition video will be used for the official evaluation.`,
    },
    {
      question: 'Can I register more than once?',
      answer:
        `No.

• Each participant can register only once using a single mobile number.`,
    },
    {
      question: 'Can I change my audition date after registration?',
      answer:
        `No.

• Once the slot is booked, the audition date cannot be changed because each date has limited seats.`,
    },
    {
      question: 'What if my payment verification fails?',
      answer:
        `If your payment is deducted but not verified:

• Take a screenshot of the payment
• Send it to our support team

We will verify it manually.`,
    },
    {
      question: 'Who should I contact for help or queries?',
      answer:
        `For any questions or technical support contact us:

Email: sangeetsevasahara@gmail.com
Phone: +91 99265 61316`,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-400">Got questions? We have answers!</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between cursor-pointer">
                <h3 className="text-lg font-semibold text-white pr-8">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`text-amber-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </div>

              {openIndex === index && (
                <p className="mt-4 text-gray-400 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}