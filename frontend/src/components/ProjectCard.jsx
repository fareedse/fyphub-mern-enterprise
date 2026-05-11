import { Link } from 'react-router-dom';
import { whatsappLink } from '../utils/whatsapp';
export default function ProjectCard({ project }){
 const msg=`Hi FYP Hub, I want to buy: ${project.title}`;
 return <article className="card"><img className="project-img" src={project.mainImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80'} alt={project.title}/><span className="badge">{project.category}</span><h3>{project.title}</h3><p className="muted">{project.shortDescription}</p><div className="tags">{project.technologies?.slice(0,4).map(t=><span className="tag" key={t}>{t}</span>)}</div><div className="price">PKR {project.discountPrice || project.price}</div><div className="actions"><Link className="btn dark" to={`/projects/${project.slug}`}>View Details</Link><a className="btn primary" href={whatsappLink(msg)} target="_blank">Buy on WhatsApp</a></div></article>
}
