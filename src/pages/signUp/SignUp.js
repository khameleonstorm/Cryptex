import styles from './SignUp.module.css';
import Nav from '../../components/nav/Nav';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import {MdVisibilityOff, MdVisibility} from "react-icons/md"
import {AiFillCamera} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { countries } from '../../utils/countries';
import { useSignup } from '../../hooks/useSignup';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';


export default function SignUp() {
  const form = useRef();
  const { authIsReady, user } = useAuth()
  const navigate = useNavigate()
  const {signUp, isPending, error} = useSignup()
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    country: "",
    image: {},
    referral: '',
    policyChecked: false,
    showPassword: false,
  });

  const [formError, setFormError] = useState({
    fullName: null,
    username: null,
    email: null,
    phoneNumber: null,
    country: null,
    image: null,
    referral: null,
    policyChecked: null,
  })


  // handling change for input fields
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling password toggle mode
  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword });
  };

  // handling mouse event 
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // handling image upload
  const handleImageUpload = (e) => {
    setValues({...values, image: e.target.files[0] });
  };

  // handling checkbox
  const handleCheckBox = (prop) => (e) => {
    setValues({...values, [prop]: e.target.checked});
    setFormError({ ...formError, [prop]: null })
  };


  // handling form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      fullName: values.fullName,
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      country: values.country,
      image: values.image,
      referral: values.referral,
      password: password,
    };

    // validating form
    if(values.fullName === "") {
      setFormError({...formError, fullName: "Full name is invalid"});
      return
    }

    if(values.fullName.length < 3) {
      setFormError({...formError, fullName: "Full name is too short"});
      return
    }

    if(values.username === "") {
      setFormError({...formError, username: "Username is invalid"});
      return
    }

    if(values.username.length < 3) {
      setFormError({...formError, username: "Username is too short"});
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

    if(values.image === {} || values.image === undefined) {
      setFormError({...formError, image: "Image is invalid"});
      return
    }

    if(values.image.size > 5000000) {
      setFormError({...formError, image: "Image size is too large"});
      return
    }

    if(password === "") {
      setFormError({...formError, password: "Password is invalid"});
      return
    }

    if(password.length < 6) {
      setFormError({...formError, password: "Password is too short"});
      return
    }

    if(values.policyChecked === false) {
      setFormError({...formError, policyChecked: "Please agree to the terms and conditions"});
      return
    }

    // sending data to server
    signUp(data);

    console.log(data);
  };


  useEffect(() => {
  if(user) {
    navigate('/dashboard')
  }
  }, [user, navigate]);


  return ((authIsReady && !user) &&
    <div className="formCtn">
      <Nav black={true}/>
      <form className="form" onSubmit={handleSubmit} ref={form}>
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
          labelId="demo-simple-select-label"
          id="country"
          value={values.country}
          label="Country"
          {...(formError.country && {error: true})}
          onChange={handleChange('country')}
        >
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
        <div className={styles.upload}>
          <p>{values.image.name === undefined? "Upload Profile Picture" : `${values.image.name}`}</p>
          {formError.image && <p className={styles.error}>{formError.image}</p>}
          <input accept="image/*" type="file" onChange={handleImageUpload}/>
          <AiFillCamera />
        </div>
        <TextField 
        id="referral_code" 
        label="Referral Code(Optional)" 
        variant="outlined" 
        onChange={handleChange("referral")}/>

        <div className={styles.checkbox}>
          <input type="checkbox" onClick={handleCheckBox("policyChecked")}/>
          <p>I agree to the <Link to="/policy">Terms and Condition</Link></p>
        </div>
        {formError.policyChecked && <p className={styles.error}>{formError.policyChecked}</p>}
        {formError.emailChecked && <p className={styles.error}>{formError.emailChecked}</p>}
        {error && <p className="formError">{error}</p>}

        {!isPending && <button className="bigBtn full">Sign up</button>}
        {isPending && <button disabled className="bigBtn full load"><PulseLoader color='#000000' size={10}/> </button>}
        {error && <p className="formError">{error}</p>}
        
      <Link to="/login" className={styles.link}>Already have an account? Login</Link>
      </form>

    </div>
  );
}
