// src/pages/AuthSuccess.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';

export default function OauthSuccess() {
  const navigate = useNavigate();
  const {  googleAuth } = useUserStore();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
   

    if (token) {
   

        googleAuth(
            decodeURIComponent(token),
           
      );
setTimeout(()=>{
    navigate("/")
} , 1000)
     ; // Redirect to homepage
    } else {
      // If failed or no token
      navigate("/login?error-google_auth_failed");
    }
  }, []);

  return <p>Logging you in... Please wait.</p>;
}
