import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PaymentPage } from './pages/PaymentPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SimplePage } from './pages/SimplePage';
import { useEffect } from 'react';

function AppContent() {
  const { currentPage } = useApp();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return (
          <SimplePage
            title="About KKC Talent Show"
            content={`Welcome to KKC Talent Show - Season 1!

KKC Talent Show is India's premier musical talent discovery platform with a remarkable legacy of excellence. We are proud holders of 12 World Records and the prestigious London Book of Records for our outstanding contribution to the field of music and talent development.

Our Mission:
To nurture musical talent across India and provide opportunities for aspiring singers to shine on a national stage. We believe in giving every talented individual a platform to showcase their skills and achieve their dreams in the music industry.

Our Achievements:
- 12 World Records in music and performance
- 400+ successful shows across India
- 2000+ artists launched and mentored
- 128 hours of continuous singing marathon
- London Book Record holder

Join us in this incredible journey and be part of India's biggest musical talent show!`}
          />
        );
      case 'auditions':
        return <RegistrationPage />;
      case 'rules':
        return (
          <SimplePage
            title="Competition Rules"
            content={`Competition Rules and Guidelines:

Eligibility:
- Open to all Indian citizens
- Participants under 18 must have parental consent

Registration:
- Each participant can register only once
- Registration fee: ₹499 (Regular) and ₹999 for those who reached the Quarter Finale round.

Audition Requirements:
- Original or cover songs allowed
- Solo performances only (no duets or group performances)

Judging Criteria:
- Vocal quality and technique (40%)
- Stage presence and performance (30%)
- Song choice and interpretation (20%)
- Overall impact and originality (10%)

Code of Conduct:
- Respectful behavior towards judges, organizers, and fellow participants
- No plagiarism or lip-syncing
- Follow all instructions provided by the organizing committee
- Decision of the judges will be final

Disqualification:
Participants may be disqualified for:
- Providing false information
- Misconduct or inappropriate behavior
- Violation of competition rules
- Missing scheduled audition without prior notice`}
          />
        );
      case 'faq':
  return (
    <SimplePage
      title="Frequently Asked Questions"
      content={`Participation

Q: Can I register more than once?
A: No. Each participant can register only once using a single mobile number.

Q: Can I change my audition date after registration?
A: No. Once the registration is completed and a slot is booked, the audition date cannot be changed because each date has limited slots.

Q: Can I perform an original song?
A: Yes. Participants can perform either an original song or a cover song during the audition.

Q: Can I perform with background music?
A: Yes. Participants may sing with background music or karaoke tracks during their audition performance.


Registration

Q: How many audition slots are available?
A: Each audition date has limited slots available. Registrations will close automatically once all slots are filled.

Q: What happens after the audition round?
A: Selected participants will move to the next round of the competition and will be informed by our team.

Q: How will I receive further instructions?
A: All updates and further instructions will be shared through phone call or SMS.


Technical

Q: What should I do if I have technical issues?
A: Please check your internet connection. If the issue continues, contact our support team for assistance.


Payment

Q: Is the registration fee refundable?
A: No. The registration fee is non-refundable as it is considered a promotional and administrative charge.

Q: What if payment fails but money is deducted?
A: If your payment fails but the amount is deducted, please contact our support team within 24 hours with the payment screenshot for verification.


Event

Q: Will travel or accommodation be provided?
A: No. Participants must manage their own travel, accommodation, and personal expenses.

Q: Is the show associated with a TV channel?
A: No. KKC Talent Show is an independent musical talent competition and is not associated with any TV channel or OTT platform.


For further queries:
Email: sangeetsevasahara@gmail.com
Phone: +91 99265 61316`}
    />
  );
      case 'contact':
        return (
          <SimplePage
            title="Contact Us"
            content={`Get in Touch:

KKC Talent Show - Season 1 (2026)

Address:

Indore, Madhya Pradesh
India

Contact Numbers:
+91 99265 61316

Email:
sangeetsevasahara@gmail.com

Website:
www.sangeetsevasahara.in

For Registration Support:
Email your queries to sangeetsevasahara@gmail.com with subject line "Registration Query"

For Technical Issues:
Call +91 99265 61316 anytime or email

Follow us on social media for latest updates and announcements about KKC Talent Show Season 1!`}
          />
        );
      case 'payment':
        return <PaymentPage />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
