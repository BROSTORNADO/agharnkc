import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { FaMapMarkerAlt, FaWhatsapp, FaTimes } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSwipeable } from 'react-swipeable';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fullscreenImages, setFullscreenImages] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const postsPerPage = 6;

  const locations = [
    'Dar Naim - دار النعيم',
    'Teyarett - تيارت',
    'Toujouonine - توجونين',
    'Ksar - لكصر',
    'Sebkha - السبخة',
    'Tevragh Zeina - تفرغ زينة',
    'Arafat - عرفات',
    'El Mina - الميناء',
    'Riyadh - الرياض',
    'Elvelouja - الفلوجة',
    'Melah - ملح',
    'Tarhil - الترحيل',
    'Bouhdida - بوحديدة',
    'Tensweylm - تنسويلم',
    'Carefour - كرفور',
    'El Matar - المطار',
    'Socogim - سوكوجيم',
    'Soukouk - الصكوك',
    'Premier - ابريمير',
    'Ain Talh - عين الطلح',
    'Zaatar - الزعطر',
    'Cinquième - سينكيم',
    'Sixième - سيزيم',
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts', {
          params: { location: selectedLocation },
        });
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, [selectedLocation]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const pageNumbers = () => {
    const pages = [];
    const visiblePages = 4;
    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-center text-emerald-400">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All - الكل</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Aucune publication trouvée
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="w-full h-64">
                  {post.images && post.images.length > 0 ? (
                    <Slider {...sliderSettings}>
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Post Image ${index + 1}`}
                          className="w-full h-64 object-cover cursor-pointer"
                          onClick={() => openFullscreen(post.images, index)}
                        />
                      ))}
                    </Slider>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                      No Images Available
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <p className="text-gray-700 font-bold mb-2 flex items-center">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />
                    <span className="text-sm mt-2">{post.location}</span>
                  </p>
                  <a
                    href={`https://wa.me/${post.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 font-semibold flex items-center"
                  >
                    <FaWhatsapp className="mr-2" />
                    <span className="text-sm mt-2">Contacter sur WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {posts.length > postsPerPage && (
            <div className="flex justify-center mt-8">
              <button
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300'
                    : 'bg-emerald-400 text-white'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Précédent
              </button>
              {pageNumbers().map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === page
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300'
                    : 'bg-emerald-400 text-white'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}

      {fullscreenImages && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div
            {...handleSwipe}
            className="relative w-full h-full flex items-center justify-center"
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeFullscreen}
            >
              <FaTimes />
            </button>
            <img
              src={fullscreenImages[fullscreenIndex]}
              alt="Fullscreen"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

