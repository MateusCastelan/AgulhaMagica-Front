import React from 'react'
import styles from '@/styles/TutorialdePontos.module.css'

export const TutorialdePontos = () => {
    return(
        <main className={styles.main}>

            <h1>Pontos Básicos do Crochê</h1>
            <br></br>
            <p>Esses são os pontos básicos do crochê, com esses pontos você consegue a base para realizar qualquer peça e fazer pontos mais complexos, a maior parte dos pontos mais trabalhosos são uma mistura dos pontos básicos.</p>

            <section className={styles.tutoriais}>
                <article>
                    <h2>Correntinha</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/l1CszK40eGI?si=5_JReJP9iaodRc0k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </article>

                <article>
                    <h2>Ponto Baixo</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/OCLNjQJmuOg?si=SlIZhE7o9_hNvxlK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </article>

                <article>
                    <h2>Meio Ponto Alto / Ponto Médio</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/HFq1WZLplxY?si=9Q-Gci-ymTwHoP8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </article>

                <article>
                    <h2>Ponto Alto</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/8qzc54YIgrk?si=9Gg7Q057zDId7QVE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </article>

                <article>
                    <h2>Ponto Baixíssimo</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/vNKlqRBL2c8?si=8jNgKDsiQdCcShHk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </article>

            </section>

        </main>
    )
}