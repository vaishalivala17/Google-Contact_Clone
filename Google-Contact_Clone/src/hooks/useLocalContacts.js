import { useState, useEffect } from 'react';
import { getData, setData } from '../utils/storage.js';
import { SEED_CONTACTS } from '../shared/constants.js';

export const useLocalContacts = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = getData();
    return storedContacts.length ? storedContacts : SEED_CONTACTS;
  });

  useEffect(() => {
    const storedContacts = getData();
    if (storedContacts.length === 0) {
      setData(SEED_CONTACTS);
    }

    const handleStorage = () => {
      const latestContacts = getData();
      setContacts(latestContacts.length ? latestContacts : SEED_CONTACTS);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateContacts = (nextContacts) => {
    setContacts((currentContacts) => {
      const resolvedContacts = typeof nextContacts === 'function'
        ? nextContacts(currentContacts)
        : nextContacts;

      const safeContacts = Array.isArray(resolvedContacts) ? resolvedContacts : currentContacts;
      setData(safeContacts);
      return safeContacts;
    });
  };

  return [contacts, updateContacts];
};

