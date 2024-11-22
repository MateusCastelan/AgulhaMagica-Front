import React from 'react'
import Link from 'next/link';

import styles from '@/styles/ArticleHome.module.css';

export const FeaturedArticles = ({ articles }) => {
  return (
    <section className={styles.cardContainer}>
      <section className={styles.groupContainer}>
        {articles.map((article) => (
          article.article_featured && (
            <Link key={article._id} href={`admin/articles/read/${article._id}`}>
              <section className={styles.card}>

                <section className={styles.imageContainer}>
                  <img src={article.kb_image || '/bg.jpg'} alt="Imagem da Receita" />
                </section>

                <article className={styles.cardInfo}>

                  <span className={styles.tag}>{article.article_difficulty}</span>
                  <h3>{article.article_title}</h3>
                  <button>&gt;</button>

                </article>
              </section>

            </Link>
          )
        ))}
      </section>
    </section>

  );
}