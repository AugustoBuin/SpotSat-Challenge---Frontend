import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-50">
            <div className="p-6 max-w-sm w-full bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Login</h1>
                <LoginForm />
            </div>
        </div>
    );

};

export default Login;
