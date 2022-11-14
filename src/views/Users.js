import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { getFromLocal, removeFromLocal} from "../tools/Tools";
import Logout from '../views/Logout';
import "../styles/Users.css"

export default function Users({localSession}) {
    const navigate = useNavigate();
    useEffect(() => {
        if(localSession === false) {
            navigate("/home");
        }
    }, [localSession]);

    const [editingData, setEditingData] = useState(false)
    function toggleEditingData() {
        setEditingData(!editingData);
    }

    const [showHidePass, setShowHidePass] = useState(["Show", "Show", "Show"])
    function toggleShowHidePass(position) {
        switch (position) {
            case 0:
                if (showHidePass[position] === "Show") {
                    setShowHidePass(["Hide", showHidePass[1], showHidePass[2]]);
                } else if (showHidePass[position] === "Hide") {
                    setShowHidePass(["Show", showHidePass[1], showHidePass[2]]);
                }
                break;
            case 1:
                if (showHidePass[position] === "Show") {
                    setShowHidePass([showHidePass[0], "Hide", showHidePass[2]]);
                } else if (showHidePass[position] === "Hide") {
                    setShowHidePass([showHidePass[0], "Show", showHidePass[2]]);
                }
                break;
            case 2:
                if (showHidePass[position] === "Show") {
                    setShowHidePass([showHidePass[0], showHidePass[1], "Hide"]);
                } else if (showHidePass[position] === "Hide") {
                    setShowHidePass([showHidePass[0], showHidePass[1], "Show"]);
                }
                break;
        
            default:
                setShowHidePass(["Show", "Show", "Show"]);
                break;
        }
        
    }


    // 👇️ get ID from url
    var params = useParams();
    // const { params } = useParams();
    const [users, setUsers] = useState(null)
    var paramId = params.id ? `/${params.id}` : '';


    // GET : api/users & GET : api/user/:id
    // Get the user(s) data each time the url parameter :id changes
    function getUsersDataFromDB() {
        // Reset current user(s) data to null
        setUsers(null);
        let urlAPI = `http://localhost:3001/api/users${paramId}`;
        // Prepare the bearer header
        let bearer = 'Bearer ' + localSession;
        // Send a Axios get request to the server with given url api (and parameters)
        axios.get(urlAPI, {
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        // Get the request response
        .then((res) => {
            // Check if we have a valid successful response
            if (res.status === 200 || res.statusText === "OK" || res.data.message === "Successful") {
                if (paramId === '') {
                    // If there is no id parameter given, 
                    // then server returns all users
                    setUsers(res.data.users);
                } else {
                    // If there is a id parameter, 
                    // the server returns the complete data of an user
                    setUsers(res.data.data);
                }
            }
            // If we get an invalid server response, 
            // then no user data will be affected
        })
        // Catch the axios get unexpected errors
        .catch( (err) => {
            // Trying to detect the nature of the error returned by the server
            try {
            switch (err.response.status) {
                case 401: // Invalid bearer authorization
                    try {
                        // Try to access the error message returned by the server
                        if (err.response.data.message === "Auth failed") {
                            console.log("Unauthorized, need to log in.");
                            // Make sure to delete invalid/expired token from localStorage
                            removeFromLocal("sess_token");
                        }
                    } catch (error) {
                        console.error(err.message);
                    }
                    break;
                case 403: // Access forbiden to ressources for this user
                    try {
                        console.log(err.response.data.message);
                    } catch (error) {
                        console.error(err.message);
                    }
                    break;
                case 500: // Internal server error
                    console.error("Internal server error: ", err.message);
                    break;
                default:
                    console.log("Unexpected error occured : ", err);
                    break;
            }
            } catch (e) {
                console.log("Unexpected error occured : ", e);
            }

        })
    }
    
    
    
    
    // Update user data to display
    useEffect(()=> {
        getUsersDataFromDB();
    }, [paramId, editingData]);


    // Verification and Validation of the user input
    const handleInput = (atr, input) => {
        function capitalizeWords(input) {
            // Capitalize the names splitted by spaces
            const words1 = input.split(" ");
            let res = words1.map((word) => {
                try {
                    return word[0].toUpperCase() + word.substring(1); 
                } catch (error) {}
            }).join(" ");

            // Capitalize the names splitted by -
            const words2 = res.split("-");
            return words2.map((word) => {
                try {
                    return word[0].toUpperCase() + word.substring(1); 
                } catch (error) {}
            }).join("-");
        }
        if (atr === "fname") {
            // setFname(capitalizeWords(input));
        } else if (atr === "lname") {
            // setLname(capitalizeWords(input));
        }
    }



    const [infoMess, setInfoMess] = useState(null);

    const [firstname, setFirst] = useState(null);
    const [lastname, setLast] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPass] = useState(null); // Current pass
    const [isAdmin, setIsAdmin] = useState(null);
    const [newPass, setNewPass] = useState(null); // New pass
    const [confNewPass, setconfNewPass] = useState(null); // Confirm pass

    useEffect(() => {
        if (newPass && confNewPass) {
            
        } else {
            
        }
    }, [confNewPass]);

    // Update user data controller
    function handleFormActions(option, userData) {
        if (userData) {
            userData.firstname = toTitleCase(userData.firstname);
            userData.lastname = toTitleCase(userData.lastname);
            console.log("Current data : ", userData)
        }
        switch (option) {
            case "delete":
                if(window.confirm('This action is irrevocable!  \n Are you sure you want to delete your account?')) {
                    let deleteResult = deleteUserAccount();
                    if (deleteResult === "ok") {
                        let sessToken = getFromLocal("sess_token");
                        if (sessToken) {
                            var decoded = jwt_decode(sessToken);
                            var bearer = 'Bearer ' + localSession;
                            if (decoded === paramId.substring(1, paramId.length)) {
                                fetch(urlAPI, {
                                    method: 'post',
                                    headers: { 
                                        'Authorization': bearer,
                                        'Accept': 'application/json',
                                        'Content-Type': 'multipart/form-data'
                                    }
                                })
                                .then(()=>{
                                    removeFromLocal("sess_token");
                                    console.log("Account deleted..")
                                })
                                .catch((e)=>{
                                    console.log("Unexpected error : ", e);
                                })
                            }
                        }
                    }
                }
                break;
            case "cancel":
                setEditingData(false);
                break;
            case "confirm":
                if(window.confirm('Apply changes?')) {
                    if (firstname || lastname || email || password || isAdmin) {
                        handleEditUserData(userData);
                        console.log("Changes applied");
                    } else {
                        console.log("No changes to make");
                    }
                } else {
                    console.log("Changes canceled");
                }
                break;
            default:
                setEditingData(false);
                break;
        }
    }

    // PUT : api/users/:id/update
    async function handleEditUserData(userData) {
        // Send api request to server
        let urlAPI = `http://localhost:3001/api/users${paramId}/update`;
        let bearer = 'Bearer ' + localSession;
        let newData = {firstname, lastname, email, password, isAdmin};
        // Remove default null keys from the object
        Object.keys(newData).forEach(key => {
            if (newData[key] === null || newData[key] === undefined) {
              delete newData[key];
            }
        });
        newData = JSON.stringify(newData);
        console.log("newData : ", newData)
        let result = await fetch(urlAPI, {
            mode: 'cors',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body:newData,
        })
        console.log("Result1 : ", result)
        // Wait for the server response and convert it into a json object
        result = await result.json();
        // Verify the server response
        console.log("Result2 : ", result)
        if (result.message) {
            switch (result.message) {
                case 'User updated successfully':
                    setInfoMess("Account data updated");
                    // setEditingData(false)
                    break;
                case 'An error occured':
                    setInfoMess("Failed to update, please retry later");
                    break;
                default:
                    setInfoMess(result.message);
                    break;
            }
        } else {
            console.log("Unexpected error occured : ", result)
        }
    }
    // DELETE : api/users/:id/delete
    async function deleteUserAccount() {
        // Send api request to server
        let urlAPI = `http://localhost:3001/api/users${paramId}/delete`;
        let bearer = 'Bearer ' + localSession;
        let result = await fetch(urlAPI, {
            mode: 'cors',
            headers: {
                'Authorization': bearer,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        result = await result.json();
        try {if (result.message === "Account deleted successfully") {
            return "ok";
        }} catch (e) { }

        // console.log("Result delete : ", result)
    }



    // Convert a given string and returns it as Title(-)Case
    function toTitleCase(str) {
        try {
            return str.replace(/\w*/g,function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        } catch (e) {}
    }

    
return (<>


<div className='usersBody'>
    {(users === null) || (users === undefined) ?
        <div className='noUsersDefault'>No users to display</div>
    :
        paramId === '' && !users.email ?
        <ul className='usersList'>
            {users.map((user, index) => (
                <li key={uuid()} className='listItem'>
                    <div className='itemCounter'>{index+1}</div>
                    <Link to={`/users/${user.userId}`} className='itemName'>
                        {user.firstname + " " + user.lastname }
                    </Link>
                </li>
            ))}
        </ul>
        :
        users.email && editingData === false ?
        <div className='dataPanel'>
            
            <div className='panelBody'>
                <div className='controls'>
                    <Link to={`/users`} className='ctrlOption'>Back</Link>
                </div>
                <div className='userData'>
                    {users.firstname && <div className='dataField'>
                        Firstname : {toTitleCase(users.firstname)}</div>}
                    {users.lastname && <div className='dataField'>
                        Lastname : {toTitleCase(users.lastname)}</div>}
                    {users.email && <div className='dataField'>
                        E-mail : {users.email}</div>}
                </div>
            </div>
            <div className='panelAction'>
                <button type='button' onClick={toggleEditingData}>Edit data</button>
                <button type='button' onClick={()=>handleFormActions("delete", null)}>Delete account</button>
            </div>
        </div>
        :
        users.email && editingData === true &&
        
        <form>
            <div className='editingForm'>
                <div className='editSection title'>
                    Edit my account
                </div>

                <div className='editSection infoMess'>
                    {infoMess}
                </div>

                <div className='editSection'>
                    {users.firstname && 
                    <div className='formField'>
                        <label>Firstname</label>
                        <input type="text" 
                        defaultValue={toTitleCase(users.firstname)}
                        onChange={(e)=>{setFirst(toTitleCase(e.target.value))}}></input>
                    </div>}
                    {users.lastname && 
                    <div className='formField'>
                        <label>Lastname</label>
                        <input type="text" 
                        defaultValue={toTitleCase(users.lastname)}
                        onChange={(e)=>{setLast(toTitleCase(e.target.value))}}></input>
                    </div>}
                    {users.email && 
                    <div className='formField'>
                        <label>E-mail</label>
                        <input type="email" 
                        defaultValue={users.email}
                        onChange={(e)=>{setEmail(e.target.value)}}></input>
                    </div>}
                    
                </div>


                <div className='editSection'>
                    {users.email && <div className='formField'>
                        <label>Current password</label>
                        <input type={showHidePass[0] === "Show" ? "password" : "text"} 
                        autoComplete="new-password"
                        onChange={(e)=>{setPass(e.target.value)}}
                        ></input>
                        <span className='showHidePass' 
                            onClick={() => {toggleShowHidePass(0)}}>
                            {showHidePass[0]}
                        </span>
                    </div>}
                    {users.email && <div className='formField'>
                        <label>New password</label>
                        <input type={showHidePass[1] === "Show" ? "password" : "text"} 
                        autoComplete="new-password"
                        onChange={(e)=>{setPass(e.target.value)}}></input>
                        <span className='showHidePass' 
                            onClick={() => {toggleShowHidePass(1)}}>
                            {showHidePass[1]}
                        </span>
                    </div>}
                    {users.email && <div className='formField'>
                        <label>Confirm password</label>
                        <input type={showHidePass[2] === "Show" ? "password" : "text"} autoComplete="new-password"></input>
                        <span className='showHidePass' 
                            onClick={() => {toggleShowHidePass(2)}}>
                            {showHidePass[2]}
                        </span>
                    </div>}
                    
                </div>

                <div className='editSection actionZone'>
                    <button type='button' className='deleteForm' 
                    onClick={()=>handleFormActions("delete", null)}>Delete my account</button>
                </div>

                <div className='editSection actionZone'>
                    <button type='button' className='cancelForm' 
                    onClick={()=>handleFormActions("cancel", null)}>Cancel</button>

                    <button type='button' className='submmitForm' 
                    onClick={()=>handleFormActions("confirm", users)}>Confirm</button>
                </div>

            </div>
        </form>
    }
</div>


</>)
}