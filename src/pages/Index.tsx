import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { EmailConnection } from "@/components/EmailConnection";
import { TaskList } from "@/components/TaskList";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import companyLogo1 from "@/assets/company-logo-1.png";
import companyLogo2 from "@/assets/company-logo-2.png";
import companyLogo3 from "@/assets/company-logo-3.png";
import companyLogo4 from "@/assets/company-logo-4.png";
import companyLogo5 from "@/assets/company-logo-5.png";
import companyLogo6 from "@/assets/company-logo-6.png";
import companyLogo7 from "@/assets/company-logo-7.png";

const Index = () => {
  const [connectedEmail, setConnectedEmail] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailConnect = (email: string) => {
    setConnectedEmail(email);
    setIsConnected(true);
    window.scrollTo(0, 0);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader showLetsGoButton={true} />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden flex-1 bg-white">
          {/* Grid Pattern Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-600/20 animate-float" />
            <div className="absolute top-40 right-20 w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500/15 to-blue-700/15 animate-float-slow" />
            <div className="absolute bottom-40 left-1/4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-300/20 to-blue-500/20 animate-float" />
            <div className="absolute top-60 right-1/3 w-4 h-4 rounded-full bg-gradient-to-r from-blue-600/15 to-blue-800/15 animate-float-slow" />
            <div className="absolute bottom-60 right-10 w-12 h-12 rounded-lg bg-gradient-to-r from-blue-400/10 to-blue-600/10 animate-float" />
          </div>
          <div className="relative container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-nunito font-bold tracking-tight text-navy">
                  Email to Tasks
                </h1>
                <div className="space-y-3">
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Connect your inbox and let AI instantly convert important emails into actionable tasks.
                  </p>
                  <p className="text-2xl font-nunito font-semibold text-navy">
                    Never miss important deadlines again.
                  </p>
                </div>
              </div>

              {/* Trusted By Section */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-center text-muted-foreground">
                  Trusted By
                </h2>
                <div className="relative overflow-hidden">
                  <div className="flex items-center gap-12 sm:gap-12 md:gap-16 animate-scroll whitespace-nowrap">
                    <img src={companyLogo1} alt="TechFlow" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    <img src={companyLogo2} alt="DataSync Solutions" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    <img src={companyLogo3} alt="CloudVenture" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    <img src={companyLogo4} alt="NextGen Labs" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    <img src={companyLogo5} alt="InnovateCorp" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    <img src={companyLogo6} alt="QuantumEdge" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    <img src={companyLogo7} alt="GlobalTech" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} />
                    {/* Duplicate sequence for seamless loop */}
                    <img src={companyLogo1} alt="TechFlow" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                    <img src={companyLogo2} alt="DataSync Solutions" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                    <img src={companyLogo3} alt="CloudVenture" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                    <img src={companyLogo4} alt="NextGen Labs" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                    <img src={companyLogo5} alt="InnovateCorp" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                    <img src={companyLogo6} alt="QuantumEdge" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                    <img src={companyLogo7} alt="GlobalTech" className="h-10 md:h-12 w-auto opacity-60 grayscale block bg-transparent" style={{backgroundColor: 'transparent'}} aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center" id="email-connection">
                <EmailConnection onConnect={handleEmailConnect} />
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                <Card className="border-0 bg-card/50 backdrop-blur-ios shadow-soft">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold">AI Understanding</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced AI analyzes email context to create meaningful tasks
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur-ios shadow-soft">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Instant Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time email processing with immediate task generation
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur-ios shadow-soft">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold">Smart Prioritization</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatic priority assignment based on email importance
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader userEmail={connectedEmail} tasksCount={2} />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-nunito font-bold text-navy">Welcome back!</h1>
            <p className="text-muted-foreground">
              Your AI assistant has analyzed your emails and created {2} new tasks for you.
            </p>
          </div>

          {/* Tasks */}
          <TaskList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
