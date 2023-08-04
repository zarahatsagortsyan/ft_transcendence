import { ReactNode, useState } from "react";
import { useLocation, Navigate, matchPath } from "react-router-dom";
import { AuthContext, useAuth } from "../globals/contexts";
import { logOut } from "../queries/Auth";

export const RedirectWhenAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  if (
    matchPath(location.pathname, "/auth/signin") &&
    localStorage!.getItem("userLogged") === "true"
  )
    return (
      <Navigate to="/app/private-profile" state={{ from: location }} replace />
    );
  return children;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  // console.log('---------------------RequireAuth-----------------');
  if (localStorage!.getItem("userLogged")! === "true"){
    console.log('---------------------RequireAuth-----------------');
  console.log(localStorage.getItem("userName"));
    auth.signin(localStorage.getItem("userName"), () => {});
  }
  else return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  return children;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const signin = (newUser: string | null, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      localStorage.setItem("userLogged", "true");
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    console.log("signout = (callback: VoidFunction)")
    return fakeAuthProvider.signout(() => {
      const postLogout = async () => {
        const result = await logOut();
        if (result !== "error") {
          setUser(null);
          localStorage.clear();
          localStorage.setItem("userLogged", "false");
          callback();
        }
      };
      postLogout();
    });
  };
  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 1); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 1);
  },
};
