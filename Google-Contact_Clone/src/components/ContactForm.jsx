import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colorFor, initials, textColorFor } from '../shared/helpers.js';
import { DEFAULT_LABELS } from '../shared/constants.js';

const GInput = ({ label, name, value, onChange, type = 'text', readOnly = false }) => {
  const inputId = `input-${name}`;
  return (
    <div className="google-input-wrap">
      <input
        id={inputId}
        className="google-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete="off"
        readOnly={readOnly}
      />
      <label className="google-label" htmlFor={inputId}>{label}</label>
    </div>
  );
};

const ContactForm = ({ contacts, setContacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existing = isEdit ? contacts.find(c => c.id === parseInt(id)) : null;
  
  const emptyForm = {
    first:'',
    last:'',
    email:'',
    phone:'',
    company:'',
    label:'Mobile',
    labels: [],
    birthday:'',
    address:'',
    notes:'',
    favorite:false,
  };
  const [form, setForm] = useState(() => (existing ? { ...emptyForm, ...existing } : emptyForm));
  const previewId = form.id || 'Auto-generated on save';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLabelToggle = (labelId) => {
    setForm(prev => ({
      ...prev,
      labels: prev.labels.includes(labelId)
        ? prev.labels.filter(id => id !== labelId)
        : [...prev.labels, labelId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.first.trim()) {
      alert('First name is required');
      return;
    }

    if (isEdit) {
      setContacts(prev => prev.map(c => 
        c.id === parseInt(id) ? { ...c, ...form, id: parseInt(id) } : c
      ));
      navigate(`/contact/${id}`);
    } else {
      const newContact = { ...emptyForm, ...form, id: Date.now(), contactCount: 0, deleted: false, deletedAt: null };
      setContacts(prev => [...prev, newContact]);
      navigate('/');
    }
  };

  const avatarColor = form.first ? colorFor(`${form.first} ${form.last || ''}`) : 'var(--google-blue)';
  const avatarTextColor = textColorFor(avatarColor);
  const avatarInitials = form.first ? initials({ first: form.first, last: form.last || '' }) : '';

  return (
    <form onSubmit={handleSubmit} className="form-page">
      <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'24px'}}>
        <button type="button" className="icon-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2>{isEdit ? 'Edit contact' : 'Create contact'}</h2>
      </div>

      <div className="form-avatar-wrap">
        <div className="avatar-lg" style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px', fontWeight: 400, color: avatarTextColor,
          fontFamily: "'Google Sans', sans-serif"
        }}>
          {avatarInitials || <i className="bi bi-person" style={{fontSize: '36px'}}></i>}
        </div>
        <button type="button" className="btn-cancel" style={{fontSize: '13px'}}>
          <i className="bi bi-camera me-1"></i>Add photo
        </button>
      </div>

      <div className="field-row">
        <i className="bi bi-hash" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Contact ID" name="id" value={String(previewId)} onChange={() => {}} readOnly />
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-person" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="First name" name="first" value={form.first} onChange={handleChange} />
          <GInput label="Last name" name="last" value={form.last} onChange={handleChange} />
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-briefcase" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Company" name="company" value={form.company} onChange={handleChange} />
        </div>
      </div>

      <hr className="form-divider" />

      <div className="field-row">
        <i className="bi bi-telephone" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Phone" name="phone" value={form.phone} onChange={handleChange} type="tel" />
          <div className="google-input-wrap" style={{minWidth: '130px'}}>
            <select
              id="input-label"
              className="google-input"
              name="label"
              value={form.label}
              onChange={handleChange}
              style={{paddingTop: '20px', appearance: 'none'}}
            >
              <option>Mobile</option>
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </select>
            <label className="google-label" htmlFor="input-label" style={{top: '4px', fontSize: '11px'}}>Label</label>
          </div>
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-envelope" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-tags" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <div style={{padding: '16px 0'}}>
            <label style={{fontSize: '12px', color: 'var(--on-surface-variant)', marginBottom: '8px', display: 'block'}}>Labels</label>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
              {DEFAULT_LABELS.map(label => (
                <button
                  key={label.id}
                  type="button"
                  onClick={() => handleLabelToggle(label.id)}
                  className={`label-chip ${form.labels.includes(label.id) ? 'active' : ''}`}
                  style={{
                    background: form.labels.includes(label.id) ? label.color : 'var(--surface-variant)',
                    color: form.labels.includes(label.id) ? 'white' : 'var(--on-surface-variant)',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <i className={`bi ${label.icon}`} style={{fontSize: '14px'}}></i>
                  {label.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-calendar3" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Birthday" name="birthday" value={form.birthday || ''} onChange={handleChange} type="date" />
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-geo-alt" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Address" name="address" value={form.address || ''} onChange={handleChange} />
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-journal-text" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <GInput label="Notes" name="notes" value={form.notes || ''} onChange={handleChange} />
        </div>
      </div>

      <div className="field-row">
        <i className="bi bi-star" style={{fontSize:'20px', color:'var(--on-surface-variant)', marginTop:'22px', flexShrink:0}}></i>
        <div className="field-group">
          <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
            <input
              type="checkbox"
              name="favorite"
              checked={form.favorite}
              onChange={handleChange}
              style={{width: '16px', height: '16px'}}
            />
            <span style={{fontSize: '14px'}}>Add to favorites</span>
          </label>
        </div>
      </div>

      <button type="button" className="btn-cancel" style={{fontSize:'13px', marginLeft:'32px', marginTop:'4px'}}>
        <i className="bi bi-plus me-1"></i>Add field
      </button>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" className="btn-save">
          Save
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

