/**
 * Login Slideshow Component
 * Displays a slideshow of counseling images with descriptions
 */

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import counselingImage1 from '../../../assets/images/counseling3.jpg';
import counselingImage2 from '../../../assets/images/login-2.jpg';
import counselingImage3 from '../../../assets/images/login-1.jpg'; 

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
    title: "Convenient Telehealth Programs",
    description: "Log in to attend state-approved DUI classes, therapy, and support sessions all from the comfort of your home."
  },
  {
    id: 2,
    image: counselingImage2,
    title: "Professional Counseling Services",
    description: "Access expert mental health professionals and licensed counselors for personalized therapy sessions and support."
  },
  {
    id: 3,
    image: counselingImage3,
    title: "Comprehensive Mental Health Care",
    description: "Join our supportive community and receive evidence-based treatment for substance abuse, anxiety, depression, and more."
  }
];


const LoginSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // 5 seconds duration

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
        transition: 'background-image 0.2s smooth',
        // Fallback background color
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* Content Overlay with full width and bottom alignment */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 100,
          width: '100%', // Full width
          padding: '24px 32px', // 24px top/bottom, 32px left/right
          display: 'flex',
          flexDirection: 'column',
          gap: '32px', // 32px gap between content and pagination
          // Exact Figma gradient and blur
          background: 'linear-gradient(179deg, rgba(20, 41, 65, 0) 0%, rgba(12, 16, 17, 0.8) 84%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Text Content Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px', // 16px gap between title and description
            maxWidth: { xs: '100%', md: '620px' }, // Max width for content readability
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '24px', md: '28px' },
              lineHeight: 1.2,
              color: '#FFFFFF',
              textAlign: 'left',
              margin: 0,
            }}
          >
            {currentSlideData.title}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '16px', md: '18px' },
              lineHeight: 1.6,
              color: '#FFFFFF',
              textAlign: 'left',
              margin: 0,
            }}
          >
            {currentSlideData.description}
          </Typography>
        </Box>

        {/* Pagination dots with exact Figma specifications */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '12px', // 12px gap between dots
            width: 'fit-content',
            alignSelf: 'flex-start',
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: '12px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: index === currentSlide ? '#FFFFFF' : '#757775', // Solid/White and Neutral/60
                transition: 'background-color 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: index === currentSlide ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
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
