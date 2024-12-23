import React, { useState } from 'react';
import usePostStore from '../stores/usePostStore';
import { useNavigate } from 'react-router-dom';
import { countryCodes } from './countryCodes';
import { FaMapMarkerAlt, FaWhatsapp, FaFileAlt } from 'react-icons/fa';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [countryCode, setCountryCode] = useState('+222');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const createPost = usePostStore((state) => state.createPost);
  const navigate = useNavigate();

  const locations = [
    'Dar Naim - دار النعيم', 'Teyarett - تيارت', 'Toujouonine - توجونين', 'Ksar - لكصر',
    'Sebkha - السبخة', 'Tevragh Zeina - تفرغ زينة', 'Arafat - عرفات', 'El Mina - الميناء',
    'Riyadh - الرياض', 'Elvelouja - الفلوجة', 'Melah - ملح', 'Tarhil - الترحيل', 'Bouhdida - بوحديدة',
    'Tensweylm - تنسويلم', 'Carefour - كرفور', 'El Matar - المطار', 'Socogim - سوكوجيم',
    'Soukouk - الصكوك', 'Premier - ابريمير', 'Ain Talh - عين الطلح', 'Zaatar - الزعطر',
    'Cinquième - سينكيم', 'Sixième - سيزيم'
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    if (!title.trim()) return 'Le titre est requis';
    if (!description.trim()) return 'La description est requise';
    if (!location.trim()) return 'L\'emplacement est requis';
    if (!countryCode || !whatsappNumber.trim()) return 'Le numéro WhatsApp est requis';
    if (images.length === 0) return 'Au moins une image est requise';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    const whatsapp = `${countryCode}${whatsappNumber}`;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('whatsapp', whatsapp);
    images.forEach((image) => formData.append('images', image));

    try {
      await createPost(formData);
      setIsSuccess(true);
    } catch (err) {
      console.error('Erreur lors de la création du post:', err.message || err);
      setError(err.message || 'Erreur lors du téléchargement du post');
    }
  };

  if (isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-400">
        <div className="text-center bg-white p-6 rounded shadow-lg">
          <h1 className="text-2xl font-bold text-emerald-500">Post Créé ✅</h1>
          <p className="text-gray-700 mt-4">Votre post a été créé avec succès !</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-emerald-500 text-white px-4 py-2 rounded"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 w-full max-w-sm rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-500 text-center">Créer une annonce</h2>

        {error && (
          <div className="text-red-500 mb-4 border border-red-400 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <label className="block text-gray-700 font-medium mb-2">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-200 text-black placeholder-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
          placeholder="Entrez le titre de votre post"
        />

        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <FaFileAlt className="mr-2 text-emerald-500" /> Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-200 text-black placeholder-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
          placeholder="Entrez une description"
        />

        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-emerald-500" /> Emplacement
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-200 text-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
        >
          <option value="">Sélectionner un emplacement</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </select>

        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <FaWhatsapp className="mr-2 text-emerald-500" /> Numéro WhatsApp
        </label>
        <div className="flex items-center mb-4">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-1/3 p-3 border border-gray-300 bg-gray-200 text-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
          >
            {countryCodes.map((cc, idx) => (
              <option key={idx} value={cc.code}>{cc.code} - {cc.country}</option>
            ))}
          </select>
          <input
            type="text"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-2/3 p-3 ml-2 border border-gray-300 bg-gray-200 text-black placeholder-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
            placeholder="Numéro WhatsApp"
          />
        </div>

        <label className="block text-gray-700 font-medium mb-2">Images <span className = "text-red-500">(maximum 5 images)</span> </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-3 mb-4 border border-gray-300 bg-gray-100 outline-none focus:ring-2 focus:ring-emerald-400 transition"
        />

        <div className="flex space-x-4">
          {images.map((image, idx) => (
            <div key={idx} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-16 h-16 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-0 right-0 text-white bg-red-500 p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white p-3 rounded mt-4"
        >
          Soumettre le Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
