import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthConsumer } from '../services/AuthProvider'

// const RouteProtected = ({ element: Element, ...rest }) => (
//   <AuthConsumer>
//     {({ authenticated }) => (
//       <Route
//         render={props =>
//             authenticated ? <Element {...props} /> : <Navigate to="/" />
//         }
//         {...rest}
//       />
//     )}
//   </AuthConsumer>
// )

function RouteProtected({ redirectTo, children }) {
  <AuthConsumer>
    {({ authenticated }) => (
      authenticated ? children : <Navigate to={redirectTo} />
    )}
  </AuthConsumer>
  
}

export default RouteProtected
