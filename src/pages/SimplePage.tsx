// // import { Card } from '../components/ui/Card';
// // import { Footer } from '../components/home/Footer';

// // interface SimplePageProps {
// //   title: string;
// //   content: string;
// // }

// // export function SimplePage({ title, content }: SimplePageProps) {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24">
// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-gray-300 leading-relaxed whitespace-pre-line">{content}</div>
// //       </div>
// //     </div>
// //   );
// // }


// export function SimplePage({ title, content }: { title: string; content: string }) {
//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

//         <h1 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
//           {title}
//         </h1>

//         <div className="space-y-6 text-gray-300 leading-relaxed text-lg whitespace-pre-line">

//           {content.split('\n').map((line, index) => {
//             if (line.startsWith('Q:')) {
//               return (
//                 <div
//                   key={index}
//                   className="bg-gray-800/40 border border-gray-700 rounded-lg p-5 mt-6"
//                 >
//                   <p className="text-amber-400 font-semibold text-lg">
//                     {line}
//                   </p>
//                 </div>
//               );
//             }

//             if (line.startsWith('A:')) {
//               return (
//                 <p
//                   key={index}
//                   className="pl-5 border-l-4 border-amber-500 text-gray-300"
//                 >
//                   {line}
//                 </p>
//               );
//             }

//             if (
//               line === 'Participation' ||
//               line === 'Registration' ||
//               line === 'Technical' ||
//               line === 'Payment' ||
//               line === 'Event'
//             ) {
//               return (
//                 <h2
//                   key={index}
//                   className="text-2xl font-bold text-amber-500 mt-10"
//                 >
//                   {line}
//                 </h2>
//               );
//             }

//             return (
//               <p key={index}>
//                 {line}
//               </p>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

export function SimplePage({ title, content }: { title: string; content: string }) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
          {title}
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-lg whitespace-pre-line">

          {content.split('\n').map((line, index) => {

            // SECTION HEADERS
            if (
              line === 'Our Mission:' ||
              line === 'Our Achievements:' ||
              line === 'Eligibility:' ||
              line === 'Registration:' ||
              line === 'Audition Requirements:' ||
              line === 'Judging Criteria:' ||
              line === 'Code of Conduct:' ||
              line === 'Disqualification:' ||
              line === 'Participation' ||
              line === 'Registration' ||
              line === 'Technical' ||
              line === 'Payment' ||
              line === 'Event' ||
              line === 'Address:' ||
              line === 'Contact Numbers:' ||
              line === 'Email:' ||
              line === 'Website:'
            ) {
              return (
                <h2
                  key={index}
                  className="text-2xl font-semibold text-amber-500 mt-10"
                >
                  {line}
                </h2>
              );
            }

            // QUESTIONS
            if (line.startsWith('Q:')) {
              return (
                <div
                  key={index}
                  className="bg-gray-800/40 border border-gray-700 rounded-lg p-5 mt-6"
                >
                  <p className="text-amber-400 font-semibold text-lg">
                    {line}
                  </p>
                </div>
              );
            }

            // ANSWERS
            if (line.startsWith('A:')) {
              return (
                <p
                  key={index}
                  className="pl-5 border-l-4 border-amber-500 text-gray-300"
                >
                  {line}
                </p>
              );
            }

            // BULLET POINTS
            if (line.startsWith('-')) {
              return (
                <p
                  key={index}
                  className="pl-6 text-gray-300"
                >
                  {line}
                </p>
              );
            }

            // DEFAULT TEXT
            return (
              <p key={index} className="text-gray-300">
                {line}
              </p>
            );
          })}
        </div>

      </div>
    </section>
  );
}