import React, { useState, useEffect } from 'react';
import styles from '@/styles/Article.module.css';
import { LikeButton } from './LikeButton';
import { useAuth } from './AuthContext';
import axios from 'axios'

export const ArticleDetails = ({ article }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/session', { withCredentials: true });
        if (response.data.user) {
          const userId = response.data.user._id;
          const user = await axios.get(`http://localhost:8080/api/users/${userId}`);
          const likedArticles = user.data.foundUser.likedArticles;
          console.log(likedArticles)
          setIsLiked(likedArticles.includes(article._id));
        }
      } catch (error) {
        console.error('Erro ao verificar o status de like do usuário:', error.message);
      }
    };

    fetchUserStatus();
  }, [article._id]);

  
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
          {user? 
          <LikeButton articleId={article._id} isLiked={isLiked} /> :
          null
          }
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
