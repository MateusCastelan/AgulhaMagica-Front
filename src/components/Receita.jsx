import React, { useState } from 'react';
import styles from '@/styles/Receita.module.css';

export const Receita = () => {
  return (
    <>
    <div className={styles.receita}>
      <Titulo titulo="Suéter Verde"/>
      <div className={styles.section}>
        <Imagem imagem="/Imagem-exemplo.png"/>
        <Material material="2 novelos de Fofura – Cor: 5741 (Clorofila) Agulha para tricô Círculo – nº 6.0 mm" />
      </div>
      <ReceitaGeral receita="Pontos utilizados: Barra 1/1: 1 m., 1 t., 1 m. Ponto tricô: tric. todas as carr. em m., ou t.
      Ponto fantasia: siga o gráfico.
      Amostra – Um quadrado de 10 cm em p. fantasia seguindo o gráfico nas ag. nº 6,0mm = 21 p. x 23 carr.
      Tamanho: 1 ano"/>
      <Autor autor="Gorete Andrade - circulo"/>
    </div>
    </>
  );
}

function Titulo({titulo}){
  return(
    <div className={styles.titulo}>
      <p>{titulo}</p>
    </div>
  )
}


function Imagem({ imagem }) {
  return (
    <div className={styles.imagemContainer}>
      <img
        src={imagem}
        alt="Imagem Receita"
        className={styles.imagem}
      />
    </div>
  );
}

function Material({material}) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.material}>
      <h2>MATERIAIS</h2>
      <p>{material}</p>
      <div className={styles.icones}>
        <button className={styles.likeButton} onClick={handleLikeClick}>
          {liked ? '❤️ Liked' : '🤍 Like'}
        </button>
      </div>
    </div>
  );
}

function ReceitaGeral({receita}) {
  return (
    <div className={styles.receitaGeral}>
      <h2>EXECUÇÃO</h2>
      <br></br>
      <p>{receita}</p>
    </div>
  );
}

function Autor({autor}){
  return (
    <p className={styles.autor}>Autor: {autor}</p>
  )
}