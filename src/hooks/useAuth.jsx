import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

export default function useAuth() {
    const authInfo = use(AuthContext);
    return authInfo;
}
