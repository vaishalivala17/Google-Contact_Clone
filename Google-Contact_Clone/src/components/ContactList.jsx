import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fullName } from '../shared/helpers.js';
import Avatar from './Avatar.jsx';

const ContactList = ({ contacts, q }) => {
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const s = q.toLowerCase().trim();
    return contacts.filter(c => 
      fullName(c).toLowerCase().includes(s) || 
      c.email.toLowerCase().includes(s) || 
      (c.phone || '').toLowerCase().includes(s)
    );
  }, [contacts, q]);

  const grouped = useMemo(() => {
    const g = {};
    [...filtered]
      .sort((a, b) => {
        const firstCompare = (a.first || '').localeCompare(b.first || '');
        if (firstCompare !== 0) return firstCompare;
        return (a.last || '').localeCompare(b.last || '');
      })
      .forEach(c => {
        const k = (c.first?.[0] || '#').toUpperCase();
        (g[k] = g[k] || []).push(c);
      });
    return g;
  }, [filtered]);

  const handleQuickAction = (event, action) => {
    event.preventDefault();
    event.stopPropagation();
    action();
  };

  if (!filtered.length) return (
    <div className="empty-state">
      <i className="bi bi-search"></i>
      <h3>No results for "{q}"</h3>
      <p>Try a different name, email, or phone number.</p>
    </div>
  );

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>Contacts</h1>
        <span style={{fontSize:'13px', color:'var(--on-surface-variant)'}}>
          {filtered.length} contacts
        </span>
        <button className="sort-btn">
          <i className="bi bi-sort-alpha-down"></i> Name
        </button>
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
                  <button
                    className="icon-btn"
                    title="Email"
                    onClick={(event) => handleQuickAction(event, () => {
                      if (contact.email) window.location.href = `mailto:${contact.email}`;
                    })}
                  >
                    <i className="bi bi-envelope"></i>
                  </button>
                  <button
                    className="icon-btn"
                    title="Call"
                    onClick={(event) => handleQuickAction(event, () => {
                      if (contact.phone) window.location.href = `tel:${contact.phone}`;
                    })}
                  >
                    <i className="bi bi-telephone"></i>
                  </button>
                  <button
                    className="icon-btn"
                    title="More"
                    onClick={(event) => handleQuickAction(event, () => navigate(`/contact/${contact.id}`))}
                  >
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

export default ContactList;

