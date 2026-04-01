import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fullName } from '../shared/helpers.js';
import Avatar from './Avatar.jsx';
import { DEFAULT_LABELS } from '../shared/constants.js';

const Labels = ({ contacts }) => {
  const { name } = useParams();
  const labelId = name;

  const labelContacts = useMemo(() => {
    if (!labelId) return [];
    return contacts.filter(c => !c.deleted && c.labels && Array.isArray(c.labels) && c.labels.includes(labelId));
  }, [contacts, labelId]);

  const label = DEFAULT_LABELS.find(l => l.id === labelId);

  if (!label) return (
    <div className="empty-state">
      <i className="bi bi-tags"></i>
      <h3>Label not found</h3>
      <p>The requested label does not exist.</p>
    </div>
  );

  if (!labelContacts.length) return (
    <div className="empty-state">
      <i className={`bi ${label.icon}`}></i>
      <h3>No contacts with "{label.name}" label</h3>
      <p>Add this label to contacts to see them here.</p>
    </div>
  );

  const grouped = useMemo(() => {
    const g = {};
    [...labelContacts]
      .sort((a, b) => fullName(a).localeCompare(fullName(b)))
      .forEach(c => {
        const k = c.last[0].toUpperCase();
        (g[k] = g[k] || []).push(c);
      });
    return g;
  }, [labelContacts]);

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1 style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <i className={`bi ${label.icon}`} style={{color: label.color}}></i>
          {label.name}
        </h1>
        <span style={{fontSize:'13px', color:'var(--on-surface-variant)'}}>
          {labelContacts.length} contacts
        </span>
      </div>

      {Object.keys(grouped)
        .sort()
        .map(letter => (
          <div className="alpha-section" key={letter}>
            <div className="alpha-header">{letter}</div>
            {grouped[letter].map(contact => (
              <Link key={contact.id} to={`/contact/${contact.id}`} className="contact-row">
                <Avatar contact={contact} />
                <div className="info">
                  <div className="name">{fullName(contact)}</div>
                  <div className="sub">{contact.email}</div>
                </div>
                <div className="row-actions">
                  <button className="icon-btn" title="Email">
                    <i className="bi bi-envelope"></i>
                  </button>
                  <button className="icon-btn" title="Call">
                    <i className="bi bi-telephone"></i>
                  </button>
                  <button className="icon-btn" title="More">
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Labels;