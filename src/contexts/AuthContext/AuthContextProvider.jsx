import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authMethod, setAuthMethod] = useState(null);

    const registerUser = (email, password) => {
        setLoading(true);
        setAuthMethod("register");
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        setAuthMethod("login");
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWGoogle = () => {
        setLoading(true);
        setAuthMethod("google");
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
        authMethod,
        registerUser,
        signInUser,
        signInWGoogle,
        updateUserProfile,
        logoutUser,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
}
