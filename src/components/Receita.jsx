import React from 'react';
import styles from '@/styles/Receita.module.css';

export const Receita = () =>{
  return (
    <div className={styles.receita}>
      <div className={styles.estrutura}>
        <Titulo titulo="Suéter Verde"/>
        <Imagem imagem="/Imagem-exemplo.png"/>
        <Material material="tal tal tal"/>
      </div>
      <ReceitaGeral geral="" />
    </div>
  );
}


function Titulo({titulo}){
  return(
    <div className={styles.titulo}>
      <h1>{titulo}</h1>
    </div>
  )
}

function Imagem({imagem}) {
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
  return (
    <div className={styles.material}>
      <h2>MATERIAIS</h2>
      <p>{material}</p>
      <div className={styles.icones}>
        <span>❤</span>
      </div>
    </div>
  );
}

function ReceitaGeral({geral}) {
  return (
    <div className={styles.receitaGeral}>
      <h2>Execução</h2>
      <p>{geral}</p>
    </div>
  );
}


   