import React from "react";


function Preloader({emptyPreloaderClass, editpreloaderNumber}){

    function handlePreloaderClick(e){
        editpreloaderNumber()
        
    }  
    return (
        <>
            <div className={emptyPreloaderClass}>
                <button className="preloader__button" onClick={handlePreloaderClick}>Еще</button>
            </div>
        </>
    
    
    );
};

export default Preloader;