import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Bot, Zap, Shield, Clock, Star, Quote, Eye, MessageSquare, FileText, Image as ImageIcon } from "lucide-react";
import heroImage from "@/assets/hero-ai.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Natural Conversations",
      description: "Engage in human-like conversations with advanced AI that understands context and nuance."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Document Analysis",
      description: "Upload and analyze documents instantly. Get insights, summaries, and answers from your files."
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Image Understanding",
      description: "Share images and get detailed analysis, descriptions, and answers about visual content."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Your AI assistant is always ready to help, any time of day or night."
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get instant responses powered by cutting-edge AI technology"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your conversations and data are encrypted and protected"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Always Learning",
      description: "Our AI continuously improves to serve you better"
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "This AI chatbot has transformed how I work. It's like having a brilliant assistant available 24/7.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "The document analysis feature is incredible. Saves me hours of reading through technical docs.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Content Creator",
      content: "Best AI assistant I've used. The responses are accurate, helpful, and genuinely useful.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">PersonalAI</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/app")}
            className="border-primary/50 hover:bg-primary/10"
          >
            Launch App
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }} />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span>Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Your Personal
              <span className="block text-primary mt-2">AI Assistant</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of AI conversations. Get instant answers, analyze documents, 
              understand images, and solve problems with your intelligent companion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg"
                onClick={() => navigate("/app")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-glow"
              >
                Get Started
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need in an AI assistant</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all hover:shadow-glow"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose PersonalAI</h2>
            <p className="text-xl text-muted-foreground">Built for performance, designed for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Users Say</h2>
            <p className="text-xl text-muted-foreground">Trusted by thousands worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 bg-card border-border/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-4">{review.content}</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <div className="flex items-start gap-4 mb-6">
              <Eye className="w-12 h-12 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We envision a world where everyone has access to intelligent, helpful AI assistance. 
                  Our mission is to democratize AI technology, making it accessible, intuitive, and 
                  powerful for everyone. We're building the future of human-AI collaboration, one 
                  conversation at a time.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Join us on this journey to transform how people interact with technology and unlock 
                  new possibilities for learning, productivity, and creativity.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users experiencing the power of AI assistance
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/app")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-6 shadow-glow"
          >
            Launch Your AI Assistant
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-6 h-6 text-primary" />
                <span className="font-bold">PersonalAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your intelligent AI companion for everyday tasks
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PersonalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
