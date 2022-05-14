
import React, {createContext,useReducer,useEffect} from 'react'
import AuthReducer from '../helpers/AuthReducer'
import { toast } from 'react-toastify';

import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

const secret = 'cab230';
const InitalState = {
  user: localStorage.getItem("user") ? JSON.parse(decrypt(localStorage.getItem("user"))) : null,
  isLoggingIn: false,
  error: false,
  showLoginModal: false,
  showRegisterModal: false,
};

const AuthContext = createContext(InitalState);

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, InitalState);
    
    useEffect(() => {
      console.log("user set");
      if(state.user !== null && state.user !== undefined){
        localStorage.setItem("user", encrypt(JSON.stringify(state.user)));
        toast.success(`Welcome ${state.user.email ?? "Unknown user"}`);
      }
      
    }, [state.user]);

  const activateSessionTimer = async (tokenTimeout) => {
    setTimeout(() => {
      detachSession();
      toast.warning("Your session has expired. Please login again.");
    }, tokenTimeout)
  }

  const triggerLoginModal = () => {
    dispatch({type:"login_modal_trigger"});
  }
  const triggerRegisterModal = () => {
    dispatch({type:"register_modal_trigger"});
  }

  const login = (username,password) => {
    //Add login promise here
    dispatch({type:"login_success",payload:{email:username,token:"123",token_type:"Bearer",expires_in:5000}});
    activateSessionTimer(5000);
  }

  const detachSession = () => {
    dispatch({type:"logout"});
    localStorage.removeItem("user");
  }

  const logout = () => {
    detachSession();
    toast.success("Logout Successful");
  }

  return (
      <AuthContext.Provider
        value={{
            authenticated: !(state.user === null || state.user === undefined),
            user: state.user,
            login: login,
            logout: logout,
            loginModalTrigger: triggerLoginModal,
            registerModalTrigger: triggerRegisterModal,
            loginModalStatus: state.showLoginModal,
            registerModalStatus: state.showRegisterModal,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    ) 
}


function encrypt(string) {
  const ciphertext = AES.encrypt(string, secret);
  return encodeURIComponent(ciphertext.toString());
}
function decrypt(string) {
  const decodedStr = decodeURIComponent(string);
  return AES.decrypt(decodedStr, secret).toString(enc.Utf8);
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
