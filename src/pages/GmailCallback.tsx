

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
import { useGmailCallbackQuery } from "@/hooks/useGmailCallbackQuery";


const GmailCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, error, isSuccess, isError, isLoading } = useGmailCallbackQuery(location.search);

  // Open dialog when query finishes (success or error)
  React.useEffect(() => {
    if (isSuccess || isError) setOpen(true);
  }, [isSuccess, isError]);

  let title = "";
  let message = "";
  if (isLoading) {
    title = "Connecting...";
    message = "Connecting your Gmail account, please wait.";
  } else if (isSuccess) {
    title = "Success!";
    message = data?.message || "Gmail connected successfully!";
  } else if (isError) {
    title = "Failed";
    message = error?.message || "Failed to connect Gmail.";
  }

  // When dialog closes, redirect to index
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

export default GmailCallback;
