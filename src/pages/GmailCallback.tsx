import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GmailCallback = () => {
  const location = useLocation();

  useEffect(() => {
    // Get the query params from the current URL
    const search = location.search;
    // Redirect to localhost:8080/gmail/callback with the same query params
    window.location.replace(`http://localhost:8000/gmail/callback${search}`);
  }, [location.search]);

  return <div>Redirecting...</div>;
};

export default GmailCallback;
