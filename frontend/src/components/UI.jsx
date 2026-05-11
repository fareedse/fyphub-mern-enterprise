import React from 'react';
export const Loading = ({ rows=3 }) => <div className="card-grid">{Array.from({length:rows}).map((_,i)=><div className="skeleton" key={i}/>)}</div>;
export const Empty = ({ title='Nothing here yet', text='There is no data to show right now.', action }) => <div className="empty"><h3>{title}</h3><p>{text}</p>{action}</div>;
export const ErrorState = ({ message='Something went wrong', onRetry }) => <div className="empty"><h3>{message}</h3>{onRetry && <button className="btn primary" onClick={onRetry}>Retry</button>}</div>;
export const Modal = ({ title, children, onClose }) => <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><div className="section-head"><h2>{title}</h2><button className="btn ghost" onClick={onClose}>Close</button></div>{children}</div></div>;
export const Field = ({ label, as='input', ...props }) => <label><b>{label}</b>{as==='textarea'?<textarea className="input textarea" {...props}/>:<input className="input" {...props}/>}</label>;
export const Select = ({ label, children, ...props }) => <label><b>{label}</b><select className="input" {...props}>{children}</select></label>;
