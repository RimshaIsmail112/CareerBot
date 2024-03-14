import React from 'react';
import Authentication from "@/components/authComponents/Authentication";

export default function AuthLayout({children}) {
    return <Authentication>
        {children}
    </Authentication>
}