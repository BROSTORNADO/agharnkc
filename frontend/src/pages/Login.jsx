import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = useUserStore((state) => state.login);
  const error = useUserStore((state) => state.error);
  const user = useUserStore((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });

    // Naviguer vers l'accueil uniquement si l'utilisateur est connecté avec succès
    if (useUserStore.getState().user) {
      navigate('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-emerald-400 text-white p-6 shadow-lg w-full max-w-sm rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center mb-6">Connexion</h2>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}

        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-white rounded bg-transparent mb-4 focus:ring-2 focus:ring-white placeholder-white text-white"
          placeholder="Entrez votre email"
        />

        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-white rounded bg-transparent mb-6 focus:ring-2 focus:ring-white placeholder-white text-white"
          placeholder="Entrez votre mot de passe"
        />

        <button
          type="submit"
          className="w-full py-2 bg-white text-emerald-400 rounded hover:bg-gray-100 transition"
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;

