
// export const PerfilUsuario = ({ usuario }) => {
//   return (
//     <div className={styles.perfil}>
//       <Titulo nome={usuario.nome} />
//       <div className={styles.section}>
//         <Imagem fotoPerfil={usuario.fotoPerfil || '/foto-padrao.jpg'} />
//         <Biografia biografia={usuario.biografia} />
//       </div>
//       <DetalhesPessoais usuario={usuario} />
//       <ItensSalvos itens={usuario.itensSalvos} />
//     </div>
//   );
// };

import React from 'react';
import styles from '@/styles/Perfil.module.css';

const usuarioExemplo = {
  nome: "João Silva",
  fotoPerfil: "/Imagem-exemplo.png",
  biografia: "Apaixonado por tecnologia e design, sempre em busca de novos desafios.",
  nomeCompleto: "João Carlos da Silva",
  endereco: "Rua das Flores, 456, São Paulo, SP, Brasil",
  email: "joao.silva@example.com",
  instagram: "@joaosilva",
  ocupacao: "Desenvolvedor Full Stack",
  pinterest: "pinterest.com/joaosilva",
  itensSalvos: [
    {
      imagem: "/Imagem-exemplo.png",
      titulo: "Curso de React (Intermediário)"
    }
  ]
};

const PerfilUsuario = () => {
  const usuario = usuarioExemplo;

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilEsquerda}>
        <Titulo nome={usuario.nome} fotoPerfil={usuario.fotoPerfil} biografia={usuario.biografia} />
        <button className={styles.botaoSair}>Sair</button>
      </div>
      <div className={styles.perfilDireita}>
        <DetalhesPessoais usuario={usuario} />
        <ItensSalvos itens={usuario.itensSalvos} />
      </div>
      
    </div>
  );
};

const Titulo = ({ nome, fotoPerfil, biografia }) => (
  <div className={styles.tituloContainer}>
    <img
      src={fotoPerfil}
      alt="Foto de Perfil"
      className={styles.imagemTitulo}
    />
    <div>
      <p className={styles.nome}>{nome}</p>
      <p className={styles.biografia}>{biografia}</p>
    </div>
  </div>
);

const DetalhesPessoais = ({ usuario }) => (
  <section className={styles.detalhesSection}>
    <div className={styles.dadosPessoais}>
      <p>Dados Pessoais</p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label>Nome Completo</label>
          <button className={styles.caixaTexto}>{usuario.nomeCompleto}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Endereço</label>
          <button className={styles.caixaTexto}>{usuario.endereco}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>E-mail</label>
          <button className={styles.caixaTexto}>{usuario.email}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Instagram</label>
          <button className={styles.caixaTexto}>{usuario.instagram}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Ocupação</label>
          <button className={styles.caixaTexto}>{usuario.ocupacao}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Pinterest</label>
          <button className={styles.caixaTexto}>{usuario.pinterest}</button>
        </div>
      </div>
    </div>
  </section>
);

const ItensSalvos = ({ itens }) => (
  <section className={styles.salvos}>
    <p>Salvos</p>
    <div className={styles.itensContainer}>
      {itens.map((item) => (
        <a key={item._id} href={`#`}>
          <section className={styles.card}>

            <section className={styles.imageContainer}>
              <img src={item.imagem || '/bg.jpg'} alt="Imagem do Item" />
            </section>

            <article className={styles.cardInfo}>
              <span className={styles.tag}>{item.dificuldade}</span>
              <h3>{item.titulo}</h3>
            </article>

          </section>
        </a>
      ))}
    </div>
  </section>
);

export default PerfilUsuario;



