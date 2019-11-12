import React, {useState, useEffect} from 'react';
// import Axios from 'axios';
import withAuth from '../axios';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        withAuth().get('http://localhost:5000/api/restricted/users')
        .then(res => setUsers(res.data))
        .catch(err => alert(err.message))
    })

    return (
        <div>
            {users.map(user => 
                <p key={user.id} >{user.username}</p>
            )}
        </div>
    )
}