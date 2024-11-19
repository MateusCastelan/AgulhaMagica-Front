import React from 'react';
import { LikeButton } from './LikeButton';
import styles from '@/styles/Article.module.css';


export const ArticleDetails = ({ article }) => {
  return (
    <div className={styles.receita}>
      {/* Title Section */}
      <div className={styles.titulo}>
        <h1>{article.article_title}</h1>
      </div>

      {/* Image Section */}
      <div className={styles.imagemContainer}>
        <img
          src={article.article_image || '/bg.jpg'}
          alt={article.article_title}
          className={styles.imagem}
        />
      </div>

      {/* Article Body Section */}
      <div className={styles.receitaGeral}>
        <h2>Content</h2>
        <div
          dangerouslySetInnerHTML={{ __html: article.article_body }}
        />
        <h2>Published Date</h2>
        <p>{article.article_published_date}</p>
      </div>

      {/* Author Information Section */}
      <div className={styles.material}>
        <h2>Author</h2>
        <p>{article.article_author_name}</p>
        <h2>Email</h2>
        <p>{article.article_author_email}</p>
      </div>


      {/* Like Button Section */}
      <div className={styles.icones}>
        <LikeButton
          articleId={article._id}
          initialLikedCount={article.article_liked_count}
        />
      </div>
    </div>
  );
};
