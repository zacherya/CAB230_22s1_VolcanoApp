import React, { createContext, useReducer, useEffect } from "react";
import AuthReducer from "../helpers/AuthReducer";
import { toast } from "react-toastify";

import DataService from "./DataRequestService";
import Endpoints from "../helpers/Endpoints";

import { encrypt, decrypt } from "../helpers/Crypto";

const InitalState = {
  user: localStorage.getItem("user")
    ? JSON.parse(decrypt(localStorage.getItem("user")))
    : null,
  isLoggingIn: false,
  error: false,
  showLoginModal: false,
  showRegisterModal: false,
};

const AuthContext = createContext(InitalState);

const dataService = new DataService();

const LoginEp = Endpoints().auth().login();
const RegisterEp = Endpoints().auth().register();

let timeout;

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, InitalState);

  useEffect(() => {
    return () => {
      clearSessionTimeout();
      if (state.user !== null && state.user !== undefined) {
        console.log("user set");
        localStorage.setItem("user", encrypt(JSON.stringify(state.user)));
        activateSessionTimer(state.user.expires_in);
      }
    };
  }, [state.user]);

  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const activateSessionTimer = async (tokenTimeout) => {
    console.log(`Session expires in ${tokenTimeout} seconds`);
    timeout = setTimeout(() => {
      detachSession();
      toast.warning("Your session has expired. Please login again.");
    }, tokenTimeout * 1000);
  };

  const triggerLoginModal = () => {
    dispatch({ type: "login_modal_trigger" });
  };
  const triggerRegisterModal = () => {
    dispatch({ type: "register_modal_trigger" });
  };

  const login = async (username, password) => {
    console.log("login");
    //Add login promise here
    const req = await dataService.Req(LoginEp, {
      email: username,
      password: password,
    });
    switch (req.status) {
      case 200:
        const jwt = await req.json();
        dispatch({
          type: "login_success",
          payload: {
            email: username,
            token: jwt.token,
            token_type: jwt.token_type,
            expires_in: jwt.expires_in,
          },
        });
        toast.success(`Welcome ${username ?? "Unknown user"}`);
        break;
      case 401:
        toast.error("Invalid username or password. Try again.");
        break;
      case 400:
        toast.error("Either your username or password is missing.");
        break;
      default:
        console.log(req);
        break;
    }
    // activateSessionTimer(5000*10);
  };

  const register = async (username, password) => {
    console.log("register");
    //Add login promise here
    dispatch({ type: "login_process" });
    const req = await dataService.Req(RegisterEp, {
      email: username,
      password: password,
    });
    switch (req.status) {
      case 201:
        triggerRegisterModal();
        toast.success("Registration successful. Please login.");
        break;
      case 409:
        toast.error("This user already exists. Try logging in.");
        break;
      case 400:
        toast.error("Either your username or password is missing.");
        break;
      default:
        console.log(req);
        break;
    }
    // activateSessionTimer(5000*10);
  };

  const detachSession = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    dispatch({ type: "logout" });
  };

  const logout = () => {
    detachSession();
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !(state.user === null || state.user === undefined),
        user: state.user,
        login: login,
        logout: logout,
        register: register,
        loginModalTrigger: triggerLoginModal,
        registerModalTrigger: triggerRegisterModal,
        loginModalStatus: state.showLoginModal,
        registerModalStatus: state.showRegisterModal,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
