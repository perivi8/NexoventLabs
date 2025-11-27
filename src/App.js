import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Code, Cloud, Brain, Smartphone, Shield, Lightbulb, Menu, X, ChevronRight, MapPin, Mail, Phone, Linkedin, Instagram, MessageSquare, ArrowRight, Users, Target, Award, Clock, Check, Briefcase, Building2, Send, Globe, MessageCircle, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Logo Component
const Logo = ({ className = "", darkMode = false }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`} data-testid="logo">
    <img 
      src="https://customer-assets.emergentagent.com/job_nexovent-site/artifacts/pt3tv7vx_logo.png" 
      alt="Nexovent Labs Logo" 
      className="h-10 w-10 object-contain"
    />
    <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      <span className="text-orange-500">Nexovent</span>
      <span className={darkMode ? "text-white" : "text-gray-900"}> Labs</span>
    </span>
  </Link>
);

// ScrollToTop Component - scrolls to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
};

// Navigation Component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to contact form when on contact page
  useEffect(() => {
    if (location.pathname === '/contact' && location.state?.scrollToForm) {
      setTimeout(() => {
        const element = document.getElementById('contact-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleGetStarted = (e) => {
    e.preventDefault();
    navigate('/contact', { state: { scrollToForm: true } });
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`} data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                  location.pathname === link.path ? 'text-orange-500' : 'text-gray-700'
                }`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
            <Button onClick={handleGetStarted} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6" data-testid="nav-get-started">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 pt-4">
              <Button onClick={handleGetStarted} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_nexovent-site/artifacts/pt3tv7vx_logo.png" 
                alt="Nexovent Labs Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <span className="text-orange-500">Nexovent</span>
                <span className="text-white"> Labs</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming businesses through innovative technology solutions. Your trusted partner for digital excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors" data-testid="social-linkedin">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors" data-testid="social-instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors" data-testid="social-whatsapp">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'Chatbot & AI', 'ML & AI Solutions', 'Database & Backend'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                data-testid="newsletter-email"
              />
              <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 rounded-full" data-testid="newsletter-submit">
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Nexovent Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Counter Animation Component
const CounterAnimation = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const endValue = parseInt(end.toString().replace(/\D/g, ''));
          const startTime = Date.now();
          
          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * endValue);
            
            setCount(current);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };
          
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={(el) => (counterRef.current = el)}>
      {count}{suffix}
    </span>
  );
};

// Home Page
const Home = () => {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/contact', { state: { scrollToForm: true } });
  };

  const stats = [
    { value: '18', label: 'Projects Delivered', number: 18, suffix: '' },
    { value: '3', label: 'Team Members', number: 3, suffix: '' },
    { value: '98%', label: 'Client Satisfaction', number: 98, suffix: '%' },
    { value: '0', label: 'Years Experience', number: 0, suffix: '' },
  ];

  const services = [
    { icon: Globe, title: 'Web Development', desc: 'Stunning websites & web applications' },
    { icon: Smartphone, title: 'Mobile Apps', desc: 'Native & cross-platform development' },
    { icon: MessageCircle, title: 'Chatbot & AI', desc: 'Intelligent automation solutions' },
    { icon: Brain, title: 'ML & AI Solutions', desc: 'Advanced machine learning systems' },
    { icon: Database, title: 'Database & Backend', desc: 'Robust backend architecture' },
  ];

  const clients = [
    'TechCorp', 'InnovateCo', 'FutureSoft', 'DataDriven', 'CloudFirst', 'SecureNet'
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero-section">
        {/* Background for mobile and tablet - image */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-orange-900/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=85&w=1200&auto=format&fit=crop"
            alt="IT team collaboration and development"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Background for desktop - gradient */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-br from-gray-50 via-white to-orange-50">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-20 -left-20 w-60 h-60 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 px-2 sm:px-4 md:px-6 lg:px-0">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                Innovating the Future of Technology
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:text-gray-900 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Transform Your Business with
                <span className="text-orange-500"> Next-Gen</span> Solutions
              </h1>
              <p className="text-base sm:text-lg max-w-xl lg:text-gray-600 text-gray-100 leading-relaxed">
                We build innovative software solutions that drive growth, enhance efficiency, and create exceptional digital experiences for forward-thinking businesses.
              </p>
              
              {/* Key features - visible on all devices */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-2 bg-white/10 lg:bg-orange-50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Shield className="text-orange-400 lg:text-orange-500" size={18} />
                  <span className="text-sm text-white lg:text-gray-700 font-medium">Secure & Reliable</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 lg:bg-orange-50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Clock className="text-orange-400 lg:text-orange-500" size={18} />
                  <span className="text-sm text-white lg:text-gray-700 font-medium">On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 lg:bg-orange-50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Users className="text-orange-400 lg:text-orange-500" size={18} />
                  <span className="text-sm text-white lg:text-gray-700 font-medium">Expert Team</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <Button onClick={handleContactClick} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base" data-testid="hero-cta">
                  Start Your Project <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button asChild size="lg" className="bg-white hover:bg-gray-50 text-orange-500 rounded-full px-6 sm:px-8 h-11 sm:h-12 text-sm sm:text-base" data-testid="hero-services">
                  <Link to="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=85&w=600&auto=format&fit=crop"
                  alt="IT team collaboration and development"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Award Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Award className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Award Winning</p>
                    <p className="text-sm text-gray-500">Tech Solutions</p>
                  </div>
                </div>
              </div>
              
              {/* Stats Card */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg z-20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>18</p>
                  <p className="text-sm text-gray-600 font-medium">Projects Done</p>
                </div>
              </div>
              
              {/* Trusted Badge */}
              <div className="absolute bottom-20 -right-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 shadow-lg z-20">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-orange-500"></div>
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-orange-500"></div>
                    <div className="w-8 h-8 bg-white rounded-full border-2 border-orange-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Trusted by</p>
                    <p className="text-xs opacity-90">100+ Companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-orange-500 mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  <CounterAnimation end={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white" data-testid="services-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Our Core Services
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to accelerate your digital transformation journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="group border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                    <service.icon className="text-orange-500 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              <Link to="/services">View All Services <ChevronRight className="ml-1" size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1758691737387-a89bb8adf768?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkaXZlcnNlJTIwdGVjaCUyMHRlYW18ZW58MHx8fHwxNzY0MjIzMjQ1fDA&ixlib=rb-4.1.0&q=85&w=600"
                alt="Our team"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-orange-500 text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                We're Passionate About Technology & Innovation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At Nexovent Labs, we combine cutting-edge technology with creative thinking to deliver solutions that make a real difference. Our team of experts is dedicated to helping businesses thrive in the digital age.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mission Driven</h4>
                    <p className="text-sm text-gray-600">Focused on client success</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-orange-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Team</h4>
                    <p className="text-sm text-gray-600">3 skilled professionals</p>
                  </div>
                </div>
              </div>
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8">
                <Link to="/about">Learn More About Us <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {clients.map((client, idx) => (
              <span key={idx} className="text-2xl font-bold text-gray-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to Transform Your Business?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our technology solutions can help you achieve your goals and stay ahead of the competition.
          </p>
          <Button onClick={handleContactClick} size="lg" className="bg-white text-orange-500 hover:bg-gray-100 rounded-full px-8 h-12">
            Get In Touch <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </section>
    </div>
  );
};

// Services Page
const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data.services);
      } catch (error) {
        console.error('Failed to fetch services', error);
      }
    };
    fetchServices();
  }, []);

  const iconMap = {
    globe: Globe,
    smartphone: Smartphone,
    messageCircle: MessageCircle,
    brain: Brain,
    database: Database
  };

  return (
    <div className="pt-20" data-testid="services-page">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Technology Solutions for Modern Businesses
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From custom software development to AI-powered solutions, we deliver end-to-end technology services that drive innovation and growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Code;
              return (
                <Card key={service.id} className="group border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                      <IconComponent className="text-orange-500 group-hover:text-white transition-colors" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="text-orange-500" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              How We Work
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs and goals' },
              { step: '02', title: 'Strategy', desc: 'Planning the perfect solution' },
              { step: '03', title: 'Development', desc: 'Building with precision and care' },
              { step: '04', title: 'Launch', desc: 'Deploying and ongoing support' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-orange-500/20 mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Need a Custom Solution?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Let's discuss your project requirements and create something amazing together.
          </p>
          <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-gray-100 rounded-full px-8">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

// About Page
const About = () => {
  const values = [
    { icon: Target, title: 'Innovation', desc: 'Constantly pushing boundaries to deliver cutting-edge solutions.' },
    { icon: Users, title: 'Collaboration', desc: 'Working closely with clients as true partners in success.' },
    { icon: Award, title: 'Excellence', desc: 'Committed to the highest standards in everything we do.' },
    { icon: Clock, title: 'Reliability', desc: 'Delivering on time, every time, with consistent quality.' }
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop' },
    { name: 'Michael Torres', role: 'CTO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
    { name: 'Emily Davis', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop' },
    { name: 'David Kim', role: 'Lead Engineer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' }
  ];

  return (
    <div className="pt-20" data-testid="about-page">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">About Us</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Building the Future of Technology
              </h1>
              <p className="text-gray-400 text-lg">
                Since 2012, Nexovent Labs has been at the forefront of digital innovation, helping businesses transform and thrive in an ever-evolving technological landscape.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1764001276717-06fb8d0783db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxkaXZlcnNlJTIwdGVjaCUyMHRlYW18ZW58MHx8fHwxNzY0MjIzMjQ1fDA&ixlib=rb-4.1.0&q=85&w=600"
                alt="Our office"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-8" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              From Startup to Industry Leader
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              What started as a small team of passionate developers has grown into a global technology company serving clients across industries. Our journey has been defined by a relentless pursuit of excellence and an unwavering commitment to our clients' success.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we're proud to be trusted by over 200 companies worldwide, from ambitious startups to Fortune 500 enterprises, all of whom rely on us to drive their digital transformation initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              What Drives Us Forward
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-orange-500" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Meet Our Team
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-orange-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Careers Page
const Careers = () => {
  const [careers, setCareers] = useState({ positions: [], benefits: [] });
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', position: '', experience: '', linkedin: '', portfolio: '', cover_letter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await axios.get(`${API}/careers`);
        setCareers(response.data);
      } catch (error) {
        console.error('Failed to fetch careers', error);
      }
    };
    fetchCareers();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF and Word documents are allowed");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      toast.error("Please upload your CV/Resume");
      return;
    }
    
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('cover_letter', formData.cover_letter);
      formDataToSend.append('resume', resumeFile);

      await axios.post(`${API}/careers/apply`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      toast.success("Application submitted successfully!");
      setFormData({ name: '', email: '', phone: '', position: '', experience: '', linkedin: '', portfolio: '', cover_letter: '' });
      setResumeFile(null);
      setSelectedPosition(null);
    } catch (error) {
      toast.error("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20" data-testid="careers-page">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Careers</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Join Our Growing Team
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Be part of a team that's shaping the future of technology. We're always looking for talented individuals who share our passion for innovation.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Why Join Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Benefits & Perks
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careers.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-orange-500" size={20} />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Open Positions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Current Opportunities
            </h2>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            {careers.positions.map((position) => (
              <Card key={position.id} className="border border-gray-200 hover:border-orange-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Building2 size={14} /> {position.department}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {position.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {position.type}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {position.experience}</span>
                      </div>
                      <p className="text-gray-600 mt-3">{position.description}</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 flex-shrink-0"
                          onClick={() => {
                            setSelectedPosition(position);
                            setFormData(prev => ({ ...prev, position: position.title }));
                          }}
                          data-testid={`apply-${position.id}`}
                        >
                          Apply Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl">Apply for {position.title}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleApply} className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Full Name *"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              data-testid="apply-name"
                            />
                            <Input
                              type="email"
                              placeholder="Email *"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              data-testid="apply-email"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Phone *"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              required
                              data-testid="apply-phone"
                            />
                            <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                              <SelectTrigger data-testid="apply-experience">
                                <SelectValue placeholder="Experience *" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-2">0-2 years</SelectItem>
                                <SelectItem value="2-5">2-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Input
                            placeholder="LinkedIn Profile"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            data-testid="apply-linkedin"
                          />
                          <Input
                            placeholder="Portfolio URL"
                            value={formData.portfolio}
                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                            data-testid="apply-portfolio"
                          />
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Upload CV/Resume * <span className="text-gray-500 text-xs">(PDF or Word, max 5MB)</span>
                            </label>
                            <div className="relative">
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                required
                                className="cursor-pointer"
                                data-testid="apply-resume"
                              />
                              {resumeFile && (
                                <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                                  <Check size={16} /> {resumeFile.name}
                                </p>
                              )}
                            </div>
                          </div>
                          <Textarea
                            placeholder="Cover Letter *"
                            value={formData.cover_letter}
                            onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
                            rows={4}
                            required
                            data-testid="apply-cover"
                          />
                          <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 rounded-full" data-testid="apply-submit">
                            {loading ? "Submitting..." : "Submit Application"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Contact Page
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-orange-500 font-medium text-sm uppercase tracking-wider">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's Build Something Great Together
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Whether you're looking to start a new project, need technical consultation, or just want to say hello, we're here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Location</h3>
                    <p className="text-gray-600">OMR Chennai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">nexoventlabs@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">+91 8106811285</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <img 
                  src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&w=600"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white"
                    data-testid="contact-name"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white"
                    data-testid="contact-email"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white"
                    data-testid="contact-phone"
                  />
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="bg-white" data-testid="contact-subject">
                      <SelectValue placeholder="Subject *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project">New Project</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Your Message *"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  required
                  className="bg-white"
                  data-testid="contact-message"
                />
                <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full h-12" data-testid="contact-submit">
                  {loading ? "Sending..." : "Send Message"} <Send className="ml-2" size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" richColors />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
