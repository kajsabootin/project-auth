import React, { useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`

`

export const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const url = 'https://anna-project-auth.herokuapp.com/sessions'
  // posts email and password to the api

  const handelLogin = event => {
    event.preventDefault()
    fetch('url', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => {
      window.location.reload()
    })
  } //Här ska det komma en .then av något slag 
  //vi behöver local storage någonstans

  return (
    <Section>
      <form>
        <label for='email'>Email </label>
        <input type='text' id='email' name='email' />
        <label for='password'>Password </label>
        <input type='text' id='password' name='password' />
      </form>
    </Section>
  )
}