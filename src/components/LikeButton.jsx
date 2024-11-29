import { useState } from 'react';
import axios from 'axios';

import styles from '@/styles/Article.module.css';

export const LikeButton = ({ articleId, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = async () => {
    try {
      if (!liked) {
        await axios.post(`http://localhost:8080/api/users/likeArticle/${articleId}`,{}, { withCredentials: true });
      } else {
        await axios.post(`http://localhost:8080/api/users/unlikeArticle/${articleId}`,{}, { withCredentials: true });
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Erro ao atualizar like:', error.message);
    }
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
