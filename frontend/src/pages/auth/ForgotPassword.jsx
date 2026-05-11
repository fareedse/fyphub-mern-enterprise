import { useState } from 'react';
import toast from 'react-hot-toast';
import api,{getError} from '../../api/client';
import { Field } from '../../components/UI';
export default function ForgotPassword(){const [email,setEmail]=useState('');const submit=async(e)=>{e.preventDefault();try{await api.post('/auth/forgot-password',{email});toast.success('Reset instructions sent if email exists')}catch(err){toast.error(getError(err))}};return <div className="auth-wrap"><form className="auth-card" onSubmit={submit}><h1>Forgot Password</h1><Field label="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/><br/><button className="btn primary" style={{width:'100%'}}>Send Reset Link</button></form></div>}
