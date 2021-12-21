import './style.scss';
import MainNavBar from '../../../components/main/MainNavBar';
import CommentManagerSection from '../../../components/admin/CommentManagerSection';
import React from 'react';

function CommentManager() {

    return (
        <div>
            <MainNavBar />
            <CommentManagerSection />
        </div>

    );
}

export default CommentManager;