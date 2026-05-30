
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Balloons from '@/components/Balloons.jsx';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1635822120057-b37c15ce1bef',
      title: 'Birthday celebration with friends',
      description: 'Joyful moments shared with loved ones around a beautifully decorated birthday cake',
    },
    {
      url: 'https://images.unsplash.com/photo-1589354371130-638de855c505',
      title: 'Colorful party decorations',
      description: 'Vibrant balloons and festive decorations creating the perfect party atmosphere',
    },
    {
      url: 'https://images.unsplash.com/photo-1608023494702-79d51da3a0e9',
      title: 'Delicious birthday cake',
      description: 'A stunning multi-layered cake with colorful frosting and sparkling candles',
    },
    {
      url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84',
      title: 'Gift unwrapping moment',
      description: 'The excitement of opening beautifully wrapped presents from friends and family',
    },
    {
      url: 'https://images.unsplash.com/photo-1674545014405-035929582503',
      title: 'Party games and fun',
      description: 'Laughter and joy during entertaining party games and activities',
    },
    {
      url: 'https://images.unsplash.com/photo-1699028353562-de1a2f5cb075',
      title: 'Sweet treats table',
      description: 'An array of delicious desserts and treats for guests to enjoy',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Photo Gallery - Birthday Bash</title>
        <meta name="description" content="Browse through beautiful moments captured during our birthday celebrations and special memories." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-primary/5 to-secondary/5">
        <Header />
        <Balloons count={3} />

        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Birthday memories
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Relive the magical moments from our celebrations
              </p>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-display font-bold text-xl mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {image.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:scale-110 active:scale-95"
                    aria-label={`View ${image.title} in full size`}
                  >
                    <ZoomIn className="w-5 h-5 text-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-white font-display font-bold text-2xl mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;
