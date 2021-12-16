import './Main.scss';
import MainNavBar from "../../components/main/MainNavBar.js";
import MainSection from "../../components/main/MainSection.js";
import React from 'react';
function Main() {
    return (
        <div className="Main">
            <MainNavBar />
            <MainSection/>
        </div>
    );
}

export default Main;