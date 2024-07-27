'use client';

import styles from './styles.module.css';
import Link from "next/link";

export default function Login() {

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.firstRow}>
        <Link href={"/admin/users"}>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.сontent}>
                <h1>Users</h1>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/admin/categories"}>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.сontent}>
                <h1>Categories</h1>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/admin/tests"}>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.сontent}>
                <h1>Tests</h1>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.card}>
          <div className={styles.container}>
            <div className={styles.сontent}>
              <h1>Users</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.card}>
          <div className={styles.container}>
            <div className={styles.сontent}>
              <h1>Admin</h1>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.container}>
            <div className={styles.сontent}>
              <h1>Admin</h1>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.container}>
            <div className={styles.сontent}>
              <h1>Admin</h1>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}