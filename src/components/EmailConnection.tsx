
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


import type { UseMutationResult } from '@tanstack/react-query';
import { GmailAuthResponse } from "@/types/GmailAuthResponse";

interface EmailConnectionProps {
  mutation: UseMutationResult<GmailAuthResponse, unknown, void, unknown>;
  setConnectedEmail?: (email: string) => void;
  setIsConnected?: (connected: boolean) => void;
}

export const EmailConnection = ({mutation, setConnectedEmail, setIsConnected }: EmailConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consentUrl, setConsentUrl] = useState("");
  const { toast } = useToast();
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (mutation && mutation.data && mutation.data.authorization_url) {
      window.location.href = mutation.data.authorization_url;
      setIsConnecting(false);
    }
    if (mutation.isError) {
      let msg = "Failed to connect. Please try again.";
      if (mutation.error && typeof mutation.error === "object" && "message" in mutation.error) {
        msg = (mutation.error as any).message || msg;
      }
      setErrorMessage(msg);
      setErrorDialogOpen(true);
      setIsConnecting(false);
    }
  }, [mutation.data, mutation.isSuccess, mutation.isError, mutation.error]);

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
      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};