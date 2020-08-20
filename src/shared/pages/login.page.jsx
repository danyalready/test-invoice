import React, { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useHandleValue } from 'shared/hooks/useHandleValue'
import { useStateValue } from 'shared/hooks/useStateValue'
import { storeUsername } from 'shared/utils/username'
import { Form } from 'shared/utils/styles'

import { is } from 'shared/utils/validation'
import axios from 'axios'
import url from 'shared/constants/urls'

function LoginForm() {
  const inputRef = useRef()
  const history = useHistory()
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue()

  const username = useHandleValue('')
  const password = useHandleValue('')

  const submitHandle = (event) => {
    event.preventDefault()

    if (is.password(password.controls.value)) {
      axios
        .get(url.githubCredentials(username.controls.value))
        .then((data) => {
          storeUsername(data.data.login)
          dispatch({ type: 'SET_USER', payload: data.data })
          history.push('/')
        })
        .catch(() => console.log('ERROR: user is not found'))
    } else {
      console.log('ERROR: password is not valid')
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputRef])

  return (
    <Form onSubmit={submitHandle}>
      <input
        type='text'
        name='username'
        placeholder='Имя'
        ref={inputRef}
        {...username.controls}
      />
      <input
        type='password'
        name='password'
        placeholder='Пароль'
        {...password.controls}
      />
      <button>Login</button>
    </Form>
  )
}

export default function LoginPage() {
  return (
    <div>
      <h1>Login page</h1>
      <LoginForm />
    </div>
  )
}
