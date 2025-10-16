import React, { Children, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

export const useAuth = () => {
    return React.useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    const userInfo = {
        user,
        loading,
        register,
        login,
        logout
    };
  return (
    <AuthContext.Provider value={userInfo}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthProvider