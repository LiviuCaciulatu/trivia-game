import style from "./style.module.scss"
import React from "react";

const SelectLanguage = () =>{
    return (
        <div className={style.container}>
            <div className={style.selectLanguage}>
                <div className={style.selector}>    
                    <button className={`${style.btnEn} btn btn-info`}>English</button>
                    <button className={`${style.btnRo} btn btn-info`}>Romana</button>
                </div>
            </div>

        </div>
    )
}

export default SelectLanguage;