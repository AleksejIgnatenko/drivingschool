'use client';

import styles from './styles.module.css'; // Make sure the file path is correct
import { Inter } from "next/font/google";
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import { LoginUserModelRequests } from '../services/userServices/loginUser';
import { loginUser } from '../services/userServices/loginUser';
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ['latin'] });

export default function Login() {
  const [cookieChecked, setCookieChecked] = useState(false);
  const hasBeenCalledRef = useRef(false);

  useEffect(() => {
    // Проверяем наличие файла cookie с именем 'jwtToken'
    if (!hasBeenCalledRef.current) {
      hasBeenCalledRef.current = true;
      if (!cookieChecked) {
        const jwtToken = Cookies.get('jwtToken');
        if (jwtToken) {
          // Если файл cookie есть, перенаправляем пользователя на страницу профиля
           window.location.href = '/profile';
        }
        setCookieChecked(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieChecked]);


    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    const loginUserRequest: LoginUserModelRequests = {
      email,
      password,
    };
    await loginUser(loginUserRequest);
    window.location.href = '/';
  };

  return (
      <div className={styles.backgroundContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.container}>
          <h1>Login</h1>
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
          <div className={styles.RMF}>
              <input type="checkbox" className={styles.box} />
              <span className={styles.RM}>Remember me</span>
              <span className={styles.FP}>Forget Password</span>
          </div>
            <input type="button" value="Register" className={styles.buttonSignIn} onClick={handleLogin} />
          <Link href={"/"}>
              <input type="button" value="Back" className={styles.buttonBack} />
          </Link>
        
          <p>Don't have an account?
           <Link href={"/register"} className={styles.register}>Register</Link>
          </p>
          </div>
      </div>
    </div>
  );
}