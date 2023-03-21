import s from './Login.module.css';
import Nav from '@/components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import { useLogin } from '@/hooks/useLogin';
import Head from 'next/head';

interface formErrors {
  email: string | null,
  password: string | null,
}

type FE = React.FormEvent<HTMLFormElement>
type CE = React.ChangeEvent<HTMLInputElement>


export default function Login() {
  const { authIsReady, user } = useAuth()
  const { login, isPending, error } = useLogin()
  const navigate = useRouter()
  const [formError, setFormError] = useState<formErrors>({
    email: null,
    password: null,
  })
  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const handleChange = (prop: string) => (e: CE) => {
    setValues({ ...values, [prop]: e.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword});
  };

  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };



  // handling login
  const handleLogin = (e: FE) => {
    e.preventDefault()
    const data = {
      email: values.email,
      password: values.password,
    }
    
    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }
    if(values.password.length < 6) {
      setFormError({...formError, password: "Invalid Password"});
      return
    }

    login(data)
  }

  useEffect(() => {
    if(user) {
      navigate.push('/dashboard/home')
    }
  }, [user, navigate])


  return ((authIsReady && !user) &&
  <>
    <Head>
      <title>CTM PRO | Login</title>
      <meta name="description" content="Login your profile" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content="CTM PRO | Auto Crypto Flipping System" />
      <meta property="og:locale" content="en_US" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="formCtn">
      <Nav black={true}/>
      <form className="form" onSubmit={handleLogin} autoComplete="off">
        <h1>Welcome Back!</h1>
        <TextField 
        label="Email" 
        variant="outlined" 
        autoComplete='off'
        onChange={handleChange('email')}
        {...(formError.email && {error: true, helperText: formError.email})}/>

        {/* password input and event */}
        <FormControl sx={{ width: '100%'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            autoComplete= 'new-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            {...(formError.password && {error: true, helperText: formError.password})}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        {!isPending && <button className="bigBtn full">Login</button>}
        {isPending && <button disabled className="bigBtn full load"><PulseLoader color='#000000' size={10}/> </button>}
        {error && <p className="formError">{error}</p>}
        
      <Link href="/signup" className={s.link}>Don&apos;t Have An Account?</Link>
      <Link href="/forgotpassword" className={s.link2}>Forgot Password?</Link>
      </form>

    </div>
    </>
  )
}