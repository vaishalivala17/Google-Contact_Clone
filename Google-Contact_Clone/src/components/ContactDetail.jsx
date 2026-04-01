import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fullName, initials, colorFor, textColorFor } from '../shared/helpers.js';
import { DEFAULT_LABELS } from '../shared/constants.js';

const ContactDetail = ({ contacts, setContacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const contact = contacts.find(c => c.id === parseInt(id));

  const avatarColor = contact ? colorFor(fullName(contact)) : 'var(--google-blue)';
  const avatarTextColor = textColorFor(avatarColor);

  if (!contact) return (
    <div className="empty-state">
      <i className="bi bi-person-x"></i>
      <h3>Contact not found</h3>
    </div>
  );

  const handleToggleFavorite = () => {
    setContacts(prev => prev.map(item =>
      item.id === contact.id ? { ...item, favorite: !item.favorite } : item
    ));
  };

  const incrementContactCount = () => {
    setContacts(prev => prev.map(item =>
      item.id === contact.id ? { ...item, contactCount: (item.contactCount || 0) + 1 } : item
    ));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`Move ${fullName(contact)} to trash?`);
    if (!confirmed) return;

    setContacts(prev => prev.map(item =>
      item.id === contact.id
        ? { ...item, deleted: true, deletedAt: new Date().toISOString() }
        : item
    ));
    navigate('/');
  };

  const handleDuplicate = () => {
    const duplicate = { ...contact, id: Date.now(), favorite: false };
    setContacts(prev => [...prev, duplicate]);
    setShowMenu(false);
    navigate(`/contact/${duplicate.id}`);
  };

  const handleCopy = async (value, label) => {
    if (!value) {
      window.alert(`No ${label.toLowerCase()} available for this contact.`);
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        window.alert(`${label} copied successfully.`);
      } else {
        window.prompt(`Copy ${label}:`, value);
      }
    } catch {
      window.prompt(`Copy ${label}:`, value);
    }

    setShowMenu(false);
  };

  const openLink = (href, fallbackMessage) => {
    if (!href || href.endsWith(':')) {
      window.alert(fallbackMessage);
      return;
    }
    window.location.href = href;
  };

  return (
    <div className="detail-page">
      <div className="detail-top-actions">
        <button className="icon-btn" onClick={() => navigate(-1)} title="Back">
          <i className="bi bi-arrow-left"></i>
        </button>
        <div style={{flex:1}}></div>
        <button className="icon-btn" title="Edit" onClick={() => navigate(`/edit/${contact.id}`)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="icon-btn" title={contact.favorite ? 'Remove favorite' : 'Add favorite'} onClick={handleToggleFavorite}>
          <i className={`bi ${contact.favorite ? 'bi-star-fill' : 'bi-star'}`}></i>
        </button>
        <div style={{position:'relative'}}>
          <button className="icon-btn" title="More" onClick={() => setShowMenu(prev => !prev)}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          {showMenu && (
            <div className="action-menu">
              <button className="action-menu-item" onClick={() => navigate(`/edit/${contact.id}`)}>
                <i className="bi bi-pencil"></i> Edit contact
              </button>
              <button className="action-menu-item" onClick={handleDuplicate}>
                <i className="bi bi-files"></i> Duplicate
              </button>
              <button className="action-menu-item" onClick={() => handleCopy(contact.phone, 'Phone number')}>
                <i className="bi bi-clipboard"></i> Copy phone
              </button>
              <button className="action-menu-item" onClick={() => handleCopy(contact.email, 'Email')}>
                <i className="bi bi-clipboard-check"></i> Copy email
              </button>
              <button className="action-menu-item danger" onClick={handleDelete}>
                <i className="bi bi-trash"></i> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="detail-hero">
        <div className="avatar-lg" style={{
          width:'96px', height:'96px', 
          background: avatarColor,
          borderRadius:'50%', 
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'40px', fontWeight:400, color: avatarTextColor,
          fontFamily: "'Google Sans', sans-serif",
          flexShrink:0
        }}>
          {initials(contact)}
        </div>
        <div className="name-area">
          <h2>{fullName(contact)}</h2>
          {contact.company && <p>{contact.company}</p>}
          <div style={{marginTop:'8px', display:'flex', gap:'6px', flexWrap:'wrap'}}>
            <span className="chip">
              <i className="bi bi-person"></i> {contact.label}
            </span>
            {contact.favorite && (
              <span className="chip">
                <i className="bi bi-star-fill"></i> Favorite
              </span>
            )}
            {contact.labels && contact.labels.map(labelId => {
              const label = DEFAULT_LABELS.find(l => l.id === labelId);
              return label ? (
                <span key={labelId} className="chip" style={{background: label.color, color: 'white'}}>
                  <i className={`bi ${label.icon}`}></i> {label.name}
                </span>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="detail-actions">
        <button className="detail-action-btn" onClick={() => { incrementContactCount(); openLink(contact.phone ? `tel:${contact.phone}` : '', 'No phone number available for this contact.'); }}>
          <i className="bi bi-telephone"></i> Call
        </button>
        <button className="detail-action-btn" onClick={() => { incrementContactCount(); openLink(contact.email ? `mailto:${contact.email}` : '', 'No email available for this contact.'); }}>
          <i className="bi bi-envelope"></i> Email
        </button>
        <button className="detail-action-btn" onClick={() => { incrementContactCount(); openLink(contact.phone ? `sms:${contact.phone}` : '', 'No phone number available for this contact.'); }}>
          <i className="bi bi-chat"></i> Message
        </button>
        <button className="detail-action-btn" onClick={() => { incrementContactCount(); window.open('https://meet.google.com/new', '_blank', 'noopener,noreferrer'); }}>
          <i className="bi bi-camera-video"></i> Video
        </button>
        <button className="detail-action-btn" onClick={() => setShowMenu(prev => !prev)}>
          <i className="bi bi-three-dots"></i> More
        </button>
      </div>

      <hr style={{borderColor:'var(--outline)', margin:'24px 0'}} />

      <div className="detail-section">
        <div className="detail-section-title">Contact info</div>
        <div className="detail-field">
          <i className="bi bi-hash"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{contact.id}</div>
            <div className="detail-field-label">Contact ID</div>
          </div>
        </div>
        <div className="detail-field">
          <i className="bi bi-telephone"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{contact.phone || 'No phone added'}</div>
            <div className="detail-field-label">{contact.label}</div>
          </div>
        </div>
        <div className="detail-field">
          <i className="bi bi-envelope"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{contact.email || 'No email added'}</div>
            <div className="detail-field-label">Personal</div>
          </div>
        </div>
        {contact.company && (
          <div className="detail-field">
            <i className="bi bi-building"></i>
            <div className="detail-field-body">
              <div className="detail-field-value">{contact.company}</div>
              <div className="detail-field-label">Company</div>
            </div>
          </div>
        )}
      </div>

      <div className="detail-section">
        <div className="detail-section-title">Other</div>
        <div className="detail-field">
          <i className="bi bi-calendar3"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{contact.birthday || 'Add birthday'}</div>
            <div className="detail-field-label">Birthday</div>
          </div>
        </div>
        <div className="detail-field">
          <i className="bi bi-geo-alt"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{contact.address || 'Add address'}</div>
            <div className="detail-field-label">Address</div>
          </div>
        </div>
        <div className="detail-field">
          <i className="bi bi-journal-text"></i>
          <div className="detail-field-body">
            <div className="detail-field-value">{contact.notes || 'Add notes'}</div>
            <div className="detail-field-label">Notes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;

