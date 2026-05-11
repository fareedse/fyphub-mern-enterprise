import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api,{getError} from '../../api/client';
import { Field } from '../../components/UI';
export default function ResetPassword(){const {token}=useParams();const nav=useNavigate();const [password,setPassword]=useState(''),[confirm,setConfirm]=useState('');const submit=async(e)=>{e.preventDefault();if(password!==confirm)return toast.error('Passwords do not match');try{await api.post(`/auth/reset-password/${token}`,{password});toast.success('Password reset successful');nav('/login')}catch(err){toast.error(getError(err))}};return <div className="auth-wrap"><form className="auth-card" onSubmit={submit}><h1>Reset Password</h1><Field label="New Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><Field label="Confirm Password" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}/><br/><button className="btn primary" style={{width:'100%'}}>Reset Password</button></form></div>}
