import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Link } from 'react-router-dom'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
    a {
      text-decoration: none;
    }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
    label {
      margin: 10px;
      color:  #254b62;
    }
    input {
      width: 100%;
      height: 20px;
    }
`

const Header = styled.h1`
  color:  #254b62;
  font-size: 40px;
  margin-top: 40px;
`

const Text = styled.h2`
  color:  #254b62;
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 1px;
`

export const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const url = 'https://anna-project-auth.herokuapp.com/sessions'
  // posts email and password to the api

  const handleLogin = event => {
    event.preventDefault()
    fetch('url', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    //Här ska det komma en .then av något slag 
    //vi behöver local storage någonstans
  }

  return (
    <Section>
      <Header> Welcome</Header>
      <Form>
        <label for='email'>Email  <input type='text' id='email' name='email' /> </label>
        <label for='password'>Password  <input type='text' id='password' name='password' /> </label>
      </Form>
      <Button title='Login' onClick={handleLogin} />
      <Text>New user? Sign up here. </Text>
      <Link to={'/signup'}>
        <Button title='Register' />
      </Link>
    </Section>
  )
}