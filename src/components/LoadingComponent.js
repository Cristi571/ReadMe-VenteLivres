
/**
 * This is the default loading component to display while waiting for data to 
 * be prepared or other processes to be performed
 * @author Cristian Tirche 
 * @author cristian.tirche@gmail.com
 */

import React, { useState, useEffect } from "react"

// Import the media file
import loadingLogoGif from "../media/icons/book_preloader.gif"
// Import the stylesheet for this components
import "../styles/LoadingComponent.css"

function LoadingComponent() {
    // useState to update dynammically the displayed text of loading component
    //const loadTxtValues = ["Loading.", "Loading..", "Loading...", ]
    
    const loadTxtValues = [ 
        "...Loading", 
        "..L.oading", 
        ".L.o.ading", 
        "L.o.a.ding", 
        "Lo.a.d.ing", 
        "Loa.d.i.ng", 
        "Load.i.n.g", 
        "Loadi.n.g.", 
        "Loadin.g..", 
        "Loading...", 
        ".Loading..",
        "..Loading.", 
    ]
    // const loadTxtValues = [ "...Loading", 
        //                      "..L.oading", 
        //                      ".L.o.ading", 
        //                      "L.o.a.ding", 
        //                      "Lo.a.d.ing", 
        //                      "Loa.d.i.ng", 
        //                      "Load.i.n.g", 
        //                      "Loadi.n.g.", 
        //                      "Loadin.g..", 
        //                      "Loading...", 
        //                      "Loadin.g..", 
        //                      "Loadi.n.g.", 
        //                      "Loadi.n.g.", 
        //                      "Load.i.n.g", 
        //                      "Loa.d.i.ng", 
        //                      "Lo.a.d.ing", 
        //                      "L.o.a.ding", 
        //                      ".L.o.ading", 
        //                      "..L.oading", 
        //                     ]
    const [loadTxt, setLoadTxt] = useState("Loading.");
    
    
    useEffect(() => {
        let loadTxtValuesLenght = loadTxtValues.length-1;
        let i = 0;
        const interval = setInterval(() => {
            // Count the value position to display
            i ++;
            // Reinitialize i counter if it gets to the last value
            //i > 2 ? 0 : i;
            i = i > loadTxtValuesLenght ? 0 : i
            //if (i > loadTxtValuesLenght) { i = 0}
            // Display next value every second
            setLoadTxt(loadTxtValues[i]);
        }, 100);
        
        // Clear the interval between values
        return () => clearInterval(interval);
    });
    //console.log(loadTxt)


    return (
        <div className='loadingComponent'>
            <img className="loadingImg" src={loadingLogoGif} alt="Logo" /> 
            <p id='loadingTxt'>{loadTxt}</p>
        </div>
    )
}


export default LoadingComponent;