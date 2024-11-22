import {React, useState} from 'react'
import { useRouter } from 'next/router';

import styles from '@/styles/BarraPesquisa.module.css'

export const BarraPesquisa = () => {
  const router = useRouter();
  const [keywords, setKeywords] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault();
    const keywords = event.target.elements.keywords.value;

    router.push(`/search?keywords=${encodeURIComponent(keywords)}`);
  };

  return (
    <>
      <div className={styles.nav}>
        <select name='Dificuldade'>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
        </select>

        <select name='Categoria'>
          <option value="Roupa">Roupa</option>
          <option value="Acessórios">Acessórios</option>
        </select>

        <form 
          action="/search" 
          method="get" 
          onSubmit={handleSubmit}
          className={styles.searchContainer} 
        >
          <input type="text" className={styles.searchBar} name="keywords" placeholder="Pesquisar" value = {keywords} onChange={(e) => setKeywords(e.target.value)} />
          <button type="submit" className={styles.searchBtn}>
            <img src='/lupa.svg' alt="Lupa" />
          </button>
        </form>
      </div>
    </>
  );
};