import React from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthContextProvider({ children }) {
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const authInfo = {
        registerUser,
        signInUser,
    };

    return <AuthContext value={authInfo}>{children}</AuthContext>;
}
