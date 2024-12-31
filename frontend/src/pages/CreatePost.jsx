// src/pages/CreatePost.jsx
import React, { useState } from 'react';
import usePostStore from '../stores/usePostStore';
import { useNavigate } from 'react-router-dom';
import { countryCodes } from './countryCodes';
import { FaMapMarkerAlt, FaWhatsapp, FaFileAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const CreatePost = () => {
  const { t } = useTranslation(); // Hook to get translations
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

    if (images.length + selectedFiles.length > 5) {
      setError(t('maxImagesError'));
      return;
    }

    setError('');
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const validateFields = () => {
    if (!title.trim()) return t('titleRequired');
    if (!description.trim()) return t('descriptionRequired');
    if (!location.trim()) return t('locationRequired');
    if (!countryCode || !whatsappNumber.trim()) return t('whatsappRequired');
    if (images.length === 0) return t('imageRequired');
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
      console.error('Error creating post:', err.message || err);
      setError(err.message || t('postError'));
    }
  };

  if (isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-400">
        <div className="text-center bg-white p-6 rounded shadow-lg">
          <h1 className="text-2xl font-bold text-emerald-500">{t('postCreated')}</h1>
          <p className="text-gray-700 mt-4">{t('postSuccessMessage')}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-emerald-500 text-white px-4 py-2 rounded"
          >
            {t('backToHome')}
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
        <h2 className="text-2xl font-bold mb-6 text-emerald-500 text-center">{t('createPost')}</h2>

        {error && (
          <div className="text-red-500 mb-4 border border-red-400 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <label className="block text-gray-700 font-medium mb-2">{t('title')}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-200 text-black placeholder-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
          placeholder={t('titlePlaceholder')}
        />

        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <FaFileAlt className="mr-2 text-emerald-500" /> {t('description')}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-200 text-black placeholder-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
          placeholder={t('descriptionPlaceholder')}
        />

        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-emerald-500" /> {t('location')}
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-200 text-black outline-none focus:ring-2 focus:ring-emerald-400 transition"
        >
          <option value="">{t('selectLocation')}</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </select>

        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <FaWhatsapp className="mr-2 text-emerald-500" /> {t('whatsappNumber')}
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
            placeholder={t('whatsappPlaceholder')}
          />
        </div>

        <label className="block text-gray-700 font-medium mb-2">{t('images')} <span className="text-red-500">{t('maxImages')}</span></label>
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
          {t('submitPost')}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

