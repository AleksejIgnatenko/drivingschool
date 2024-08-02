'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { RegisterUserModelRequest } from "@/app/Models/UserModel/RegisterUserModelRequest";
import { registerUserAsync } from '../services/userServices/registerUserAsync';

const inter = Inter({ subsets: ['latin'] });

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const registerUserRequest: RegisterUserModelRequest = {
      userName,
      email,
      password,
    };
    await registerUserAsync(registerUserRequest);
  };

  return (
    <div
      className={inter.className}
      style={{
        backgroundImage: "url('/images/Night.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        margin: 0,
      }}
    >
      <div className={styles.inputContainer}>
        <div className={styles.container}>
          <h1>Register</h1>
          <div className={styles.txtBox}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <i className='bx bx-user-circle'></i>
          </div>
          <div className={styles.txtBox}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className='bx bx-user-circle'></i>
          </div>
          <div className={styles.txtBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className='bx bx-lock-alt'></i>
          </div>
          <div className={styles.txtBox}>
            <input type="password" placeholder="Repeat password" />
            <i className='bx bx-lock-alt'></i>
          </div>
          <input type="button" value="Register" className={styles.buttonSignIn} onClick={handleRegister} />
          <Link href={"/"}>
            <input type="button" value="Back" className={styles.buttonBack} />
          </Link>
          <p>
            Already have an account?
            <Link href={"/login"} className={styles.register}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}