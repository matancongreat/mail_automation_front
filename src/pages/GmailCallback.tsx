
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "@/api/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const GmailCallback = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sendCallback = async () => {
      try {
        const res = await apiClient.get(`/gmail/callback${location.search}`);
        setSuccess(true);
        setMessage(res.data?.message || "Gmail connected successfully!");
      } catch (err) {
        setSuccess(false);
        setMessage(
          err?.message || err?.response?.data?.message || "Failed to connect Gmail."
        );
      } finally {
        setOpen(true);
      }
    };
    sendCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {success ? "Success!" : "Failed"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
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
