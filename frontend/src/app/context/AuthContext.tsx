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

      console.log(
        "1 fetchUser start"
      );

      try {

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/`,
            {
              credentials:
                "include",
            }
          );

        console.log(
          "2 profile status:",
          res.status
        );

        if (!res.ok) {

          console.log(
            "3 profile failed"
          );

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

        console.log(
          "4 profile success:",
          data
        );

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
          "5 auth fetch failed",
          err
        );

        setUser(
          null
        );

      } finally {

        console.log(
          "6 loading false"
        );

        setLoading(
          false
        );
      }
    };

  useEffect(() => {

    console.log(
      "7 useEffect start"
    );

    const savedUser =
      localStorage.getItem(
        "user"
      );

    console.log(
      "8 saved user:",
      savedUser
    );

    if (
      savedUser
    ) {

      console.log(
        "9 set saved user"
      );

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

      console.log(
        "10 logout start"
      );

      try {

        console.log(
          "11 logout api call"
        );

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/logout/`,
            {
              method:
                "POST",

              credentials:
                "include",
            }
          );

        console.log(
          "12 logout done:",
          res.status
        );

      } catch (
        err
      ) {

        console.error(
          "13 logout error",
          err
        );

      } finally {

        console.log(
          "14 set user null"
        );

        setUser(
          null
        );

        console.log(
          "15 remove localstorage"
        );

        localStorage.removeItem(
          "user"
        );

        console.log(
          "16 redirect home"
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