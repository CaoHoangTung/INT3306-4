import './style.scss';
import MainNavBar from '../../../components/main/MainNavBar';
import PostManagerSection from '../../../components/admin/PostManagerSection';
import React from 'react';

function PostManager() {

    return (
        <div>
            <MainNavBar />
            <PostManagerSection />
        </div>

    );
}

export default PostManager;