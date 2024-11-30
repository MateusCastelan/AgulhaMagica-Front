import { useRouter } from 'next/router';
import { Footer } from '@/components/Footer';
import { Form } from '@/components/Form';
import { NavBar } from '@/components/NavBar';
import axios from 'axios';

export default function EditArticle({ article }) {
  const router = useRouter();
  const { pid } = router.query;

  const formFields = [
    { 
      id: 1, 
      name: 'article_title', 
      type: 'text', 
      label: 'Título:', 
      defaultValue: article.article_title, 
      required: true 
    },
    { 
      id: 2, 
      name: 'article_summary', 
      type: 'text', 
      label: 'Resumo:', 
      defaultValue: article.article_summary, 
      required: true 
    },
    { 
      id: 3, 
      name: 'article_keywords', 
      type: 'text', 
      label: 'Palavras-chave:', 
      defaultValue: article.article_keywords, 
      required: true 
    },
    { 
      id: 4, 
      name: 'article_materials', 
      type: 'textarea', 
      label: 'Materiais:', 
      defaultValue: article.article_materials, 
      required: true 
    },
    { 
      id: 5, 
      name: 'article_body', 
      type: 'textarea', 
      label: 'Execução:', 
      defaultValue: article.article_body, 
      required: true 
    },
    { 
      id: 6, 
      name: 'article_img', 
      type: 'text', 
      label: 'URL da imagem:', 
      defaultValue: article.article_img 
    },
    { 
      id: 7, 
      name: 'article_author_email', 
      type: 'hidden', 
      defaultValue: article.article_author_email 
    },
    { 
      id: 8, 
      name: 'article_author_id', 
      type: 'hidden', 
      defaultValue: article.article_author_id 
    },
    { 
      id: 9, 
      name: 'article_author_name', 
      type: 'hidden', 
      defaultValue: article.article_author_name 
    },
    { 
      id: 10, 
      name: 'article_real_author_name', 
      label: 'Nome do Autor(a):', 
      type: 'text',
      defaultValue: article.article_real_author_name,
      required: true 
    },
    { 
      id: 11, 
      name: 'article_fonte', 
      label: 'URL da Fonte:', 
      type: 'text',
      defaultValue: article.article_fonte,
      required: true 
    },
    { 
      id: 12, 
      name: 'article_difficulty', 
      type: 'select',
      label: 'Dificuldade:', 
      options: [ 
        { value: 'iniciante', label: 'Iniciante' },
        { value: 'intermediario', label: 'Intermediário' },
        { value: 'avancado', label: 'Avançado' }
      ],
      defaultValue: article.article_difficulty,
      required: true 
    },
    { 
      id: 13, 
      name: 'article_type', 
      type: 'select', 
      label: 'Tipo:', 
      options: [ 
        { value: 'roupa', label: 'Roupa' },
        { value: 'acessorio', label: 'Acessório' }
      ],
      defaultValue: article.article_type,
      required: true 
    }
  ];

  const handleUpdateArticle = async (formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/articles/${pid}`, formData, { withCredentials: true });
      console.log(response.data);
      router.push(`/`);
    } catch (error) {
      console.error('Erro ao atualizar o artigo:', error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Form
        type={"Article"}
        formTitle={`Atualizar Artigo: ${article.article_title}`}
        formFields={formFields}
        buttonLabel="Atualizar Artigo"
        onSubmit={handleUpdateArticle}
      />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`http://localhost:8080/api/articles/${params.pid}`);
    const article = response.data.foundArticle;
    return { props: { article } };
  } catch (error) {
    console.error('Erro ao obter detalhes do artigo:', error.message);
    return { notFound: true };
  }
}
