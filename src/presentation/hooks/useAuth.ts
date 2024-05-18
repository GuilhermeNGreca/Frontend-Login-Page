import { useState } from "react";
import { Login, getProfile } from "../../data/services/apiService";
import { LoginResponse, ProfileData } from "../../domain/entities/service";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const useAuth = () => {
  const [loginData, setLoginData] = useState<LoginResponse | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleLogin = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      if (!email.trim())
        toast.error("Por favor, insira seu endereço de e-mail.");
      if (!password.trim()) toast.error("Por favor, insira sua senha.");
      return;
    }

    try {
      const data: LoginResponse = await Login(email, password);
      setLoginData(data);

      const accessToken = data.tokens.access;
      localStorage.setItem("token", accessToken);

      const storedToken = localStorage.getItem("token");
      if (storedToken !== null) {
        const profile = await getProfile(storedToken);
        setProfileData(profile);
      } else {
        toast.error("Token não encontrado no localStorage.");
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro durante o login. Por favor, tente novamente."
      );
    }
  };

  const handleLogout = () => {
    setLoginData(null);
    setProfileData(null);
    localStorage.removeItem("token");
  };

  return {
    loginData,
    profileData,
    handleLogin,
    handleLogout,
  };
};
