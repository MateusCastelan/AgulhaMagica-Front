import React, { useState, useEffect } from 'react';
import styles from '@/styles/Perfil.module.css';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Link from 'next/link';

const PerfilUsuario = () => {
  const { user,  logout  } = useAuth();
  const [likedArticles, setLikedArticles] = useState([]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/session', { withCredentials: true });
        if (response.data.user) {
          const userId = response.data.user._id;
          const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`);
          const likedArticleIds = userResponse.data.foundUser.likedArticles;

          if (likedArticleIds.length > 0) {
            const articlesResponse = await Promise.all(
              likedArticleIds.map(id => axios.get(`http://localhost:8080/api/articles/${id}`))
            );
            setLikedArticles(articlesResponse.map(res => res.data.foundArticle));
          }
        }
      } catch (error) {
        console.error('Error fetching liked articles:', error);
      }
    };

    fetchLikedArticles();
  }, []);

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.perfilEsquerda}>
        <Titulo 
          nome={user?.author_name || "Nome do Usuário"} 
          fotoPerfil={user?.author_pic || '/default-profile.jpg'} 
          biografia={user?.author_bio || "Biografia não disponível"} 
        />
          <button 
          className={styles.botaoSair} 
          onClick={logout}>
          Sair
        </button>
      </div>
      <div className={styles.perfilDireita}>
        <DetalhesPessoais user={user} />
        <ItensSalvos itens={likedArticles} />
      </div>
    </div>
  );
};

// Subcomponents
const Titulo = ({ nome, fotoPerfil, biografia }) => (
  <div className={styles.tituloContainer}>
    <img
      src={fotoPerfil}
      alt="Foto de Perfil"
      className={styles.imagemTitulo}
    />
    <div>
      <p className={styles.nome}>{nome}</p>
      <p
        className={styles.biografia}
        dangerouslySetInnerHTML={{ __html: biografia }}
      ></p>
    </div>
  </div>
);

const DetalhesPessoais = ({ user }) => (
  <section className={styles.detalhesSection}>
    <div className={styles.dadosPessoais}>
      <p>Dados Pessoais</p>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label>Nome Completo</label>
          <button className={styles.caixaTexto}>{user?.author_name || null}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Endereço</label>
          <button className={styles.caixaTexto}>{user?.author_address || null}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>E-mail</label>
          <button className={styles.caixaTexto}>{user?.author_email || null}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Instagram</label>
          <button className={styles.caixaTexto}>{user?.author_instagram || null}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Ocupação</label>
          <button className={styles.caixaTexto}>{user?.author_occupation || null}</button>
        </div>
        <div className={styles.inputGroup}>
          <label>Pinterest</label>
          <button className={styles.caixaTexto}>{user?.author_pinterest || null}</button>
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
        <Link key={item._id} href={`admin/articles/read/${item._id}`}>
        <section className={styles.card}>
          <section className={styles.imageContainer}>
            <img src={item.article_img || '/bg.jpg'} alt="Imagem da Receita" />
          </section>
          <article className={styles.cardInfo}>
            <span className={styles.tag}>{item.article_difficulty}</span>
            <h3>{item.article_title}</h3>
            <button>&gt;</button>
          </article>
        </section>
      </Link>
      ))}
    </div>
  </section>
);

export default PerfilUsuario;
