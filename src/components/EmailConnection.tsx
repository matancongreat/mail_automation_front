
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


import type { UseMutationResult } from '@tanstack/react-query';

interface EmailConnectionProps {
  mutation: UseMutationResult<any, unknown, void, unknown>;
  setConnectedEmail?: (email: string) => void;
  setIsConnected?: (connected: boolean) => void;
}

export const EmailConnection = ({mutation, setConnectedEmail, setIsConnected }: EmailConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consentUrl, setConsentUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (mutation && mutation.data && mutation.data.consentUrl) {
      setConsentUrl(mutation.data.consentUrl);
      setShowConsent(true);
      setIsConnecting(false);
    }
    // // If mutation is successful and no consentUrl, treat as connected
    // if (mutation && mutation.isSuccess && mutation.data && !mutation.data.consentUrl) {
    //   if (setConnectedEmail) setConnectedEmail("user@example.com");
    //   if (setIsConnected) setIsConnected(true);
    //   setIsConnecting(false);
    // }
  }, [mutation.data, mutation.isSuccess]);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    mutation.mutate();
  };

  const handleConsentClose = () => {
    setShowConsent(false);
    if (setConnectedEmail) setConnectedEmail("user@example.com");
    if (setIsConnected) setIsConnected(true);
    toast({
      title: "Email Connected!",
      description: "Your inbox is now connected and AI is analyzing your emails.",
      className:
        "relative overflow-hidden bg-card border-l-4 border-l-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-primary after:via-blue-500 after:to-primary after:animate-gradient-slide",
      duration: 2000,
    });
  };

  return (
    <>
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
            <div className="space-y-2"></div>
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full h-12"
              disabled={isConnecting}
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
      <Dialog open={showConsent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Google Authentication</DialogTitle>
            <DialogDescription>
              To connect your inbox, please authenticate with Google.
            </DialogDescription>
          </DialogHeader>
          {consentUrl && (
            <iframe
              src={consentUrl}
              title="Google Consent"
              className="w-full h-96 border rounded mb-4"
            />
          )}
          <DialogClose asChild>
            <Button variant="outline" onClick={handleConsentClose} className="w-full mt-2">Done</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};