import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { ProfileData } from "../../../domain/entities/service";
import { getProfile } from "../../../data/services/apiService";

interface PrivateRouteProps {
  redirectTo?: string;
}

export const Profile: React.FC<PrivateRouteProps> = ({ redirectTo = "/" }) => {
  const storedToken = localStorage.getItem("token");

  const { handleLogout } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClickLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    try {
      handleLogout();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (storedToken) {
          const profile = await getProfile(storedToken);
          setProfileData(profile);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [storedToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 animate-spin dark:text-gray-300 fill-blue-950"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  if (storedToken) {
    return (
      <div className="bg-gray-200 min-h-screen flex flex-col w-full">
        <div className=" bg-white shadow-lg flex justify-end">
          <Link to="/">
            <button
              onClick={handleClickLogout}
              className="bg-blue-950 text-white mr-10 mt-5 mb-5 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            >
              Logout
            </button>
          </Link>
        </div>
        <section className="flex justify-center items-center flex-grow">
          <div className="bg-white rounded-lg shadow-2xl border sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col items-center">
                <p className="font-semibold text-sm">Profile picture</p>
                <img
                  src={profileData?.avatar.high}
                  alt="Avatar"
                  className="rounded-lg"
                />
              </div>
              {profileData && (
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900">
                      Your Name
                    </p>
                    <div className="text-gray-900 bg-gray-200 sm:text-sm rounded-lg w-full p-2.5">
                      {profileData.name}
                    </div>
                  </div>

                  <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 text-white-100">
                      Your E-mail
                    </p>
                    <div className="text-gray-900 bg-gray-200 sm:text-sm rounded-lg w-full p-2.5">
                      {profileData.email}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return <Navigate to={redirectTo} />;
  }
};
