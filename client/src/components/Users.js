import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import withAuth from '../axios';

export default function Users(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        withAuth().get('http://localhost:5000/api/restricted/users')
        .then(res => setUsers(res.data))
        .catch(err => alert(err.message))
    })

    function onLogout(e) {
        e.preventDefault();
        Axios.get('http://localhost:5000/api/logout')
        .then(() => {
            props.history.replace('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <button onClick={onLogout} >Logout</button>
            <div>
                {users.map(user => 
                    <p key={user.id} >{user.username}</p>
                )}
            </div>
        </div>
    )
}