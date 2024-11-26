import { Footer } from '@/components/Footer'
import { Form } from '@/components/Form'
import { NavBar } from '@/components/NavBar'
import { useAuth } from '@/components/AuthContext'
import PrivateRoute from '@/components/PrivateRoute'
import { useRouter } from 'next/router';
import axios from 'axios';
import React from 'react'


export default function CreateArticle() {
  const { user } = useAuth();
  const router = useRouter();

  const formFields = [
    { 
      id: 1, 
      name: 'article_title', 
      type: 'text', 
      label: 'Título:', 
      required: true 
    },
    { 
      id: 2, 
      name: 'article_summary', 
      type: 'text', 
      label: 'Resumo:', 
      required: true 
    },
    { 
      id: 3, 
      name: 'article_keywords', 
      type: 'text', 
      label: 'Palavras-chave:', 
      required: true 
    },
    { 
      id: 4, 
      name: 'article_materials', 
      type: 'textarea', 
      label: 'Materiais:', 
      required: true 
    },
    { 
      id: 5, 
      name: 'article_body', 
      type: 'textarea', 
      label: 'Execução:', 
      required: true 
    },
    { 
      id: 6, 
      name: 'article_img', 
      type: 'text', 
      label: 'URL da imagem:', 
      // required: true 
    },
    { 
      id: 7, 
      name: 'article_author_email', 
      type: 'hidden', 
      defaultValue: user ? user.author_email : '' 
    },
    { 
      id: 8, 
      name: 'article_author_id', 
      type: 'hidden', 
      defaultValue: user ? user._id : '' 
    },
    { 
      id: 9, 
      name: 'article_author_name', 
      type: 'hidden', 
      defaultValue: user ? user.author_name : '' 
    },
    { 
      id: 10, 
      name: 'article_real_author_name', 
      label: 'Nome do Autor(a):', 
      type: 'text',
      required: true 
    },
    { 
      id: 11, 
      name: 'article_fonte', 
      label: 'URL da Fonte:', 
      type: 'text',
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
      required: true 
    }
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/articles/cadastro", formData);
      
      console.log(response.data);
      router.push(`/`);
    } catch (error) {
      console.error('Erro ao cadastrar artigo:', error.message);
    }
  };

  return (
    <>
      <PrivateRoute>
        <NavBar />
        <Form
          type={"Article"}
          formTitle="Cadastro de Receitas"
          formFields={formFields}
          buttonLabel="Cadastrar"
          onSubmit={handleSubmit}
        />
        <Footer />
      </PrivateRoute>
    </>
  )
}
