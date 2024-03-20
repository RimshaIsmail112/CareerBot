import React from 'react';
import ProfileLayout from "@/components/profileComponents/ProfileLayout";


export default function Profile({children}) {
    return <ProfileLayout>
        {children}
    </ProfileLayout>
}