const STORAGE_KEY = 'google-contacts-contacts';

export const getData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data || data === 'undefined') return [];

    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
};

export const setData = (contacts) => {
  try {
    const safeContacts = Array.isArray(contacts) ? contacts : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeContacts));
  } catch (e) {
    console.error('Failed to save contacts:', e);
  }
};

// CSV Import/Export utilities
export const exportToCSV = (contacts) => {
  const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Label', 'Labels', 'Birthday', 'Address', 'Notes', 'Favorite'];
  const csvContent = [
    headers.join(','),
    ...contacts.map(contact => [
      contact.first || '',
      contact.last || '',
      contact.email || '',
      contact.phone || '',
      contact.company || '',
      contact.label || '',
      (contact.labels || []).join(';'),
      contact.birthday || '',
      contact.address || '',
      contact.notes || '',
      contact.favorite ? 'Yes' : 'No'
    ].map(field => `"${field.replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'contacts.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const contacts = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const contact = {
        id: Date.now() + i,
        first: values[0] || '',
        last: values[1] || '',
        email: values[2] || '',
        phone: values[3] || '',
        company: values[4] || '',
        label: values[5] || 'Mobile',
        labels: values[6] ? values[6].split(';').map(l => l.trim()).filter(Boolean) : [],
        birthday: values[7] || '',
        address: values[8] || '',
        notes: values[9] || '',
        favorite: values[10]?.toLowerCase() === 'yes',
        contactCount: 0,
        deleted: false,
        deletedAt: null
      };
      contacts.push(contact);
    }
  }

  return contacts;
};

const parseCSVLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.replace(/"/g, ''));
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.replace(/"/g, ''));
  return result;
};

