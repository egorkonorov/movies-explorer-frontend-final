import React from "react";

import  {Link} from 'react-router-dom';
function Header(props){

    return (
        <>
            <header className="header">
               {props.children}
             </header>
        </>
    
    
    );
};

export default Header;