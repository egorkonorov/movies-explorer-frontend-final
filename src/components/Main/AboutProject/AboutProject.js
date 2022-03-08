import React from "react";

function AboutProject(){

    return (
        <>
            <div className="aboutProject"><a id="aboutproject"></a>
                <div className="aboutProject__main">
                    <h2 className="aboutProject__header">О Проекте</h2>
                    <div className="aboutProject__line"></div>
                    <div className="aboutProject__paragraphs">
                        <div className="aboutProject__paragraph">
                            <p className="aboutProject__text-header">Дипломный проект включал 5 этапов</p>
                            <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                        </div>
                        <div className="aboutProject__paragraph">
                            <p className="aboutProject__text-header">На выполнение диплома ушло 5 недель</p>
                            <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                        </div>
                    </div>
                    <div className="aboutProject__scales">
                        <div className="aboutProject__backend">
                            <div className="aboutProject__backend-scale">1 неделя</div>
                            <div className="aboutProject__backend-text">Back-end</div> 
                        </div>
                        <div className="aboutProject__frontend">
                            <div className="aboutProject__frontend-scale">4 недели</div>
                            <div className="aboutProject__frontend-text">Front-end</div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    
    
    );
};

export default AboutProject;