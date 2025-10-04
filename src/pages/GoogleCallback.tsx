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

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { data, error, isSuccess, isError, isLoading } = useGoogleCallbackQuery(location.search);

  React.useEffect(() => {
    if (isSuccess || isError) setOpen(true);
  }, [isSuccess, isError]);

  let title = "";
  let message = "";
  if (isLoading) {
    title = "Connecting...";
    message = "Connecting your Google account, please wait.";
  } else if (isSuccess) {
    title = "Success!";
    message = data?.message || "Google connected successfully!";
  } else if (isError) {
    title = "Failed";
    message = error?.message || "Failed to connect Google.";
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
