import { React, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/BarraPesquisa.module.css';

export const BarraPesquisa = () => {
  const router = useRouter();
  const { keywords, difficulty, type } = router.query;

  // Inicializa os estados com os valores da URL, ou um valor vazio caso não exista
  const [searchKeywords, setKeywords] = useState(keywords || '');
  const [searchDifficulty, setDifficulty] = useState(difficulty || '');
  const [searchType, setType] = useState(type || '');
  
  // Estado para controlar se a página está sendo carregada pela primeira vez
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Dispara a busca somente quando qualquer filtro mudar
  useEffect(() => {
    // Verifica se a página está sendo carregada pela primeira vez
    if (isFirstLoad) {
      setIsFirstLoad(false); // Atualiza o estado para indicar que a página foi carregada
      return; // Não faz a busca na primeira carga
    }

    const query = new URLSearchParams();

    if (searchKeywords) query.append('keywords', searchKeywords);
    if (searchDifficulty) query.append('difficulty', searchDifficulty);
    if (searchType) query.append('type', searchType);

    // Atualiza a URL e faz a navegação, mas sem recarregar a página (shallow routing)
    router.push(`/search?${query.toString()}`, undefined, { shallow: true });
  }, [searchKeywords, searchDifficulty, searchType]); // Reage às mudanças nos filtros

  // Função chamada ao submeter o formulário (quando o usuário clicar no botão de pesquisa)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui podemos tratar a pesquisa manual se necessário, mas no caso estamos apenas gerenciando filtros
  };

  // Função para alterar o filtro de keywords e fazer a pesquisa automaticamente
  const handleKeywordChange = (e) => {
    setKeywords(e.target.value);
  };

  // Função para alterar o filtro de dificuldade e fazer a pesquisa automaticamente
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  // Função para alterar o filtro de categoria e fazer a pesquisa automaticamente
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className={styles.nav}>
      <select
          name="Dificuldade"
          value={searchDifficulty}
          onChange={handleDifficultyChange}
        >
          <option value="">Todas as Dificuldades</option>
          <option value="Iniciante">Iniciante</option>
          <option value="Intermediario">Intermediário</option>
          <option value="Avancado">Avançado</option>
        </select>
        <select
          name="Categoria"
          value={searchType}
          onChange={handleTypeChange}
        >
          <option value="">Todas as Categorias</option>
          <option value="Roupa">Roupa</option>
          <option value="Acessorio">Acessórios</option>
        </select>
      <form onSubmit={handleSubmit} className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchBar}
          name="keywords"
          placeholder="Pesquisar"
          value={searchKeywords}
          onChange={handleKeywordChange} 
        />
        <button type="submit" className={styles.searchBtn}>
          <img src="/lupa.svg" alt="Lupa" />
        </button>
      </form>
    </div>
  );
};
