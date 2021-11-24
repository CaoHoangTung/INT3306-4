import UserIntro from '../home/UserIntro.js'
import React from 'react';
function WhoToFollow() {
    return (
        <div className="WhoToFollow">
            <p>
                Who to follow
            </p>
            <div className="WhoToFollow_Container">
                <UserIntro />
                <UserIntro />
                <UserIntro />
                <UserIntro />
            </div>
        </div>
    )
}
export default WhoToFollow;