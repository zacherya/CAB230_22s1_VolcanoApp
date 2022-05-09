import React from 'react'

const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { 
      authenticated: false,
      user: {
          fullName: 'John Smith',
          email: 'test@test.com',
      },
      showLoginModal: false,
      showRegisterModal: false,
    }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.triggerLoginModal = this.triggerLoginModal.bind(this)
    this.triggerRegisterModal = this.triggerRegisterModal.bind(this)
  }

  triggerLoginModal() {
    this.setState({ showRegisterModal: false, showLoginModal: !this.state.showLoginModal })
  }
  triggerRegisterModal() {
    this.setState({ showLoginModal: false, showRegisterModal: !this.state.showRegisterModal })
  }

  login() {
    setTimeout(() => this.setState({ authenticated: true }), 1000)
  }

  logout() {
    this.setState({ authenticated: false })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
            authenticated: this.state.authenticated,
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
