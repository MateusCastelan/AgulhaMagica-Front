import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import styles from '@/styles/Form.module.css';

export const Form = ({ type, formTitle, formFields, buttonLabel, onSubmit }) => {
  // Initialize EditorState for textarea fields
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

  const getContainerClassName = (formType) => {
    return formType === 'Article' ? styles.cntArticle : styles.container;
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
      <article className={getContainerClassName(type)}>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <h1 className={styles.title}>{formTitle}</h1>
          {formFields.map((field) => (
            <section key={field.id} className={getSectionClassName(field)}>
              {field.type !== 'checkbox' &&
                field.type !== 'file' &&
                field.type !== 'textarea' && (
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
              {field.type === 'checkbox' && (
                <>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input type={field.type} id={field.name} name={field.name} />
                </>
              )}
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
                  <label htmlFor={field.name}>{field.label}</label>
                  <Editor
                    editorState={editorStates[field.name]}
                    onEditorStateChange={(editorState) =>
                      handleEditorChange(field.name, editorState)
                    }
                    wrapperClassName={styles.editorWrapper}
                    editorClassName={styles.editor}
                  />
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
