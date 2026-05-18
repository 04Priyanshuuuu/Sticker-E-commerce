"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<any>(
  null
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [
    user,
    setUser
  ] = useState<any>(
    null
  );

  const [
    loading,
    setLoading
  ] = useState(
    true
  );

  const fetchUser =
    async () => {

      try {

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
            {
              credentials:
                "include",
            }
          );

        if (!res.ok) {

          setUser(
            null
          );

          localStorage.removeItem(
            "user"
          );

          return;
        }

        const data =
          await res.json();

        setUser(
          data
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            data
          )
        );

      } catch (err) {

        console.error(
          "Auth fetch failed",
          err
        );

        setUser(
          null
        );

      } finally {

        setLoading(
          false
        );
      }
    };

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (
      savedUser
    ) {

      setUser(
        JSON.parse(
          savedUser
        )
      );
    }

    fetchUser();

  }, []);


  const logout =
    async () => {

      try {

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
          {
            method:
              "POST",

            credentials:
              "include",
          }
        );

      } catch (
        err
      ) {

        console.error(
          err
        );

      } finally {

        setUser(
          null
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href =
          "/";
      }
    };

  return (
    <AuthContext.Provider
      value={{

        user,

        setUser,

        logout,

        loading

      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth =
  () =>
    useContext(
      AuthContext
    );