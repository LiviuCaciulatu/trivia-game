import Image from "next/image";
import style from "./style.module.scss"
import React from "react"

const Footer = () =>{
    return (
        <div className={style.container}>
            <div className={style.navBar}>
                <div className={style.logo}>
                    <Image width={70} height={70} src="/svg/Logo-3.svg" alt="about us" className={style.logoImg} />
                    <h1>Trivia</h1>
                </div>
            </div>

        </div>
    )
}
export default Footer;