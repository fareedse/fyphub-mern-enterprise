import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import ProjectCard from '../components/ProjectCard';
import { Loading, Empty } from '../components/UI';
import { whatsappLink } from '../utils/whatsapp';
export default function Home(){
    const [data,setData]=useState({projects:[],testimonials:[],course:null,loading:true});
    useEffect(()=>{Promise.all([api.get('/projects/featured'),
        api.get('/testimonials'),
        api.get('/course')]).then(
            ([p,t,c])=>setData({projects:p.data.items,
                testimonials:t.data.items,course:c.data.item,loading:false})).catch(
                    ()=>setData(d=>({...d,loading:false})))},
                    []);
                    return (
                         <>
                         <section className="hero">
                            <div className="container hero-grid">
                                <div>
                                    <span className="eyebrow">Premium Final Year Projects</span>
                                    <h1>Buy Complete FYP Projects With Demo</h1>
                                    <p className="lead">FYP Hub helps students get professionally built projects, documentation, presentations, video demos, and installation support.</p>
                                    <div className="actions">
                                        <Link className="btn primary" to="/projects">
                                        Browse Projects
                                        </Link>
                                        <a className="btn dark" href={whatsappLink('Hi FYP Hub, I want to discuss a final year project.')} target="_blank">Book on WhatsApp</a>
                                        </div>
                                        </div>
                                        <div className="hero-card">
                                            <h2>What You Get</h2>
                                            {['Complete source code','Professional documentation','PPT + video demo','Database schema','Installation help','Customization support'].map(x=>
                                            <p key={x}>✅ {x}</p>)}
                                            </div>
                                            </div>
                                            </section>
                                            <section className="section">
                                                <div className="container stats">{[['5000+','Students Helped'],['350+','Projects Delivered'],['24/7','WhatsApp Support'],['4.9/5','Average Rating']].map(([n,l])=>
                                                    <div className="stat" key={l}><b>{n}</b><p>{l}</p></div>)}
                                                    </div>
                                                    </section>
                                                    <section className="section">
                                                        <div className="container">
                                                            <div className="section-head"><div>
                                                                <h2>Featured Projects</h2>
                                                                <p className="muted">Ready-made commercial quality projects for university submissions.</p>
                                                                </div>
                                                                <Link className="btn ghost" to="/projects">View All
                                                                </Link>
                                                                </div>
                                                                {data.loading?<Loading rows={3}/>:data.projects.length?
                                                                <div className="card-grid">{data.projects.map(p=><ProjectCard key={p._id} project={p}/>)}
                                                                </div>
                                                                :<Empty title="No featured projects"/>}
                                                                </div>
                                                                </section>
                                                                <section className="section">
                                                                    <div className="container two-col">
                                                                        <div className="panel">
                                                                            <h2>{data.course?.title || 'MERN Stack Mastery Course'}
                                                                                </h2>
                                                                                <p className="lead">Learn how to build real-world full-stack apps with React, Node, Express and MongoDB.</p>
                                                                                <div className="tags">{(data.course?.benefits||[]).map(b=>
                                                                                    <span className="tag" key={b}>{b}
                                                                                    </span>)}
                                                                                    </div>
                                                                                    <a className="btn primary" href={whatsappLink(data.course?.whatsappMessage || 'I want to enroll in MERN course')} target="_blank">Enroll Now</a>
                                                                                    </div><div className="panel">
                                                                                        <h2>Trusted By Students</h2>
                                                                                        {data.testimonials.map(t=><blockquote key={t._id} className="card">
                                                                                            <b>{'★'.repeat(t.rating)}</b>
                                                                                            <p>{t.review}</p><b>{t.name}</b>
                                                                                            <p className="muted">{t.program}</p>
                                                                                            </blockquote>)}</div>
                                                                                            </div>
                                                                                            </section>
                                                                                            <section className="section">
                                                                                                <div className="container panel" style={{textAlign:'center'}}>
                                                                                                    <h2>Need a Custom Project?</h2>
                                                                                                    <p className="lead">Share your idea, deadline, budget and university requirements. We will guide you.</p>
                                                                                                    <Link className="btn primary" to="/contact">Submit Inquiry</Link>
                                                                                                    </div>
                                                                                                    </section>
                                                                                                    </>
                                                                                                    )}
