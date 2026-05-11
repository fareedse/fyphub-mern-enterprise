import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Field } from '../../components/UI';
import { getError } from '../../api/client';
export default function Login(){const [f,setF]=useState({email:'',password:''}),[loading,setLoading]=useState(false);const {login}=useAuth();const nav=useNavigate();const submit=async(e)=>{e.preventDefault();setLoading(true);try{const d=await login(f);toast.success('Login successful');nav(['admin','staff'].includes(d.user.role)?'/admin':'/dashboard')}catch(err){toast.error(getError(err))}finally{setLoading(false)}};return <div className="auth-wrap"><form className="auth-card" onSubmit={submit}><h1>Login</h1><p className="muted">Access your dashboard.</p><Field label="Email" type="email" required value={f.email} onChange={e=>setF({...f,email:e.target.value})}/><br/><Field label="Password" type="password" required value={f.password} onChange={e=>setF({...f,password:e.target.value})}/><br/><button className="btn primary" style={{width:'100%'}} disabled={loading}>{loading?'Logging in...':'Login'}</button><p><Link to="/forgot-password">Forgot Password?</Link> • <Link to="/register">Create Account</Link></p></form></div>}
