
import React, {createContext,useReducer,useEffect,useCon} from 'react'
import AuthReducer from '../helpers/AuthReducer'

const InitalState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggingIn: false,
  error: false,
  showLoginModal: false,
  showRegisterModal: false,
};

const AuthContext = createContext(InitalState);

// function AuthProvider(props) {
//   const ctx = useContext(AuthContext);
//   const [state, dispatch] = useReducer(AuthReducer, InitalState);
    
//     useEffect(() => {
//       localStorage.setItem("user", JSON.stringify(state.user));
//     }, [state.user]);

//   async function activateSessionTimer(tokenTimeout) {
//     setTimeout(() => {
//       console.log('Session Timer');
//     }, tokenTimeout)
//   }

//   function triggerLoginModal() {
//     // this.setState({ showRegisterModal: false, showLoginModal: !this.state.showLoginModal })
//   }
//   function triggerRegisterModal() {
//     // this.setState({ showLoginModal: false, showRegisterModal: !this.state.showRegisterModal })
//   }

//   function login(callback) {
//     setTimeout(() => {
      
//       ctx.dispatch("login_success", {email:"test@test.com",token:"123",token_type:"Bearer",expires_in:5000});
//       activateSessionTimer(5000);
//     }, 1000)
//   }

//   function logout() {
//     this.setState({ authenticated: false })
//   }
//   return (
//       <AuthContext.Provider
//         value={{
//             authenticated: (state.user !== null || state.user !== undefined),
//             user: state.user,
//             login:login(),
//             logout: logout(),
//             loginModalTrigger: triggerLoginModal(),
//             registerModalTrigger: triggerRegisterModal(),
//             loginModalStatus: state.showLoginModal,
//             registerModalStatus: state.showRegisterModal,
//         }}
//       >
//         {this.props.children}
//       </AuthContext.Provider>
//     ) 
// }

class AuthProvider extends React.Component {
     
  

  constructor() {
    super()
    this.state = InitalState;
    
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.triggerLoginModal = this.triggerLoginModal.bind(this)
    this.triggerRegisterModal = this.triggerRegisterModal.bind(this)


    
  }
  

  async activateSessionTimer(tokenTimeout) {
    setTimeout(() => {
      console.log('Session Timer');
    }, tokenTimeout)
  }

  triggerLoginModal() {
    this.setState({ showRegisterModal: false, showLoginModal: !this.state.showLoginModal })
  }
  triggerRegisterModal() {
    this.setState({ showLoginModal: false, showRegisterModal: !this.state.showRegisterModal })
  }

  login(callback) {
    setTimeout(() => {
      this.setState(AuthReducer("login_success", {email:"test@test.com",token:"123",token_type:"Bearer",expires_in:5000}));
      this.activateSessionTimer(5000);
    }, 1000)
  }

  logout() {
    this.setState(AuthReducer("logout", null))
  }

  render() {
    // this.useEffect(() => {
    //   localStorage.setItem("user", JSON.stringify(this.state.user));
    // }, [this.state.user]);

    return (
      <AuthContext.Provider
        value={{
            authenticated: !(this.state.user === null || this.state.user === undefined),
            user: this.state.user,
            login: this.login,
            logout: this.logout,
            loginModalTrigger: this.triggerLoginModal,
            registerModalTrigger: this.triggerRegisterModal,
            loginModalStatus: this.state.showLoginModal,
            registerModalStatus: this.state.showRegisterModal,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
