import React, { createContext, useReducer, useEffect } from "react";
import AuthReducer from "../helpers/AuthReducer";
import { toast } from "react-toastify";

import DataService from "./DataRequestService";
import Endpoints from "../helpers/Endpoints";

import { encrypt, decrypt } from "../helpers/Crypto";

var InitalState;
try {
  InitalState = {
    user: localStorage.getItem("user")
      ? JSON.parse(decrypt(localStorage.getItem("user")))
      : null,
    isLoggingIn: false,
    error: false,
    showLoginModal: false,
    showRegisterModal: false,
  };
} catch {
  localStorage.removeItem("user");
  InitalState = {
    user: null,
    isLoggingIn: false,
    error: false,
    showLoginModal: false,
    showRegisterModal: false,
  };
}

const AuthContext = createContext(InitalState);

const dataService = new DataService();

const LoginEp = Endpoints().auth().login();
const RegisterEp = Endpoints().auth().register();

var interval;

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, InitalState);

  useEffect(() => {
    clearSessionTimeout();
    if (state.user !== null && state.user !== undefined) {
      if (state.user.expires_at < new Date().getTime()) {
        toast.warning(
          "Your session had expired while you were away. Please login again."
        );
        detachSession();
        return;
      }
      console.log("user set");
      localStorage.setItem("user", encrypt(JSON.stringify(state.user)));
      activateSessionTimer();
    }
  }, [state.user]);

  const clearSessionTimeout = () => {
    clearInterval(interval);
  };

  const activateSessionTimer = async () => {
    console.log(`Session expires in ${state.user.expires_in} seconds`);
    interval = setInterval(async () => {
      if (state.user.expires_at < new Date().getTime()) {
        detachSession();
        toast.warning("Your session has expired. Please login again.");
      }
    }, 2000);
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
            expires_at: new Date().getTime() + jwt.expires_in * 1000,
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
  };

  const register = async (username, password) => {
    console.log("register");
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
  };

  const detachSession = () => {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
    clearSessionTimeout();
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
