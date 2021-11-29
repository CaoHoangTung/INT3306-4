import './style.scss';
import MainNavBar from '../../../components/main/MainNavBar';
import UserManagerSection from '../../../components/admin/UserManagerSection';
import React from 'react';

function UserManager() {

    return (
        <div>
            <MainNavBar />
            <UserManagerSection />
        </div>

    );
}

export default UserManager;