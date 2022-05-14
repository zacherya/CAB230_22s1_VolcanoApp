const AuthReducer = (state, action) => {
    switch (action.type) {
      case "login_init":
        return {
          user: null,
          isLoggingIn: true,
          error: false,
          showLoginModal: false,
          showRegisterModal: false,
        };
      case "login_success":
        return {
          user: action.payload,
          isLoggingIn: false,
          error: false,
          showLoginModal: false,
          showRegisterModal: false,
        };
      case "login_bad":
        return {
          user: null,
          isLoggingIn: false,
          error: true,
          showLoginModal: true,
          showRegisterModal: false,
        };
      case "logout":
        return {
          user: null,
          isLoggingIn: false,
          error: false,
          showLoginModal: false,
          showRegisterModal: false,
        };
        case "login_modal_trigger":
        return {
            ...state,
            showLoginModal: !state.showLoginModal,
            showRegisterModal: false,
        };
        case "register_modal_trigger":
        return {
            ...state,
            showLoginModal: false,
            showRegisterModal: !state.showRegisterModal,
        };
    
      default:
        return { ...state };
    }
  };
  
  export default AuthReducer;