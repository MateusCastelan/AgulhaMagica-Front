import React, { useState } from "react"
import styles from '@/styles/Contador.module.css'

export const Contador = () => {

    const [contador, setContador] = useState(0)

    const contarNum = () => {
        setContador(contador + 1)
    }

    const descontarNum = () => {
        setContador(contador - 1)
    }

    const restaurar = () => {
        setContador(0)
    }


    return (

        <div className={styles.main}> 
            <h1 className={styles.titulo}>Contador de Carreiras</h1>

            <section className={styles.section}>
                <div className={styles.imagem}>
                    <img src="/Mulher.png" alt="" />
                </div>

                <section className={styles.section2}>
                <div className={styles.counter}>
                    <button className='remover' onClick={descontarNum}>-</button>
                    <p id="Numero">{contador}</p>
                    <button className='adicionar' onClick={contarNum}>+</button>
                </div>

                <div className={styles.resetar}>
                    <button className="reset" onClick={restaurar}>Reset</button>
                </div>
                </section>

            </section>

            
        </div>
    );

};