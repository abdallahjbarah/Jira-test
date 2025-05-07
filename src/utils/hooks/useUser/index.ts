import { useRouter } from 'next/navigation';
import { ROLES, USER_DETAILS, Role } from '@utils/constants';

interface UserRole {
  id: Role;
  name: string;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  [key: string]: any; // For any additional properties
}

interface UseUserReturn {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  updateUserData: (newUserData: Partial<UserData>) => void;
  logout: () => void;
  isAuthenticUser: boolean;
  redirectTo: (path: string) => void;
}

export default function useUser(): UseUserReturn {
  const router = useRouter();

  function getUserSession(): UserData | null {
    try {
      const storedUserData = localStorage.getItem(USER_DETAILS);
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (error) {
      console.error('Error retrieving user data from localStorage:', error);
      return null;
    }
  }

  function setUserData(data: UserData): void {
    localStorage.setItem(USER_DETAILS, JSON.stringify(data));
  }

  function updateUserDataInSession(newUserData: Partial<UserData>): void {
    try {
      const userData = getUserSession();
      if (userData) {
        const updatedUserData = { ...userData, ...newUserData };
        localStorage.setItem(USER_DETAILS, JSON.stringify(updatedUserData));
      }
    } catch (error) {
      console.error(`Error updating ${USER_DETAILS} in localStorage:`, error);
    }
  }

  function logout(): void {
    localStorage.removeItem(USER_DETAILS);
    router.push('/');
  }

  function redirectTo(path: string): void {
    router.push(path);
  }

  function isAuthenticUser(): boolean {
    const userData = getUserSession();
    return (
      Number(userData?.role?.id) === ROLES.SUPER_ADMIN ||
      Number(userData?.role?.id) === ROLES.PARTNER
    );
  }

  return {
    userData: getUserSession(),
    setUserData,
    updateUserData: updateUserDataInSession,
    logout,
    isAuthenticUser: isAuthenticUser(),
    redirectTo,
  };
}
