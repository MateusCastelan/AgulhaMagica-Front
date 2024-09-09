import React from 'react'

import styles from '@/styles/Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <section>
        <i className='bx bxl-twitter bx-md'></i>
        <i className='bx bxl-instagram bx-md'></i>
        <i className='bx bxl-youtube bx-md'></i>
      </section>
      <p>Todos os direitos reservados © 2023</p>
    </footer>
  )
}
