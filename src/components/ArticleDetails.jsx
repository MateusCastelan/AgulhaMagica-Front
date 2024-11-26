import React, { useState } from 'react';
import styles from '@/styles/Receita.module.css';

export const ArticleDetails = ({ article }) => {
  return (
    <div className={styles.receita}>
      <Titulo titulo={article.article_title} />
      <div className={styles.section}>
        <Imagem imagem={article.article_image || '/bg.jpg'} />
        <Material 
          material={article.article_materials} 
          likedCount={article.article_liked_count}
          articleId={article._id}
        />
      </div>
      <ReceitaGeral 
        receita={article.article_body}
      />
      <Autor 
        author={article.article_author_name} 
        email={article.article_author_email} 
        publishedDate={article.article_published_date}
      />
    </div>
  );
};

const Titulo = ({ titulo }) => (
  <div className={styles.titulo}>
    <p>{titulo}</p>
  </div>
);

const Imagem = ({ imagem }) => (
  <div className={styles.imagemContainer}>
    <img
      src={imagem}
      alt="Imagem Artigo"
      className={styles.imagem}
    />
  </div>
);

const Material = ({ material, likedCount, articleId }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(likedCount);

  const handleLikeClick = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <div className={styles.material}>
      <h2>Materiais</h2>
      
      <div dangerouslySetInnerHTML={{ __html: material }} />
      <div className={styles.icones}>
        <button className={styles.likeButton} onClick={handleLikeClick}>
          {liked ? '❤️ Liked' : '🤍 Like'}
        </button>
        <span>{count}</span>
      </div>
    </div>
  );
};

const ReceitaGeral = ({ receita }) => (
  <div className={styles.receitaGeral}>
    <h2>Resumo</h2>
    <div dangerouslySetInnerHTML={{ __html: receita }} />
  </div>
);

const Autor = ({ author, email, publishedDate }) => (
  <div className={styles.autor}>
    <p>Autor: {author}</p>
    <p>Email: {email}</p>
    <p>Data Publicação: {publishedDate}</p>
  </div>
);
