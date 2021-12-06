import './style.scss';
import MainNavBar from '../../../components/main/MainNavBar';
import TopicManagerSection from '../../../components/admin/TopicManagerSection';
import React from 'react';

function TopicManager() {

    return (
        <div>
            <MainNavBar />
            <TopicManagerSection />
        </div>

    );
}

export default TopicManager;