import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/categories" className={styles.navLink}>
            Categories
          </Link>
          <Link href="/news" className={styles.navLink}>
            News
          </Link>
          <Link href="/recipes" className={styles.navLink}>
            Recipes
          </Link>
        </div>
        <div className={styles.profileIcon}>
          <Link href="/profile">
            <div className={styles.avatar}>
              <img src="/images/users/default-avatar.png" alt="Profile" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 