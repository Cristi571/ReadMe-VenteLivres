import React from "react"
import "../styles/ErrorComponent.css"

/**
 * This is the default error component to display when an unexpected error
 * occurs
 * @author Cristian Tirche 
 * @author cristian.tirche@gmail.com
 */
function ErrorComponent(errMess) {
    //console.log(errMess.errMess)
    return (
        <div className="errorContainer">
            <div className="errorBorder">
                <div className="errorSymbol">
                    &#33;
                </div>
            </div>
            <div className="errorMess">
                {errMess.errMess}
            </div>
        </div>
    );
}

export default ErrorComponent;