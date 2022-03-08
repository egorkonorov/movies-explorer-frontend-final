import React from "react";
import arrow from "./../../../images/arrow.svg";
import  {Link} from 'react-router-dom';

function Portfolio(){

    return (
        <>
            <div className="portfolio">
                <div className="portfolio__main">
                    <h3 className="portfolio__header">Портфолио</h3>
                    <div className="portfolio__projects">
                        <div className="portfolio__website">
                            <a href="https://github.com/egorkonorov/how-to-learn" target="_blank" rel="noreferrer" className="portfolio__title">Статичный сайт</a>
                            <img src={arrow} alt="Стрелка" className="portfolio__arrow"></img>
                        </div>
                        <div className="portfolio__website">
                            <a href="https://github.com/egorkonorov/russian-travel" target="_blank" rel="noreferrer" className="portfolio__title">Адаптивный сайт</a>
                            <img src={arrow} alt="Стрелка" className="portfolio__arrow"></img>
                        </div>
                        <div className="portfolio__website-bottom">
                            <a href="https://github.com/egorkonorov/react-mesto-api-full" target="_blank" rel="noreferrer" className="portfolio__title">Одностраничное приложение</a>
                            <img src={arrow} alt="Стрелка" className="portfolio__arrow"></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    
    
    );
};

export default Portfolio;