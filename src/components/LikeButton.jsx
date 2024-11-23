import { useState } from 'react';
import axios from 'axios';

import styles from '@/styles/Article.module.css';

export const LikeButton = ({ articleId, initialLikedCount }) => {
  // const [likedCount, setLikedCount] = useState(initialLikedCount);

  // const handleLike = async () => {
  //   try {
  //     const response = await axios.post(`http://localhost:8080/api/articles/like/${articleId}`);
  //     const updatedArticle = response.data.updatedArticle;
  //     setLikedCount(updatedArticle.article_liked_count);
  //   } catch (error) {
  //     console.error('Erro ao adicionar like:', error.message);
  //   }
  // };

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <>
     <div className={styles.icones}>
        <button className={styles.likeButton} onClick={handleLikeClick}>
          {liked ? '❤️ Liked' : '🤍 Like'}
        </button>
      </div>
    </>
  );
};
