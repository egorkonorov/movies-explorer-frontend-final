import React from "react";

import  {Link} from 'react-router-dom';

function Error404(){

    return (
        <>
            <div className="page_black">
                <div className="error404">
                    <p className="error404__heading">404</p>
                    <p className="error404__subtitle">Страница не найдена</p>
                    <Link  to="/" className="error404__link">Назад</Link>
                </div>
            </div>
        </>
    
    
    );
};

export default Error404;