import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fullName } from '../shared/helpers.js';
import Avatar from './Avatar.jsx';

const Directory = ({ contacts }) => {
  const directoryContacts = useMemo(() => {
    return contacts.filter(c => !c.deleted && c.company).sort((a, b) => {
      // Sort by company first, then by name
      const companyCompare = (a.company || '').localeCompare(b.company || '');
      if (companyCompare !== 0) return companyCompare;
      return fullName(a).localeCompare(fullName(b));
    });
  }, [contacts]);

  const groupedByCompany = useMemo(() => {
    const g = {};
    directoryContacts.forEach(c => {
      const company = c.company || 'No Company';
      (g[company] = g[company] || []).push(c);
    });
    return g;
  }, [directoryContacts]);

  if (!directoryContacts.length) return (
    <div className="empty-state">
      <i className="bi bi-building"></i>
      <h3>No directory contacts</h3>
      <p>Contacts with company information will appear here.</p>
    </div>
  );

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>Directory</h1>
        <span style={{fontSize:'13px', color:'var(--on-surface-variant)'}}>
          {directoryContacts.length} contacts
        </span>
      </div>

      {Object.keys(groupedByCompany)
        .sort()
        .map(company => (
          <div className="alpha-section" key={company}>
            <div className="alpha-header" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <i className="bi bi-building" style={{fontSize: '16px'}}></i>
              {company}
              <span style={{fontSize: '12px', color: 'var(--on-surface-variant)', marginLeft: 'auto'}}>
                {groupedByCompany[company].length} contacts
              </span>
            </div>
            {groupedByCompany[company].map(contact => (
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

export default Directory;