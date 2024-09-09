import {useEffect, React} from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';

import styles from '@/styles/NavBar.module.css';

export const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.headerContainer}>
      <section className={styles.logo}>
        <h1>KPOP</h1>
        <h1 id={styles.event}>EVENT</h1>
      </section>
      <section className={styles.navContainer}>
        <nav>
          <ul>
            <Link href="/">
              <li>Home</li>
            </Link>
            {user ? (
              <>
                {(
                  <Link href="/admin">
                    <li>Admin</li>
                  </Link>
                )}
                <li onClick={logout}>Logout</li>
              </>
            ) : (
              <Link href="/login">
                <li>Login</li>
              </Link>
            )}
          </ul>
        </nav>
      </section>
    </header>
  );
};
