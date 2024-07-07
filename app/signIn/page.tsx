import React from 'react';
import styles from './styles.module.css'; // Make sure the file path is correct

export default function LoginForm() {
  return (
    <div className={styles.inputContainer}>
        <div className={styles.container}>
        <h1>Login</h1>
        <div className={styles.txtBox}>
            <input type="text" placeholder="   Username" />
            <i className='bx bx-user-circle'></i>
        </div>
        <div className={styles.txtBox}>
            <input type="text" placeholder="   Password" />
            <i className='bx bx-lock-alt'></i>
        </div>
        <div className={styles.RMF}>
            <input type="checkbox" className={styles.box} />
            <span className={styles.RM}>Remember me</span>
            <span className={styles.FP}>Forget Password</span>
        </div>
        <input type="button" value="Login" className={styles.login} />
        <p>Don't have an account?<span className={styles.register}> Register</span></p>
        </div>
    </div>
  );
}