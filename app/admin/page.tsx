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
        <Link href={"/admin/category"}>
          <div className={styles.card}>
            <div className={styles.container}>
              <div className={styles.сontent}>
                <h1>Category</h1>
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