import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users01() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    //처음 렌더링 될때 어떤 작업을 하겠다.
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // 초기화
                setUsers(null);
                setError(null);
                setLoading(true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
                
                setUsers(response.data);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    if (loading) return <div> 로딩중..</div>
    if (error) return <div> 에러발생..</div>
    if (!users) return null;

    return <ul>
        {users.map(user => <li key={user.id}>
            {user.username} ({user.name})

        </li>)}


    </ul>;

}

export default Users;