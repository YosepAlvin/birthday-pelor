
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownTimer = ({ targetDate = '2026-06-27' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-primary to-pink-400' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-secondary to-purple-400' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-[hsl(200_98%_48%)] to-cyan-400' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-accent to-yellow-400' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Countdown to the big day
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-gradient-to-br ${unit.color} rounded-2xl p-6 shadow-lg`}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base font-medium text-white/90 uppercase tracking-wider">
                {unit.label}
              </div>
            </div>
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl -z-10" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
