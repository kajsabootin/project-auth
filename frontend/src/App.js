import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from 'components/Login'
import { Signup } from 'components/Signup'

// Home page: Login form and a button that redirects with React routes to sign up-form
// After sign up: Redirects back to home page for login
// After login: A page to show the authenticated content from the API
// A 'sign out' button which removes the saved access token and redirects the user to the login form

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
