import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CountryCounter from './CountryCounter'
import ProductCounter from './ProductCounter'

function Home() {
  // Constant outside to avoid re-creation
  const countries = [
    { name: "Maxico", value: 40, color: "#FF9933" }, // Saffron
    { name: "Brazil", value: 70, color: "#4A90E2" }, // Blue
    { name: "India", value: 100, color: "#138808" }, // Green
  ];

  // Scroll trigger functionality
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    stats: false,
    howItWorks: false,
    rankings: false,
    cta: false
  });

  const [heights, setHeights] = useState([0, 0, 0]);

  useEffect(() => {
    // Only start the animation when the rankings section is visible
    if (isVisible.rankings) {
      const interval = setInterval(() => {
        setHeights((prev) =>
          prev.map((h, i) => (h < countries[i].value ? h + 2 : h))
        );
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible.rankings]);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const rankingsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.dataset.section;
          setIsVisible(prev => ({
            ...prev,
            [sectionName]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = [
      { ref: heroRef, name: 'hero' },
      { ref: featuresRef, name: 'features' },
      { ref: statsRef, name: 'stats' },
      { ref: howItWorksRef, name: 'howItWorks' },
      { ref: rankingsRef, name: 'rankings' },
      { ref: ctaRef, name: 'cta' }
    ];

    sections.forEach(({ ref, name }) => {
      if (ref.current) {
        ref.current.dataset.section = name;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`flex justify-center mb-6 transition-all duration-1000 delay-200 ${isVisible.hero ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <img 
                src="/assests/logo.png" 
                alt="Agrova Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain"
              />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-1000 delay-300 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Welcome to{' '}
              <span className="text-green-600 dark:text-green-400">Agrova</span>
            </h1>
            <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-500 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Advanced Crop Yield Prediction System powered by Machine Learning
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link
                to="/predict"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Start Prediction
              </Link>
              <Link
                to="/about"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Why Choose Agrova?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-1000 delay-200 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Accurate Predictions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced ML models provide highly accurate crop yield predictions based on historical data and environmental factors.
              </p>
            </div>
            <div className={`text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-1000 delay-400 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant predictions with our real-time analysis system that processes multiple environmental parameters.
              </p>
            </div>
            <div className={`text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700 transition-all duration-1000 delay-600 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simple and intuitive interface designed for farmers and agricultural professionals of all technical levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counters Section */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Global Reach & Coverage
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Agrova's AI-powered predictions span across countries and agricultural products worldwide
            </p>
          </div>
          
          <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <CountryCounter />
            <ProductCounter />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 transition-all duration-1000 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className={`text-center transition-all duration-1000 delay-200 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Input Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your crop details, environmental conditions, and historical data.
              </p>
            </div>
            <div className={`text-center transition-all duration-1000 delay-400 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                AI Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our advanced algorithms analyze the data using machine learning models.
              </p>
            </div>
            <div className={`text-center transition-all duration-1000 delay-600 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Generate Report
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive detailed predictions and insights with visual representations.
              </p>
            </div>
            <div className={`text-center transition-all duration-1000 delay-800 ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Make Decisions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Use the predictions to optimize your farming strategies and maximize yields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Predicted Crop Yield Rankings */}
      <section ref={rankingsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.rankings ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI-Predicted Crop Yield Rankings
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our advanced AI models analyze agricultural data to predict crop yields across different regions
            </p>
          </div>
          
          <div className={`w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl shadow-xl transition-all duration-1000 delay-300 ${isVisible.rankings ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
            <div className="flex justify-around items-end h-80 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-inner">
              {countries.map((country, i) => (
                <div className="flex flex-col items-center" key={i}>
                  <div className="relative w-20 h-64 bg-gray-200 dark:bg-gray-600 rounded-t-lg overflow-hidden shadow-lg">
                    <div
                      className="absolute bottom-0 w-full transition-all duration-75 ease-out rounded-t-lg shadow-inner"
                      style={{
                        height: `${heights[i]}%`,
                        backgroundColor: country.color,
                      }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">
                      {country.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {heights[i]}% Yield
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                * Rankings based on AI analysis of historical data, climate patterns, and agricultural practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Apexars Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Made with ❤️ by Team Apexars
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              A passionate student-driven tech team conquering hackathons and building innovative solutions
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="/assests/Apexars.jpg" 
                  alt="Team Apexars" 
                  className="w-40 h-40 rounded-2xl object-cover shadow-lg border-4 border-white dark:border-gray-600"
                />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Building Tech with Purpose
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Founded in 2024, Apexars represents our commitment to innovation and excellence. 
                  We've come together with a shared vision of creating meaningful solutions that make a real impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a 
                    href="https://www.linkedin.com/company/apexars/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Follow Apexars
                  </a>
                  <span className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg">
                    🏆 Hackathon Champions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 dark:bg-green-700">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Crop Yields?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers who trust Agrova for their crop predictions.
          </p>
          <Link
            to="/predict"
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home