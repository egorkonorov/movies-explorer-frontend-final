import React from "react";

function Techs(){

    return (
        <>
            <div className="techs">
                <div className="techs__main">
                    <h2 className="techs__header">Технологии</h2>
                    <div className="techs__line"></div>
                    <div className="techs__base">
                        <h3 className="techs__title">7 технологий</h3>
                        <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                        <div className="techs__container">
                            <div className="techs__tech">HTML</div>
                            <div className="techs__tech">CSS</div>
                            <div className="techs__tech">JS</div>
                            <div className="techs__tech">React</div>
                            <div className="techs__tech">Git</div>
                            <div className="techs__tech">Express.js</div>
                            <div className="techs__tech">MongoDB</div>
                        </div>
                    </div>
                 </div>
            </div>
        </>
    
    
    );
};

export default Techs;