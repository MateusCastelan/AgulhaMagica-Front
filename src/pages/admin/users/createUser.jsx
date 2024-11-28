import { Footer } from '@/components/Footer'
import { Form } from '@/components/Form'
import { NavBar } from '@/components/NavBar'
import { useRouter } from 'next/router';
import PrivateRoute from '@/components/PrivateRoute'
import axios from 'axios';
import React from 'react'


export default function CreateUser() {
  const router = useRouter();

  const formFields = [
    { 
      id: 1, 
      name: 'author_name', 
      type: 'text', 
      label: 'Nome:', 
      required: true 
    },
    { 
      id: 2, 
      name: 'author_email',
      type: 'email', 
      label: 'Email:', 
      required: true 
    },
    { 
      id: 3, 
      name: 'author_user', 
      type: 'text', 
      label: 'Nome de Usuário:', 
      required: true 
    },
    { 
      id: 4, 
      name: 'author_pwd', 
      type: 'password', 
      label: 'Senha:', 
      required: true 
    },
    { 
      id: 5, 
      name: 'author_address', 
      type: 'text', 
      label: 'Endereço:', 
    },
    { 
      id: 6, 
      name: 'author_instagram', 
      type: 'text', 
      label: '@ Instagram:', 
    },
    { 
      id: 7, 
      name: 'author_occupation', 
      type: 'text', 
      label: 'Ocupação:', 
    },
    { 
      id: 7, 
      name: 'author_pinterest', 
      type: 'text', 
      label: 'Pinterest:', 
    },
    { 
      id: 8, 
      name: 'author_bio', 
      type: 'textarea', 
      label: 'Biografia:', 
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      formData.author_level = formData.author_level = 'user';
      formData.author_status = formData.author_status = true;

      const response = await axios.post("http://localhost:8080/api/users/cadastro", formData);

      console.log(response.data);
      router.push(`/`);

    } catch (error) {
      console.error('Erro:', error.message);
    }
  };

  return (
    <>
        <NavBar />
        <Form
          type={"User"}
          formTitle="Cadastro de Usuário"
          formFields={formFields}
          buttonLabel="Cadastrar"
          onSubmit={handleSubmit}
        />
        <Footer />
    </>
  )
}
