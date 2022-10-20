import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import {
    Link,
    // Route, 
    // Link, 
    // Routes, 
    useParams, 
    // Await
} from 'react-router-dom';
import "../styles/Login.css"

export default function Users() {
    // 👇️ get ID from url
    const params = useParams();
    const [users, setUsers] = useState(null)
    let paramId = '';
    if (params.id) {
        paramId = `/${params.id}`;
    }
    const urlAPI = `http://localhost:3001/api/users${paramId}`

    useEffect(()=> {
        fetch(urlAPI, {
            method: 'get',
            body:null,
            headers: { 'Content-Type' : 'application/json' }
        })
        .then(res => res.json())
        .then(data => {
            setUsers(data.users)
        })
        .catch((err) => {
            console.error({Error : err})
        })
    }, [urlAPI]);

    console.log(users);
    

    let isAdmin = true;
    if (isAdmin === true) {
        return (
        <>
            <div>Users page</div>
            {
            users !== null &&
            users.map((user) => (
                <ul key={uuid()}>
                    <li>
                        <Link to={`/users/${user.userId}`} className='itemName'>{user.userId}</Link>
                    </li>
                </ul>
            ))
            }
        </>
        )
    } else {
        
    }
    
}