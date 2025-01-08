import style from "./style.module.scss"
import React from "react";

const SelectLanguage = () =>{
    return (
        <div className={style.container}>
            <div className={style.selectLanguage}>
                <div className={style.selector}>    
                    <button className="btn btn-info">push me</button>
                </div>
            </div>

        </div>
    )
}

export default SelectLanguage;