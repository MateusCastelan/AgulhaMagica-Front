import React from 'react'
import { AdminTable } from '@/components/AdminTable'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'

import styles from '@/styles/PagesMain.module.css'
import PrivateRoute from '@/components/PrivateRoute'

export default function Admin() {

  return (
    <>
      <NavBar/>
      <PrivateRoute>
        <main className={styles.adminContainer}>
          <AdminTable/>
        </main>
      </PrivateRoute>
      <Footer/>
    </>
  )
}
