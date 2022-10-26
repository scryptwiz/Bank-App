import { useContext } from 'react';
import { UserContext } from '../context/SignupContext';

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error('useUserContext must be use inside a UserContextProvider');
    }

  return context;
}
