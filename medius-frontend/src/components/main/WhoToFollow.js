import UserIntro from '../home/UserIntro.js'
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/users.js';

function WhoToFollow() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers(null, true)
            .then(users => {
                console.log(users);
                setUsers(users);
            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="WhoToFollow">
            <b>
                Who to follow
            </b>
            <div className="WhoToFollow_Container">
                {users.map((user, idx) => {
                    return (
                        <UserIntro
                            key={idx}
                            author={`${user.first_name} ${user.last_name}`}
                            image={user.avatar_path}
                            description={`${user.num_followers} followers`}
                            link={`/profile/${user.user_id}`}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default WhoToFollow;