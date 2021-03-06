import React, { useEffect } from 'react';
import { getUser, useUsersDispatch, useUsersState } from './UsersContext';


function User({ id }) {
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    useEffect(() => {
        getUser(dispatch, id);
    }, [dispatch, id]);

    const {isLoading , data: user, error} = state.user;
    
    if (isLoading) return <div> 로딩중..</div>
    if (error) return <div> 에러발생..</div>
    if (!user) return null;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <b>Email : </b> {user.email}
                <b>Email : </b> {user.email}
                <b>Email : </b> {user.email}
            </p>
        </div>
    );

}

export default User;