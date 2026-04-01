import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fullName } from '../shared/helpers.js';
import Avatar from './Avatar.jsx';

const Trash = ({ contacts, setContacts }) => {
  const trashedContacts = useMemo(() => {
    return contacts.filter(c => c.deleted).sort((a, b) =>
      new Date(b.deletedAt) - new Date(a.deletedAt)
    );
  }, [contacts]);

  const handleRestore = (contactId) => {
    setContacts(prev => prev.map(c =>
      c.id === contactId ? { ...c, deleted: false, deletedAt: null } : c
    ));
  };

  const handlePermanentDelete = (contactId) => {
    const confirmed = window.confirm('Permanently delete this contact? This action cannot be undone.');
    if (!confirmed) return;

    setContacts(prev => prev.filter(c => c.id !== contactId));
  };

  const handleEmptyTrash = () => {
    const confirmed = window.confirm('Empty trash? All contacts in trash will be permanently deleted.');
    if (!confirmed) return;

    setContacts(prev => prev.filter(c => !c.deleted));
  };

  if (!trashedContacts.length) return (
    <div className="empty-state">
      <i className="bi bi-trash"></i>
      <h3>Trash is empty</h3>
      <p>Deleted contacts will appear here for 30 days.</p>
    </div>
  );

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>Trash</h1>
        <span style={{fontSize:'13px', color:'var(--on-surface-variant)'}}>
          {trashedContacts.length} contacts
        </span>
        <button className="sort-btn" onClick={handleEmptyTrash} style={{color: 'var(--google-red)'}}>
          <i className="bi bi-trash"></i> Empty trash
        </button>
      </div>

      <div style={{padding: '16px', background: 'var(--surface-variant)', borderRadius: '8px', marginBottom: '16px'}}>
        <p style={{fontSize: '14px', color: 'var(--on-surface-variant)', margin: 0}}>
          Contacts in trash will be automatically deleted after 30 days.
        </p>
      </div>

      {trashedContacts.map(contact => (
        <div key={contact.id} className="contact-row" style={{opacity: 0.7}}>
          <Avatar contact={contact} />
          <div className="info">
            <div className="name">{fullName(contact)}</div>
            <div className="sub">
              Deleted {contact.deletedAt ? new Date(contact.deletedAt).toLocaleDateString() : 'recently'}
            </div>
          </div>
          <div className="row-actions">
            <button
              className="icon-btn"
              title="Restore"
              onClick={() => handleRestore(contact.id)}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <button
              className="icon-btn"
              title="Delete permanently"
              onClick={() => handlePermanentDelete(contact.id)}
              style={{color: 'var(--google-red)'}}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trash;