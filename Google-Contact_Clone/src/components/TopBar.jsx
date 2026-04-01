import { Link } from 'react-router-dom';

const TopBar = ({ q, setQ }) => {

  return (
    <div className="topbar">
      <Link to="/" className="logo">
        <svg height="28" viewBox="0 0 75 24" style={{width: 'auto'}}>
          <text y="20" fontFamily="'Google Sans',sans-serif" fontSize="22" fill="var(--on-surface-variant)">Contacts</text>
        </svg>
      </Link>
      <div className="search-wrap">
        <label htmlFor="search-input" style={{position: 'absolute', left: '-9999px'}}>Search contacts</label>
        <i className="bi bi-search"></i>
        <input
          id="search-input"
          className="search-input"
          name='search'
          placeholder="Search"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" title="Help"><i className="bi bi-question-circle"></i></button>
        <button className="icon-btn" title="Settings"><i className="bi bi-gear"></i></button>
        <button className="icon-btn" title="Apps"><i className="bi bi-grid-3x3-gap"></i></button>
        <button className="avatar-btn" title="Profile">JD</button>
      </div>
    </div>
  );
};

export default TopBar;

