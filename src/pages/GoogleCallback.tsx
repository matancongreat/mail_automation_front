import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useGoogleCallbackQuery } from "@/api/queries/useGoogleCallbackQuery";
import { useGmailConnectMutation } from "@/api/mutations/gmailAuth";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, error, isSuccess, isError, isLoading } = useGoogleCallbackQuery(location.search);
  const gmailMutation = useGmailConnectMutation();

  const [redirected, setRedirected] = useState(false);
  React.useEffect(() => {
    if (isSuccess) {
      // Check for scope
      let scope: string[] = [];
      if (data?.scope) {
        if (typeof data.scope === "string") {
          scope = data.scope.split(/[\s,]+/);
        } else if (Array.isArray(data.scope)) {
          scope = data.scope;
        }
      }
      if (!scope.includes("https://www.googleapis.com/auth/gmail.readonly") && !redirected) {
        setRedirected(true);
        gmailMutation.mutate(undefined, {
          onSuccess: (gmailData) => {
            if (gmailData && gmailData.authorization_url) {
              window.location.href = gmailData.authorization_url;
            }
          },
        });
      }
      setOpen(true);
    } else if (isError) {
      setOpen(true);
    }
  }, [isSuccess, isError, data, gmailMutation, redirected]);

  let title = "";
  let message = "";
  const gmailLoading = gmailMutation.status === "pending";
  if (isLoading || gmailLoading) {
    title = "Connecting...";
    message = "Connecting your Google account, please wait.";
  } else if (isSuccess && !gmailLoading) {
    let scope: string[] = [];
    if (data?.scope) {
      if (typeof data.scope === "string") {
        scope = data.scope.split(/[\s,]+/);
      } else if (Array.isArray(data.scope)) {
        scope = data.scope;
      }
    }
    if (!scope.includes("https://www.googleapis.com/auth/gmail.readonly")) {
      title = "Additional Permissions Required";
      message = "We need access to your Gmail. Please continue to grant Gmail permissions.";
    } else {
      title = "Success!";
      message = data?.message || "Google connected successfully!";
    }
  } else if (isError) {
    title = "Failed";
    message = error?.message || "Failed to connect Google.";
  } else if (gmailMutation.status === "error") {
    title = "Failed";
    message = (gmailMutation.error as any)?.message || "Failed to connect Gmail.";
  }

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      navigate("/");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleDialogChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setOpen(false)}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GoogleCallback;
