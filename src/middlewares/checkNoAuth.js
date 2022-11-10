
import {Navigate} from "react-router-dom";

// Redirect user to default home page, not allowing him to access pages like
// login or register, because a session is already running
export default function checkNoAuth(req, res, next) {
    if(localStorage.getItem('sess_token')) {
        // Go to the home route
        <Navigate to="/home"/>
        // console.log("session: ok")
    }
    // Stay on this route since the user is not authenticated
    next();
}