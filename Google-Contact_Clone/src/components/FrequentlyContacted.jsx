import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fullName } from '../shared/helpers.js';
import Avatar from './Avatar.jsx';

const FrequentlyContacted = ({ contacts }) => {
  const frequentContacts = useMemo(() => {
    return contacts
      .filter(c => !c.deleted && (c.contactCount || 0) > 0)
      .sort((a, b) => (b.contactCount || 0) - (a.contactCount || 0))
      .slice(0, 12); // Show top 12
  }, [contacts]);

  if (!frequentContacts.length) return (
    <div className="empty-state">
      <i className="bi bi-clock-history"></i>
      <h3>No frequently contacted</h3>
      <p>Contacts you interact with most will appear here.</p>
    </div>
  );

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>Frequently contacted</h1>
        <span style={{fontSize:'13px', color:'var(--on-surface-variant)'}}>
          {frequentContacts.length} contacts
        </span>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', padding: '16px'}}>
        {frequentContacts.map(contact => (
          <Link
            key={contact.id}
            to={`/contact/${contact.id}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--surface)',
              border: '1px solid var(--outline)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'box-shadow .2s'
            }}
            onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,.1)'}
            onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
          >
            <Avatar contact={contact} size={48} />
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}>
              {fullName(contact)}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--on-surface-variant)',
              textAlign: 'center'
            }}>
              {contact.contactCount} interactions
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyContacted;