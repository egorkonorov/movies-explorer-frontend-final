import React from "react";
import profilePhoto from "./../../../images/profile-photo.jpg";

function AboutMe(){

    return (
        <>
            <div className="aboutMe"><a id="aboutMe"></a>
                <div className="aboutMe__main">
                    <h2 className="aboutMe__header">Студент</h2>
                    <div className="aboutMe__line"></div>
                    <div className="aboutMe__profile">
                        <div className="aboutMe__information">
                            <p className="aboutMe__name">Егор</p>
                            <p className="aboutMe__title">Фронтенд-разработчик, 25 лет</p>
                            <p className="aboutMe__subtitle">Я родился и живу в Москве, закончил экономичский факультет МАДИ, имею музыкальное образование по классу фортепьяно. Я увлекаюсь сноубодом, учусь играть на гитаре, а так же тренируюсь в любительской футбольной лиге. 3 года работал по специальности в Департаменте траспорта, потом сменил работу и устроился финансистом в компанию Digmigroup. Около года назад начал интересоваться веб-разработкой, окончил курс Яндекс Практикума и теперь активно ищу работу в новой специальности.</p>
                            <div className="aboutMe_social-networks">
                                <a href="https://vk.com/egoorkaaa" target="_blank" rel="noreferrer" className="aboutMe_social-network">Вконтакте</a>
                                <a href="https://github.com/egorkonorov" target="_blank" rel="noreferrer" className="aboutMe_social-network">Github</a>
                            </div>
                        </div>
                        <img src={profilePhoto} alt="Фото Профиля" className="aboutMe__photo"></img>
                    </div>
                </div>
            </div>
        </>
    
    
    );
};

export default AboutMe;