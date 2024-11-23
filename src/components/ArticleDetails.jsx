import React from 'react';
import { LikeButton } from './LikeButton';
import styles from '@/styles/Article.module.css';


export const ArticleDetails = ({ article }) => {
  return (
    <div className={styles.receita}>
      {/* Title Section */}
      <div className={styles.titulo}>
        <p>{article.article_title}</p>
      </div>


      <div className={styles.imgMaterialContainer}>
        {/* Image Section */}
        <div className={styles.imagemContainer}>
          <img
            src={article.article_img || '/bg.jpg'}
            alt={article.article_title}
            className={styles.imagem}
          />
        </div>

        {/* Article Materials Section */}
        <div className={styles.material}>
          <h2>Materiais</h2>
          <div
            dangerouslySetInnerHTML={{ __html: article.article_materials }}
          />
          <LikeButton
            articleId={article._id}
            initialLikedCount={article.article_liked_count}
          />
        </div>
      </div>

      {/* Article Body Section */}
      <div className={styles.receitaGeral}>
        <h2>Execução</h2>
        <br></br>
        <div
          dangerouslySetInnerHTML={{ __html: article.article_body }}
        />
      </div>
      
      {/* Author Information Section */}
      <div className={styles.autor}>
        <div>
          <p className={styles.dataTitle}>Autor(a)</p>
          <p>{article.article_real_author_name}</p>
        </div>
        <div>
          <p className={styles.dataTitle}>Fonte</p>
          <a href={article.article_fonte}>Clique Aqui!</a>
        </div>
        <div>
          <p className={styles.dataTitle}>Data de Publicação</p>
          <p>{new Date(article.article_published_date).toLocaleDateString()}</p>
        </div>
      </div>

    </div>
  );
};
