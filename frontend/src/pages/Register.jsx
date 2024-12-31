// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation(); // Hook to get translations
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = useUserStore((state) => state.register);
  const error = useUserStore((state) => state.error);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
    if (!error) navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-emerald-400 text-white p-6 shadow-md w-full max-w-sm rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-6">{t('register')}</h2> {/* Translated Title */}
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <label
          htmlFor="name"
          className="block text-sm font-medium text-white mb-1"
        >
          {t('name')} {/* Translated name label */}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border bg-emerald-400 rounded mb-4 text-white focus:ring-blue-500 focus:border-blue-500 placeholder:text-white"
          placeholder={t('namePlaceholder')} // Corrected comment placement
        />

        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-1"
        >
          {t('email')} {/* Translated email label */}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-white rounded mb-4 text-white bg-emerald-400 focus:ring-blue-500 focus:border-blue-500 placeholder:text-white"
          placeholder={t('emailPlaceholder')} // Corrected comment placement
        />

        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mb-1"
        >
          {t('password')} {/* Translated password label */}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-white bg-emerald-400 rounded mb-6 text-white focus:ring-blue-500 focus:border-blue-500 placeholder:text-white"
          placeholder={t('passwordPlaceholder')} // Corrected comment placement
        />

        <button
          type="submit"
          className="w-full py-2 bg-white text-emerald-400 font-bold rounded hover:bg-gray-200 transition"
        >
          {t('register')} {/* Translated button */}
        </button>
      </form>
    </div>
  );
};

export default Register;

