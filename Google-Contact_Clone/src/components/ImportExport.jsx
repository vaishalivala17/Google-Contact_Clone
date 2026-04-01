import { useRef } from 'react';
import { exportToCSV, importFromCSV } from '../utils/storage.js';

const ImportExport = ({ contacts, setContacts }) => {
  const fileInputRef = useRef(null);

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target.result;
        const importedContacts = importFromCSV(csvText);

        if (importedContacts.length === 0) {
          alert('No valid contacts found in the CSV file.');
          return;
        }

        // Merge with existing contacts, avoiding duplicates by email
        setContacts(prev => {
          const existingEmails = new Set(prev.map(c => c.email.toLowerCase()));
          const newContacts = importedContacts.filter(c =>
            c.email && !existingEmails.has(c.email.toLowerCase())
          );

          if (newContacts.length === 0) {
            alert('All contacts in the CSV file already exist.');
            return prev;
          }

          alert(`Successfully imported ${newContacts.length} contacts.`);
          return [...prev, ...newContacts];
        });
      } catch (error) {
        console.error('Import error:', error);
        alert('Error importing CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
  };

  const handleExport = () => {
    const activeContacts = contacts.filter(c => !c.deleted);
    if (activeContacts.length === 0) {
      alert('No contacts to export.');
      return;
    }

    exportToCSV(activeContacts);
    alert(`Exported ${activeContacts.length} contacts to CSV.`);
  };

  return (
    <div className="page-contacts">
      <div className="contacts-toolbar">
        <h1>Import & Export</h1>
      </div>

      <div style={{padding: '24px', maxWidth: '600px'}}>
        <div style={{marginBottom: '32px'}}>
          <h3 style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <i className="bi bi-upload" style={{color: 'var(--google-blue)'}}></i>
            Import Contacts
          </h3>
          <p style={{color: 'var(--on-surface-variant)', marginBottom: '16px'}}>
            Import contacts from a CSV file. The file should include columns for First Name, Last Name, Email, Phone, Company, Label, Labels, Birthday, Address, Notes, and Favorite.
          </p>
          <input
            ref={fileInputRef}
            id="csv-import-input"
            type="file"
            accept=".csv"
            onChange={handleImport}
            style={{display: 'none'}}
          />
          <label
            htmlFor="csv-import-input"
            style={{
              padding: '12px 24px',
              background: 'var(--google-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="bi bi-upload"></i>
            Choose CSV File
          </label>
        </div>

        <div style={{marginBottom: '32px'}}>
          <h3 style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <i className="bi bi-download" style={{color: 'var(--google-green)'}}></i>
            Export Contacts
          </h3>
          <p style={{color: 'var(--on-surface-variant)', marginBottom: '16px'}}>
            Export all your contacts to a CSV file that can be imported into other contact managers or spreadsheets.
          </p>
          <button
            onClick={handleExport}
            style={{
              padding: '12px 24px',
              background: 'var(--google-green)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="bi bi-download"></i>
            Export to CSV
          </button>
        </div>

        <div style={{background: 'var(--surface-variant)', padding: '16px', borderRadius: '8px'}}>
          <h4 style={{marginBottom: '8px'}}>CSV Format</h4>
          <p style={{fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '8px'}}>
            Your exported CSV will include these columns:
          </p>
          <code style={{
            display: 'block',
            background: 'var(--surface)',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            First Name, Last Name, Email, Phone, Company, Label, Labels, Birthday, Address, Notes, Favorite
          </code>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;