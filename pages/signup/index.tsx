import s from './SignUp.module.css';
import Nav from '@/components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import { useEffect,  useState } from 'react';
import { countries } from '@/utils/countries';
import { useSignup } from '@/hooks/useSignup';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import Head from 'next/head';



type FE = React.FormEvent<HTMLFormElement>
type CE = React.ChangeEvent<HTMLInputElement>

interface valueFields {
  fullName: string,
  username: string,
  email: string,
  phoneNumber: string,
  country: string,
  referral: string,
  policyChecked: boolean,
  showPassword?: boolean,
}

interface errorFields {
    fullName: string | null,
    username: string | null,
    email: string | null,
    password: string | null,
    phoneNumber: string | null,
    country: string | null,
    referral: string | null,
    policyChecked: string | null,
  }


export default function SignUp() {
  const { authIsReady, user } = useAuth()
  const navigate = useRouter()
  const {signUp, isPending, error} = useSignup()
  const [password, setPassword] = useState("");
  const [values, setValues] = useState<valueFields>({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    country: "",
    referral: '',
    policyChecked: false,
    showPassword: false,
  });

  const [formError, setFormError] = useState<errorFields>({
    fullName: null,
    username: null,
    email: null,
    password: null,
    phoneNumber: null,
    country: null,
    referral: null,
    policyChecked: null,
  })


  // handling change for input fields
  const handleChange = (prop: string|any) => (e: CE) => {
    setValues({ ...values, [prop]: e.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling password toggle mode
  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword });
  };

  // handling mouse event 
  const handleMouseDownPassword = (e: any) => {
    e.preventDefault();
  };

  // handling checkbox
  const handleCheckBox = (e: CE) => {
    setValues({...values, policyChecked: e.target.checked});
    setFormError({ ...formError, policyChecked: null })
  };


  // handling form submit
  const handleSubmit = (e: FE) => {
    e.preventDefault();
    const data = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      country: values.country,
      referral: values.referral,
      password: password,
    };

    // validating form
    if(values.fullName === "" || values.fullName.length < 3) {
      setFormError({...formError, fullName: "name can't be null or < 3 characters"});
      return
    }

    if(values.username === "" || values.username.length < 3) {
      setFormError({...formError, username: "Username can't be null or < 3 characters"});
      return
    }

    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }

    if(values.phoneNumber === "" || values.phoneNumber.length < 5) {
      setFormError({...formError, phoneNumber: "Phone Number is invalid"});
      return
    }

    if(values.country === "") {
      setFormError({...formError, country: "Select Your Country"});
      return
    }

    if(password === "" || password.length < 6) {
      setFormError({...formError, password: "Password can't be null or < 6 characters"});
      return
    }

    if(values.policyChecked === false) {
      setFormError({...formError, policyChecked: "Please agree to the terms and conditions"});
      return
    }

    // sending data to server
    console.log(data);
    signUp(data);

  };


  useEffect(() => {
  if(user) {
    navigate.push('/dashboard/home')
  }
  console.log(values.referral)
  }, [user, navigate]);


  return ((authIsReady && !user) &&
  <>
    <Head>
      <title>CTM PRO | Create An Account</title>
      <meta name="description" content="Register For An Account On CTM PRO"/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:site_name" content="CTM PRO | Auto Crypto Flipping System" />
      <meta property="og:locale" content="en_US" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="formCtn">
      <Nav black={true}/>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create An Account</h1>
        <TextField 
        id="full_name" 
        label="Full Name" 
        variant="outlined" 
        name="fullName"
        type="text" 
        {...(formError.fullName && {error: true, helperText: formError.fullName})}
        autoComplete='off'
        onChange={handleChange("fullName")}/>

        <TextField 
        id="username" 
        label="Username" 
        variant="outlined" 
        type="text" 
        autoComplete='off'
        {...(formError.username && {error: true, helperText: formError.username})}
        onChange={handleChange("username")}/>

        <TextField 
        id="email" 
        label="Email" 
        variant="outlined" 
        name='email'
        type="email" 
        autoComplete='off'
        {...(formError.email && {error: true, helperText: formError.email})}
        onChange={handleChange("email")}/>

        <TextField 
        id="phoneNumber" 
        label="Phone Number" 
        variant="outlined" 
        name='phoneNumber'
        type="tel" 
        autoComplete='off'
        {...(formError.phoneNumber && {error: true, helperText: formError.phoneNumber})}
        onChange={handleChange("phoneNumber")}/>

        <FormControl fullWidth>
        <InputLabel id="country">Country</InputLabel>
        <Select
          id="country"
          value={values.country}
          label="Country"
          {...(formError.country && {error: true})}
          onChange={(e) => {
            setValues({...values, country: e.target.value})
            setFormError({...formError, country: null})
          }}>
          {countries.map((country, i) => (
            <MenuItem key={i} value={country.country}>{country.country}</MenuItem>
            ))}
        </Select>
        </FormControl>

        {/* password input and event */}
        <FormControl sx={{ width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            inputProps={{
              autoComplete: 'new-password',
            }}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...(formError.password && {error: true, helperText: formError.password})}
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
        <TextField 
        id="referral_code" 
        label="Referral Code(Optional)" 
        variant="outlined" 
        onChange={handleChange("referral")}/>

        <div className={s.checkbox}>
          <input type="checkbox" onChange={(e) => handleCheckBox(e)}/>
          <p>I agree to the <Link href="#">Terms and Condition</Link></p>
        </div>
        {formError.policyChecked && <p className={s.error}>{formError.policyChecked}</p>}
        {error && <p className="formError">{error}</p>}

        {!isPending && <button className="bigBtn full" type='submit'>Sign up</button>}
        {isPending && <button disabled className="bigBtn full load"><PulseLoader color='#000000' size={10}/> </button>}
        {error && <p className="formError">{error}</p>}
        
      <Link href="/login" className={s.link}>Already have an account? Login</Link>
      </form>

    </div>
    </>
  );
}
