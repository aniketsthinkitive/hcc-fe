/**
 * Login Slideshow Component
 * Displays a slideshow of counseling images with descriptions
 */

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import counselingImage1 from '../../../assets/images/counseling3.jpg';
import counselingImage2 from '../../../assets/images/counseling4.jpg';
import counselingImage3 from '../../../assets/images/login.png';

interface SlideData {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: counselingImage1,
    title: "Professional Counseling Services",
    description: "Access expert mental health professionals and licensed counselors for personalized therapy sessions and support."
  },
  {
    id: 2,
    image: counselingImage2,
    title: "Comprehensive Mental Health Care",
    description: "Join our supportive community and receive evidence-based treatment for substance abuse, anxiety, depression, and more."
  },
  {
    id: 3,
    image: counselingImage3,
    title: "Secure Healthcare Platform",
    description: "Experience a safe, confidential, and user-friendly platform designed specifically for healthcare professionals and patients."
  }
];


const LoginSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); // 4 seconds duration

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${currentSlideData.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 0,
        transition: 'background-image 0.5s ease-in-out',
        // Fallback background color
        backgroundColor: '#f0f0f0',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
          zIndex: 1,
        },
      }}
    >
      {/* Content Overlay */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 100,
          padding: 4,
          width: '100%',
          color: 'white',
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px 12px 0 0',
          margin: 'left 18px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.5rem', md: '2rem' },
            lineHeight: 1.2,
            color: 'white',
          }}
        >
          {currentSlideData.title}
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            opacity: 0.9,
            maxWidth: 400,
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: 1.6,
            mb: 3,
            color: 'white',
          }}
        >
          {currentSlideData.description}
        </Typography>

        {/* Pagination dots */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.6)',
                },
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSlideshow;
