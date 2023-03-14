import s from './ForgotPassword.module.css';
import Nav from '@/components/nav/Nav';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TextField } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import useResetPassword from '@/hooks/useResetPassword';
import { PulseLoader } from 'react-spinners';

interface formErrors {
  email: string | null,
}

type FE = React.FormEvent<HTMLFormElement>
type CE = React.ChangeEvent<HTMLInputElement>

export default function ForgotPassword() {
  const { authIsReady, user } = useAuth()
  const { resetPassword, isPending, errorMessage, resetMessage } = useResetPassword()
  const [formError, setFormError] = useState<formErrors>({
    email: null,
  })
  const navigate = useRouter()
  const [values, setValues] = useState({
    email: '',
  });

  const handleChange = (prop: string) => (e: CE) => {
    setValues({ ...values, [prop]: e.target.value });
    setFormError({ ...formError, [prop]: null })
  };

  // handling reset
  const handleReset = (e: FE) => {
    e.preventDefault()

    if(values.email === "" || !values.email.includes("@") || values.email.length < 5) {
      setFormError({...formError, email: "Email is invalid"});
      return
    }
    resetPassword(values.email)
  }

  useEffect(() => {
    if(user) {
      navigate.push('/')
    }
  }, [user, navigate])


  return ((authIsReady && !user) &&
    <div className="formCtn">
      <Nav black={true}/>
      <form className="form" onSubmit={handleReset}>
        <h1>Reset Password</h1>
        <TextField id="email" label="Email" variant="outlined" onChange={handleChange("email")}/>

        {!isPending && <button className="bigBtn full">Reset</button>}
        {isPending && <button disabled className="bigBtn full load"><PulseLoader color='#000000' size={10}/> </button>}
        {errorMessage && <p className="formError">{errorMessage}</p>}
        {resetMessage && <p className={s.success}>{resetMessage}</p>}
        {formError.email && <p className={s.error}>{formError.email}</p>}
        
      <Link href="/login" className={s.link}>Back to Login?</Link>
      </form>

    </div>
  )
}
