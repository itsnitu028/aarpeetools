import { useState, useEffect } from 'react';
import { Wrench, Settings, ChevronRight } from 'lucide-react';
import cuttingtools from "../../assets/cutting tools.png"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const animatedTexts = [
    "High-quality tools and resources for professionals.",
    "Find everything you need for your next project.",
    "Premium cutting tools for every application.",
    "Expert solutions for professional craftsmen."
  ];
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Text rotation animation
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % animatedTexts.length);
      setCurrentWordIndex(0);
      setDisplayText('');
    }, 4000);
    
    return () => clearInterval(textInterval);
  }, []);
  
  // Typewriter effect for current text
  useEffect(() => {
    const currentText = animatedTexts[textIndex];
    const words = currentText.split(' ');
    
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + (prev ? ' ' : '') + words[currentWordIndex]);
        setCurrentWordIndex(prev => prev + 1);
      }, 200); // Speed of word appearance
      
      return () => clearTimeout(timer);
    }
  }, [textIndex, currentWordIndex]);
  
  return (
    <div 
      className="relative w-full min-h-120 text-white shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image with zoom animation */}
      <div className="absolute inset-0 z-0">
        <img 
          src={cuttingtools} 
          alt="Tools background" 
          className={`w-full h-full object-cover opacity-60 transition-transform duration-1000 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      
      {/* Content overlay with staggered animations */}
      <div className="relative z-10 py-8 mt-10 px-4 md:px-8 lg:px-12 h-full">
        <div className='px-4 leading-10'>
          {/* Main heading with slide-in animation */}
          <div 
            className={`text-5xl md:text-4xl lg:text-5xl font-bold mb-2 transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-[-100px] opacity-0'
            }`}
            style={{ color: '#872341' }}
          >
            <span 
              className={`text-black text-xl inline-block transition-all duration-1000 delay-300 animate-pulse ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[-50px] opacity-0'
              }`} 
              style={{ fontFamily: 'Poller One, cursive' }}
            >
              Unleash Power with 
            </span> <span> AAR PEE TOOLS</span>
            <span className={`inline-block transition-all duration-1000 delay-500  hover:text-[#BE3144] cursor-pointer ${
              isLoaded ? 'translate-y-0 opacity-100 animate-bounce-5' : 'translate-y-[-100px] opacity-0'
            }`}>
              
            </span>
          </div>
          
          {/* Subtitle with typewriter effect */}
          <div 
            className={`text-lg mb-6 font-semibold transition-all duration-1000 delay-700 ease-out min-h-[2rem] ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'
            }`}
            style={{ color: ' #2c3e50' }}
          >
            <span 
              className={`inline-block transition-all duration-500 ease-in-out ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          
          {/* Buttons with slide-up animation */}
          <div 
            className={`py-4 flex flex-row gap-4 transition-all duration-1000 delay-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'
            }`}
          >
            <button
              className="px-7 py-3 bg-[#2c3e50] rounded-md font-bold flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 hover:text-[#2c3e50] hover:bg-white border-2 border-[#6d65c6] group"
            >
              <span className="animate-pulse">Explore Tools</span>
              <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 animate-bounce" />
            </button>
            <button
              className="px-10 py-3 rounded-md font-bold border-2 border-[#2c3e50] text-[#2c3e50] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 hover:text-white hover:bg-[#2c3e50] group"
            >
              <span className="animate-pulse">Learn More</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating tool icons with continuous animation */}
     
    </div>
  );
}