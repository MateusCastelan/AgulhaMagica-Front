import {useEffect, React} from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';

import styles from '@/styles/NavBar.module.css';

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.headerContainer}>
      <section className={styles.logo}>
        <a href="/"><img src='/Logo.png' alt='logo'></img></a>
      </section>
      <section className={styles.navContainer}>
        <nav>
          <ul>
            <Link href="/">
              <li>Receitas</li>
            </Link>
            <Link href="/tutorialpontos">
              <li>Tutorial de Pontos</li>
            </Link>
            <Link href="/contador">
              <li>Contador</li>
            </Link>

            {user ?(
              <>
                <Link href="/perfil">
                  <li>Perfil</li>
                </Link>
                <li onClick={logout}>Logout</li>
              </>
            ) : (
              <Link href="/login">
                <li>Login</li>
              </Link>
            )}

            {user && user.author_level === 'admin' ?  (
              <>
                {(
                  <Link href="/admin">
                    <li>Admin</li>
                  </Link>
                )}
                <li onClick={logout}>Logout</li>
              </>
            ) : (
              null
            )}

          </ul>
        </nav>
      </section>
    </header>
  );
};