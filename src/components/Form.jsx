import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';

import styles from '@/styles/Form.module.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export const Form = ({ type, formTitle, formFields, buttonLabel, onSubmit }) => {
  const [editorStates, setEditorStates] = useState(
    formFields.reduce((acc, field) => {
      if (field.type === 'textarea') {
        acc[field.name] = EditorState.createEmpty();
      }
      return acc;
    }, {})
  );

  const handleEditorChange = (fieldName, editorState) => {
    setEditorStates((prev) => ({
      ...prev,
      [fieldName]: editorState,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {};
    formFields.forEach((field) => {
      if (field.type === 'checkbox') {
        formData[field.name] = e.target[field.name].checked;
      } else if (field.type === 'textarea') {
        const contentState = editorStates[field.name].getCurrentContent();
        formData[field.name] = draftToHtml(convertToRaw(contentState));
      } else {
        const inputElement = e.target[field.name];
        if (inputElement) {
          formData[field.name] = inputElement.value;
        }
      }
    });

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const getMainContainerClassName = (formType) => {
    return formType === 'Article' ? styles.mainCtnArticle : styles.mainContainer;
  };

  const getSectionClassName = (field) => {
    if (field.type === 'checkbox') {
      return styles.check;
    } else if (field.type === 'textarea') {
      return styles.contentText;
    } else if (field.type === 'file') {
      return styles.file;
    } else if (field.type === 'hidden') {
      return styles.hidden;
    } else {
      return styles.inputBox;
    }
  };

  const getLabelClassName = (field, formTitle) => {
    return field.type === 'email' && formTitle !== 'Cadastro de Usuário' ? styles.emailInput : '';
  };

  return (
    <section className={getMainContainerClassName(type)}>
      <article className={styles.container}>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <h1 className={styles.title}>{formTitle}</h1>
          {formFields.map((field) => (
            <section key={field.id} className={getSectionClassName(field)}>
              {/* Text, Hidden, Email, etc. */}
              {field.type !== 'checkbox' &&
                field.type !== 'file' &&
                field.type !== 'textarea' &&
                field.type !== 'select' && (
                  <>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      defaultValue={field.defaultValue}
                      required={field.required}
                      readOnly={field.readOnly}
                    />
                    <label
                      htmlFor={field.name}
                      className={getLabelClassName(field, formTitle)}
                    >
                      {field.label}
                    </label>
                  </>
                )}

              {/* Checkbox */}
              {field.type === 'checkbox' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input type={field.type} id={field.name} name={field.name} />
                </>
              )}

              {/* File Upload */}
              {field.type === 'file' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    accept="image/*"
                  />
                </>
              )}

              {field.type === 'textarea' && (
                <>
                  <div className={styles.editorContainer}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <Editor
                      editorState={editorStates[field.name]}
                      onEditorStateChange={(editorState) =>
                        handleEditorChange(field.name, editorState)
                      }
                      wrapperClassName={styles.editorWrapper}
                      editorClassName={styles.editor}
                    />
                  </div>
                </>
              )}
              {field.type === 'select' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>
                      Selecione uma opção
                    </option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </section>
          ))}
          <button type="submit" className={styles.btn}>
            {buttonLabel}
          </button>
        </form>
      </article>
    </section>
  );
};
