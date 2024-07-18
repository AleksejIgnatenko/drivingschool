'use client';

import styles from './styles.module.css'; // Убедитесь, что путь к файлу указан правильно

export default function Login() {

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.firstRow}>
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