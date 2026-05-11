import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { Loading } from '../components/UI';
export default function BlogDetails(){const {slug}=useParams();const [b,setB]=useState(null);useEffect(()=>{api.get(`/blogs/${slug}`).then(r=>setB(r.data.item))},[slug]);if(!b)return <section className="section"><div className="container"><Loading rows={1}/></div></section>;return <section className="section"><div className="container" style={{maxWidth:850}}><p><Link to="/blogs">Blogs</Link> / {b.title}</p><span className="badge">{b.category}</span><h1 className="page-title">{b.title}</h1><p className="muted">{b.author} • {b.readTime}</p><img src={b.featuredImage} style={{borderRadius:24,width:'100%',maxHeight:420,objectFit:'cover'}}/><div className="panel" style={{marginTop:25,lineHeight:1.8,fontSize:18}}>{b.content}</div><button className="btn primary" onClick={()=>{navigator.clipboard.writeText(location.href);toast.success('Blog link copied')}}>Copy Link</button></div></section>}
