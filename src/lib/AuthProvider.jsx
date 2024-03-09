'use client'
import React from 'react';
import {SessionProvider} from "next-auth/react";
import RedirectToHome from "@/components/redirectComponents/RedirectToHome";
function AuthProvider({children}) {
    return (
        <SessionProvider>
                {children}
        </SessionProvider>
    );
}

export default AuthProvider;