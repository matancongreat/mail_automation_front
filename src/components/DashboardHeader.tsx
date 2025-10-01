import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

interface DashboardHeaderProps {
  userEmail?: string;
  tasksCount?: number;
  showLetsGoButton?: boolean;
}

export const DashboardHeader = ({ userEmail, tasksCount = 0, showLetsGoButton = false }: DashboardHeaderProps) => {
  return (
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-ios">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-medium bg-white">
                <img src={logo} alt="Congreat Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Congreat</h1>
                <p className="text-sm text-muted-foreground">Email to Tasks</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {userEmail && (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{userEmail}</span>
                <Badge variant="secondary" className="ml-2">
                  {tasksCount} tasks
                </Badge>
              </div>
            )}
            
            {showLetsGoButton ? (
              <Button 
                className="gradient-primary text-white hover:opacity-90 transition-smooth"
                onClick={() => {
                  const emailSection = document.querySelector('[id*="email"]') || document.querySelector('.email-connection');
                  if (emailSection) {
                    emailSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Let's Go!
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {tasksCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};