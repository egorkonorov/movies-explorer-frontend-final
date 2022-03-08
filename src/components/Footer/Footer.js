import React from "react";
function Footer(props){

    return (
        <>
            <footer className="footer">
                <div className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</div>
                <div className="footer__line"></div>
                <div className="footer__base">
                    <p className="footer__copyright">&copy; 2022</p>
                    <div className="footer__links">
                        <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
                        <a href="https://github.com/" target="_blank" rel="noreferrer" className="footer__link">Github</a>
                        <a href="https://vk.com/egoorkaaa" target="_blank" rel="noreferrer" className="footer__link">Вконтакте</a>
                    </div>
                </div>
             </footer>
        </>
    
    
    );
};

export default Footer;