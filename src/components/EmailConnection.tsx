import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailConnectionProps {
  onConnect: (email: string) => void;
}

export const EmailConnection = ({ onConnect }: EmailConnectionProps) => {
  const [email, setEmail] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Email Connected!",
        description: "Your inbox is now connected and AI is analyzing your emails.",
        className: "relative overflow-hidden bg-card border-l-4 border-l-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-primary after:via-blue-500 after:to-primary after:animate-gradient-slide",
        duration: 2000,
      });
      onConnect(email);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-medium border-0 bg-card/50 backdrop-blur-ios">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-medium">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">Connect Your Email</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Let AI transform your emails into actionable tasks
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleConnect} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-lg border-0 bg-secondary/50 focus:bg-background transition-smooth"
              required
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full h-12"
            disabled={isConnecting || !email}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Connect Inbox
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};