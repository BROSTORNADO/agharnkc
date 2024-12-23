import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick' // React Slick for image sliders
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa' // Importing icons
import 'react-medium-image-zoom/dist/styles.css'
import Zoom from 'react-medium-image-zoom' // Image zooming library

const Home = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [selectedLocation, setSelectedLocation] = useState('') // Store selected location
  const postsPerPage = 6 // Number of posts per page

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
  ]

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts', {
          params: { location: selectedLocation },
        })
        setPosts(res.data)
      } catch (error) {
        console.error('Error fetching posts', error)
      }
    }
    fetchPosts()
  }, [selectedLocation]) // Refetch posts whenever the location changes

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  }

  // Calculate total pages
  const totalPages = Math.ceil(posts.length / postsPerPage)

  // Get posts for the current page
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Location Filter Dropdown */}
      <div className="mb-6 flex justify-center text-emerald-400">
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">All - الكل </option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* No Posts Message */}
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          Aucune publication trouvée
        </div>
      ) : (
        <>
          {/* Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {/* Image Slider */}
                <div className="w-full h-64">
                  {post.images && post.images.length > 0 ? (
                    post.images.length > 1 ? (
                      <Slider {...sliderSettings}>
                        {post.images.map((image, index) => (
                          <Zoom key={index}>
                            <img
                              src={image}
                              alt={`Post Image ${index + 1}`}
                              className="w-full h-64 object-cover cursor-pointer"
                            />
                          </Zoom>
                        ))}
                      </Slider>
                    ) : (
                      <Zoom>
                        <img
                          src={post.images[0]}
                          alt="Post Image"
                          className="w-full h-64 object-cover cursor-pointer"
                        />
                      </Zoom>
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                      No Images Available
                    </div>
                  )}
                </div>

                {/* Post Details */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <p className="text-gray-700 font-bold mb-2 flex items-center">
                    <FaMapMarkerAlt className="text-red-500 mr-2" />{' '}
                    {post.location}
                  </p>
                  <a
                    href={`https://wa.me/${post.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 font-semibold flex items-center"
                  >
                    <FaWhatsapp className="mr-2" /> Contacter sur WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
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
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === index + 1
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
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
    </div>
  )
}

export default Home
