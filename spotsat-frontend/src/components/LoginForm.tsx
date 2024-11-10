import React, { useState } from 'react';
import { login } from '../services/api';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(username, password);

            localStorage.setItem('token', response.data.token);
            window.location.href = '/home';
        } catch (error) {
            alert('Erro ao fazer login');
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 border rounded-md"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded-md"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
    );

};

export default LoginForm;
