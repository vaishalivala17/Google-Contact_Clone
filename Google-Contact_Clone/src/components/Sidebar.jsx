import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: 'bi-people', label: 'Contacts' },
  { to: '/frequent', icon: 'bi-clock-history', label: 'Frequently contacted' },
  { to: '/directory', icon: 'bi-building', label: 'Directory' },
];

const labelItems = [
  { to: '/label/friends', icon: 'bi-heart', label: 'Friends' },
  { to: '/label/work', icon: 'bi-briefcase', label: 'Work' },
  { to: '/label/family', icon: 'bi-house-heart', label: 'Family' },
];

const Sidebar = () => (
  <nav className="sidebar">
    <Link to="/new" className="create-btn">
      <i className="bi bi-plus"></i>
      Create contact
    </Link>
    
    {navItems.map(item => (
      <NavLink 
        key={item.to} 
        to={item.to} 
        end
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <i className={item.icon}></i>
        <span>{item.label}</span>
      </NavLink>
    ))}
    
    <hr className="nav-divider" />
    <div className="nav-section-label">Labels</div>
    {labelItems.map(item => (
      <NavLink 
        key={item.to} 
        to={item.to} 
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <i className={item.icon}></i>
        <span>{item.label}</span>
      </NavLink>
    ))}
    
    <hr className="nav-divider" />
    <NavLink to="/trash" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
      <i className="bi bi-trash"></i>
      <span>Trash</span>
    </NavLink>
    <NavLink to="/merge" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
      <i className="bi bi-intersect"></i>
      <span>Merge & fix</span>
    </NavLink>
    <NavLink to="/import" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
      <i className="bi bi-upload"></i>
      <span>Import & Export</span>
    </NavLink>
  </nav>
);

export default Sidebar;

