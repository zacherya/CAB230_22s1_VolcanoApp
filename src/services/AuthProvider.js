
import React, {createContext,useReducer,useEffect,useContext} from 'react'
import AuthReducer from '../helpers/AuthReducer'

const InitalState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggingIn: false,
  error: false,
  showLoginModal: false,
  showRegisterModal: false,
};

const AuthContext = createContext(InitalState);

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, InitalState);
    
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

  // const activateSessionTimer = async (tokenTimeout) => {
  //   setTimeout(() => {
  //     console.log('Session Timer');
  //   }, tokenTimeout)
  // }

  const triggerLoginModal = () => {
    dispatch({type:"login_modal_trigger"});
    // this.setState({ showRegisterModal: false, showLoginModal: !this.state.showLoginModal })
  }
  const triggerRegisterModal = () => {
    dispatch({type:"register_modal_trigger"});
    // this.setState({ showLoginModal: false, showRegisterModal: !this.state.showRegisterModal })
  }

  const login = (callback) => {
    dispatch({type:"login_success"}, {email:"test@test.com",token:"123",token_type:"Bearer",expires_in:5000});
    // setTimeout(() => {
      
    //   // activateSessionTimer(5000);
    // }, 1000)
  }

  const logout = () => {
    // this.setState({ authenticated: false })
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

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
