import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type PageType = 'home' | 'about' | 'auditions' | 'rules' | 'faq' | 'contact' | 'payment' | 'admin-login' | 'admin-dashboard' | 'form-management';

interface RegistrationFormData {
  full_name: string;
  parent_name: string;
  date_of_birth: string;
  gender: string;
  mobile: string;
  whatsapp_number?: string;
  sameAsPrimary?: boolean;
  email: string;
  full_address: string;
  city: string;
  state: string;
  pincode: string;
  category: string;
  audition_date: string;
  time_slot: string;
  youtube_link_1?: string;
  youtube_link_2?: string;
  is_member: boolean;
  kkc_id?: string;
  contribution_amount?: string;
  wantsContribution?: boolean;
  payment_amount: number;
  profilePhoto?: File | null;
}

interface AppContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  registrationData: RegistrationFormData | null;
  setRegistrationData: (data: RegistrationFormData | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BASE_PATH = '/auditions';

const normalizePath = (path: string): string => path.replace(/\/+$/, '');

const pathToPage = (path: string): PageType => {
  const normalized = normalizePath(path);

  // If the path doesn't start with BASE_PATH, fall back to home.
  if (!normalized.startsWith(BASE_PATH)) return 'home';

  const rest = normalized.slice(BASE_PATH.length);
  if (rest === '' || rest === '/') return 'home';

  switch (rest) {
    case '/register':
      return 'auditions';
    case '/about':
      return 'about';
    case '/rules':
      return 'rules';
    case '/faq':
      return 'faq';
    case '/contact':
      return 'contact';
    case '/payment':
      return 'payment';
    case '/admin-login':
      return 'admin-login';
    case '/admin-dashboard':
      return 'admin-dashboard';
    case '/form-management':
      return 'form-management';
    default:
      return 'home';
  }
};

const pageToPath = (page: PageType): string => {
  switch (page) {
    case 'home':
      return `${BASE_PATH}/`;
    case 'auditions':
      return `${BASE_PATH}/register`;
    case 'about':
      return `${BASE_PATH}/about`;
    case 'rules':
      return `${BASE_PATH}/rules`;
    case 'faq':
      return `${BASE_PATH}/faq`;
    case 'contact':
      return `${BASE_PATH}/contact`;
    case 'payment':
      return `${BASE_PATH}/payment`;
    case 'admin-login':
      return `${BASE_PATH}/admin-login`;
    case 'admin-dashboard':
      return `${BASE_PATH}/admin-dashboard`;
    case 'form-management':
      return `${BASE_PATH}/form-management`;
    default:
      return `${BASE_PATH}/`;
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>(() => pathToPage(window.location.pathname));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('kkc_is_admin') === '1';
  });
  const [registrationData, setRegistrationData] = useState<RegistrationFormData | null>(null);

  useEffect(() => {
    const desiredPath = pageToPath(currentPage);
    const currentPath = normalizePath(window.location.pathname);

    if (currentPath !== normalizePath(desiredPath)) {
      // Use pushState so browser navigation works naturally.
      window.history.pushState({}, '', desiredPath);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isAdmin) {
      localStorage.setItem('kkc_is_admin', '1');
    } else {
      localStorage.removeItem('kkc_is_admin');
    }
  }, [isAdmin]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(pathToPage(window.location.pathname));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isAdmin,
        setIsAdmin,
        registrationData,
        setRegistrationData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
