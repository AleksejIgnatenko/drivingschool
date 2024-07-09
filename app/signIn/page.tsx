import React from 'react';
import styles from './styles.module.css'; // Make sure the file path is correct
import { Inter } from "next/font/google";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  return (
    <body
      className={inter.className}
      style={{
        backgroundImage: "url('/images/SignInPage.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        margin: 0,
      }}
    >
      <div className={styles.inputContainer}>
        <div className={styles.container}>
        <h1>Login</h1>
        <div className={styles.txtBox}>
            <input type="text" placeholder="Username" />
            <i className='bx bx-user-circle'></i>
        </div>
        <div className={styles.txtBox}>
            <input type="password" placeholder="Password"/>
            <i className='bx bx-lock-alt'></i>
        </div>
        <div className={styles.RMF}>
            <input type="checkbox" className={styles.box} />
            <span className={styles.RM}>Remember me</span>
            <span className={styles.FP}>Forget Password</span>
        </div>
        <input type="button" value="Login" className={styles.buttonSignIn} />
        <Link href={"/"}>
            <input type="button" value="Back" className={styles.buttonBack} />
        </Link>
        
        <p>Don't have an account?
          <Link href={"/register"} className={styles.register}>Register</Link>
        </p>
        </div>
    </div>
    </body>
  );
}