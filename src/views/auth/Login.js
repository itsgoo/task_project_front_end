import React, { useState, useEffect } from 'react';
import linkToServerSide from '../app/LinkToServerSide';
import linkToClientSide from '../app/LinkToClientSide';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace(linkToClientSide)
    } else {
      setLoading(false)
    }
  }, [])

  const onSubmit = e => {
    e.preventDefault()

    const user = {
	  username: username,
      password: password
    };

    fetch(linkToServerSide + 'auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear()
          localStorage.setItem('token', data.key)
          localStorage.setItem('username', username)
          window.location.replace('http://localhost:3000')
        } else {
          setUsername('')
          setPassword('')
          localStorage.clear()
          setErrors(true)
        }
      })
  }

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form onSubmit={onSubmit} className="col-md-3" >
			<div className="form-group">
				<label htmlFor='username'>Username:</label> <br />
				<input
				className="form-control"
				name='username'
				type='username'
				value={username}
				required
				onChange={e => setUsername(e.target.value)}
				/>{' '}
			</div>
			<div className="form-group">
				<label htmlFor='password'>Password:</label> <br />
				<input
					className="form-control"
					name='password'
					type='password'
					value={password}
					required
					onChange={e => setPassword(e.target.value)}
				/>{' '}
			</div>
         
		  <button type="submit" className="btn btn-primary" value='Login'>Login</button>
        </form>
      )}










    </div>
  )
}

export default Login