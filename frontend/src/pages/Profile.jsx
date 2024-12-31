import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Importation de l'icône de la corbeille
import usePostStore from '../stores/usePostStore';
import useUserStore from '../stores/useUserStore';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const Profile = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const { posts, fetchUserPosts, deletePost, error, loading } = usePostStore();
  const { user } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const postsPerPage = 6; // Nombre de publications par page

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const handleDelete = (postId) => {
    deletePost(postId);
  };

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Obtenir les publications pour la page actuelle
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p className="text-center text-gray-500">{t('loading')}</p>; // Loading text translated
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-emerald-400 text-white rounded-lg p-6 shadow-md mb-8">
        <h1 className="text-3xl font-bold">{t('welcome')}, {user?.name || t('user')}</h1> {/* Translated welcome and user */}
        <p className="mt-2 text-lg">{t('yourPosts')}</p> {/* Translated your posts */}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-white text-center p-6 shadow-md rounded-lg">
          <p className="text-lg text-gray-700">{t('noPosts')}</p> {/* Translated no posts message */}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPosts.map((post) => (
              <div key={post._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={post.images[0]} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-emerald-600 mb-2">{post.title}</h2>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-400 transition"
                  >
                    <FaTrash /> {t('delete')} {/* Translated delete */}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contrôles de pagination */}
          <div className="flex justify-center mt-8">
            <button
              className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-emerald-400 text-white'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {t('previous')} {/* Translated previous */}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-emerald-400 text-white'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {t('next')} {/* Translated next */}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

