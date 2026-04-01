import { Routes, Route, useSearchParams, Link } from 'react-router-dom';
import TopBar from './components/TopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import ContactList from './components/ContactList.jsx';
import ContactDetail from './components/ContactDetail.jsx';
import ContactForm from './components/ContactForm.jsx';
import FrequentlyContacted from './components/FrequentlyContacted.jsx';
import Directory from './components/Directory.jsx';
import Labels from './components/Labels.jsx';
import Trash from './components/Trash.jsx';
import ImportExport from './components/ImportExport.jsx';
import PlaceholderPage from './components/PlaceholderPage.jsx';
import './GoogleContacts.css';
import { useLocalContacts } from './hooks/useLocalContacts.js';

function AppContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useLocalContacts();
  const q = (searchParams.get('q') || '').trim();

  const updateSearch = (newQ) => {
    const trimmedQ = newQ.trim();
    if (trimmedQ) {
      searchParams.set('q', trimmedQ);
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
  };

  return (
    <>
      <TopBar q={q} setQ={updateSearch} />
      <div className="app-layout">
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/" element={<ContactList contacts={contacts} q={q} />} />
            <Route path="/contact/:id" element={<ContactDetail contacts={contacts} setContacts={setContacts} />} />
            <Route path="/new" element={<ContactForm contacts={contacts} setContacts={setContacts} />} />
            <Route path="/edit/:id" element={<ContactForm contacts={contacts} setContacts={setContacts} />} />
            <Route path="/frequent" element={<FrequentlyContacted contacts={contacts} />} />
            <Route path="/directory" element={<Directory contacts={contacts} />} />
            <Route path="/label/:name" element={<Labels contacts={contacts} />} />
            <Route path="/label" element={<div className="empty-state">
              <i className="bi bi-tags"></i>
              <h3>Labels</h3>
              <p>Select a label from the sidebar to view contacts.</p>
            </div>} />
            <Route path="/trash" element={<Trash contacts={contacts} setContacts={setContacts} />} />
            <Route path="/merge" element={<PlaceholderPage icon="bi-intersect" title="Merge & fix" desc="Duplicate contacts will appear here." />} />
            <Route path="/import" element={<ImportExport contacts={contacts} setContacts={setContacts} />} />
          </Routes>
        </main>
      </div>
      <Link to="/new" className="fab" title="New contact">
        <i className="bi bi-plus-lg"></i>
      </Link>
    </>
  );
}

export default function App() {
  return <AppContent />;
}

