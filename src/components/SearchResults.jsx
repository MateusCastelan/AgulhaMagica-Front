import { React, useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

import styles from '@/styles/ArticleHome.module.css';

export const SearchResults = ({ keywords, difficulty, type }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const params = new URLSearchParams();
        if (keywords) params.append('keywords', keywords); 
        if (difficulty) params.append('difficulty', difficulty);
        if (type) params.append('type', type);

        const response = await axios.get(`http://localhost:8080/api/articles/search?${params.toString()}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Erro ao buscar resultados da pesquisa:', error.message);
      }
    };

    fetchSearchResults();
  }, [keywords, difficulty, type]);

  return (
    <section className={styles.container}>
      <article className={styles.subTitle}>
        <h2>Resultados da Pesquisa</h2>
      </article>
      <section className={styles.groupContainer}>
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <Link key={result._id} href={`admin/articles/read/${result._id}`}>
              <section className={styles.card}>
                <section className={styles.imageContainer}>
                  <img src={result.article_img || '/bg.jpg'} alt="Imagem da Receita" />
                </section>
                <article className={styles.cardInfo}>
                  <span className={styles.tag}>{result.article_difficulty}</span>
                  <h3>{result.article_title}</h3>
                  <button>&gt;</button>
                </article>
              </section>
            </Link>
          ))
        ) : (
          <p>Nenhum resultado encontrado para os filtros aplicados.</p>
        )}
      </section>
    </section>
  );
};
