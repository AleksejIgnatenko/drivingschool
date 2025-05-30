'use client';

import styles from './styles.module.css'; // Make sure the file path is correct
import Link from 'next/link';
import { useState } from "react";
import { LoginUserModelRequests } from '@/app/Models/UserModel/LoginUserModelRequests';
import { loginUserAsync } from '../services/userServices/loginUserAsync';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginAsync = async () => {
        const loginUserRequest: LoginUserModelRequests = {
            email,
            password,
        };
        await loginUserAsync(loginUserRequest);
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
                    <p id='errorMessages' className={styles.errorMessages}></p>
                    <input type="button" value="Login" className={styles.buttonLogin} onClick={handleLoginAsync} />
                    <Link href={"/"}>
                        <input type="button" value="Back" className={styles.buttonBack} />
                    </Link>
                    <p>Don&apos;t have an account?
                        <Link href={"/register"} className={styles.register}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}