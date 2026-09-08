import React, { useEffect, useRef, useState } from 'react';

type AnimationVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  duration?: number; // ms
  fullWidth?: boolean;
}

export const RevealOnScroll: React.FC<Props> = ({ 
  children, 
  className = "", 
  delay = 0, 
  variant = 'up',
  duration = 1000,
  fullWidth = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  const getTransformClass = () => {
    if (isVisible) return 'opacity-100 translate-x-0 translate-y-0 scale-100';
    
    switch (variant) {
      case 'up': return 'opacity-0 translate-y-16';
      case 'down': return 'opacity-0 -translate-y-16';
      case 'left': return 'opacity-0 -translate-x-16';
      case 'right': return 'opacity-0 translate-x-16';
      case 'scale': return 'opacity-0 scale-90';
      case 'fade': return 'opacity-0';
      default: return 'opacity-0 translate-y-16';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDuration: `${duration}ms` }}
      className={`transition-[opacity,transform] ease-out transform ${getTransformClass()} ${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </div>
  );
};