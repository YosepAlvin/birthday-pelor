
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Heart, Smile, Star, Sparkles } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Confetti from '@/components/Confetti.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const WishesPage = () => {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎉');
  const [showConfetti, setShowConfetti] = useState(false);

  const emojis = ['🎉', '🎂', '🎈', '🎁', '🥳', '💝', '🌟', '✨'];
  const cardColors = [
    'from-primary/10 to-pink-100',
    'from-secondary/10 to-purple-100',
    'from-[hsl(200_98%_48%)]/10 to-cyan-100',
    'from-accent/10 to-yellow-100',
  ];

  useEffect(() => {
    const savedWishes = localStorage.getItem('birthdayWishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      emoji: selectedEmoji,
      timestamp: new Date().toISOString(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('birthdayWishes', JSON.stringify(updatedWishes));

    setName('');
    setMessage('');
    setSelectedEmoji('🎉');
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    
    toast.success('Your wish has been added');
  };

  return (
    <>
      <Helmet>
        <title>Birthday Wishes - Birthday Bash</title>
        <meta name="description" content="Read heartfelt birthday messages from friends and family, or leave your own special birthday wish." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-secondary/5 to-accent/5">
        <Header />
        <Confetti trigger={showConfetti} />

        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Birthday wishes
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Share your heartfelt messages and celebrate together
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="font-semibold text-foreground">
                  {wishes.length} {wishes.length === 1 ? 'wish' : 'wishes'} received
                </span>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Wish Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 border-2 border-primary/10">
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Leave a wish
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Your name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Maya Chen"
                        className="text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your heartfelt birthday wish..."
                        rows={4}
                        className="text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Pick an emoji
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setSelectedEmoji(emoji)}
                            className={`text-2xl p-2 rounded-lg transition-all duration-200 ${
                              selectedEmoji === emoji
                                ? 'bg-gradient-to-br from-primary to-secondary scale-110'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all duration-200"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send wish
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Wishes List */}
              <div className="lg:col-span-2">
                {wishes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <Smile className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold mb-2">
                      No wishes yet
                    </h3>
                    <p className="text-muted-foreground">
                      Be the first to leave a birthday wish
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {wishes.map((wish, index) => (
                      <motion.div
                        key={wish.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bounce-in bg-gradient-to-br ${
                          cardColors[index % cardColors.length]
                        } rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{wish.emoji}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-display font-bold text-lg">
                                {wish.name}
                              </h3>
                              <Star className="w-4 h-4 text-accent fill-accent" />
                            </div>
                            <p className="text-foreground/90 leading-relaxed">
                              {wish.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-3">
                              {new Date(wish.timestamp).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WishesPage;
