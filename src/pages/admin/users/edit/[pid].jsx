import { Footer } from '@/components/Footer';
import { Form } from '@/components/Form';
import { NavBar } from '@/components/NavBar';
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';

export default function EditUser({ user }) {

  const router = useRouter();

  const formFields = [
    { id: 1, name: 'author_name', type: 'text', label: 'Nome:', defaultValue: user.author_name, required: true },
    { id: 2, name: 'author_email', type: 'email', label: 'Email:', defaultValue: user.author_email, required: true },
    { id: 3, name: 'author_user', type: 'text', label: 'Nome de Usuário:', defaultValue: user.author_user, required: true },
    { id: 4, name: 'author_pwd', type: 'password', label: 'Nova Senha:' }, // Optional for updating
    { id: 5, name: 'author_address', type: 'text', label: 'Endereço:', defaultValue: user.author_address },
    { id: 6, name: 'author_instagram', type: 'text', label: '@ Instagram:', defaultValue: user.author_instagram },
    { id: 7, name: 'author_pinterest', type: 'text', label: 'Pinterest:', defaultValue: user.author_pinterest },
    { id: 8, name: 'author_occupation', type: 'text', label: 'Ocupação:', defaultValue: user.author_occupation },
    { id: 9, name: 'author_bio', type: 'text', label: 'Biografia:', defaultValue: user.author_bio },
    { id: 10, name: 'author_pic', type: 'text', label: 'Link Foto de Perfil:', defaultValue: user.author_pic },
    { id: 11, name: 'author_level', type: 'checkbox', label: 'Admin', checked: user.author_level === 'admin' },
    { id: 12, name: 'author_status', type: 'checkbox', label: 'Ativo', checked: user.author_status },
  ];

  const initialFormData = {
    author_name: user.author_name,
    author_email: user.author_email,
    author_user: user.author_user,
    author_pwd: '',
    author_address: user.author_address,
    author_instagram: user.author_instagram,
    author_pinterest: user.author_pinterest,
    author_occupation: user.author_occupation,
    author_bio: user.author_bio,
    author_pic: user.author_pic,
    author_level: user.author_level,
    author_status: user.author_status,
  };

  const handleUpdateUser = async (formData) => {
    try {
      formData.author_level = formData.author_level ? 'admin' : 'user';
      formData.author_status = formData.author_status || false;
  
      const response = await axios.put(`http://localhost:8080/api/users/${user._id}`, formData, {
        withCredentials: true,
      });
  
      console.log(response.data);
      router.push(`/`);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Form
        type={"User"}
        formTitle={`Editar Usuário: ${user.author_name}`}
        formFields={formFields}
        buttonLabel="Atualizar Usuário"
        onSubmit={handleUpdateUser}
        initialFormData={initialFormData}
      />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(`http://localhost:8080/api/users/${params.pid}`);
    const user = response.data.foundUser;
    return { props: { user } };
  } catch (error) {
    console.error('Erro ao obter detalhes do usuário:', error.message);
    return { notFound: true };
  }
}
