import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Empty } from '../../components/UI';
export default function MyInquiries(){const [items,setItems]=useState([]);useEffect(()=>{api.get('/user/inquiries').then(r=>setItems(r.data.items))},[]);return <><div className="admin-header"><h1>My Inquiries</h1><Link className="btn primary" to="/contact">New Inquiry</Link></div>{items.length?<div className="table-wrap"><table><thead><tr><th>Project</th><th>Status</th><th>Budget</th><th>Date</th><th></th></tr></thead><tbody>{items.map(i=><tr key={i._id}><td>{i.projectTitle||i.projectType}</td><td><span className="badge">{i.status}</span></td><td>{i.budget}</td><td>{new Date(i.createdAt).toLocaleDateString()}</td><td><Link to={`/dashboard/inquiries/${i._id}`}>View</Link></td></tr>)}</tbody></table></div>:<Empty title="No inquiries yet" text="Submit your first project inquiry."/>}</>}
