export const COLORS = [
  '#AECBFA',
  '#D7AEFB',
  '#FDCFE8',
  '#F28B82',
  '#FBCB92',
  '#FDD663',
  '#81C995',
  '#78D9EC',
  '#B39DDB',
  '#A8DAB5',
];

export const DEFAULT_LABELS = [
  { id: 'work', name: 'Work', color: '#ea4335', icon: 'bi-briefcase' },
  { id: 'home', name: 'Home', color: '#34a853', icon: 'bi-house' },
  { id: 'mobile', name: 'Mobile', color: '#fbbc04', icon: 'bi-phone' },
  { id: 'family', name: 'Family', color: '#ab47bc', icon: 'bi-people' },
  { id: 'friends', name: 'Friends', color: '#00acc1', icon: 'bi-heart' },
  { id: 'important', name: 'Important', color: '#ff5722', icon: 'bi-star' },
];

export const SEED_CONTACTS = [
  { id:1, first:'Aarav',   last:'Patel',     email:'aarav.patel@gmail.com',   phone:'+91 98765 43210', company:'Infosys',     label:'Home', labels: ['home', 'friends'], contactCount: 5, favorite: false, deleted: false, deletedAt: null },
  { id:2, first:'Diya',    last:'Shah',      email:'diya.shah@outlook.com',    phone:'+91 90000 11111', company:'TCS',         label:'Work', labels: ['work'], contactCount: 12, favorite: true, deleted: false, deletedAt: null },
  { id:3, first:'Rohan',   last:'Mehta',     email:'rohan.mehta@yahoo.com',    phone:'+91 88812 34567', company:'Wipro',       label:'Mobile', labels: ['mobile', 'friends'], contactCount: 3, favorite: false, deleted: false, deletedAt: null },
  { id:4, first:'Priya',   last:'Sharma',    email:'priya.sharma@gmail.com',   phone:'+91 77777 22222', company:'HCL Tech',    label:'Work', labels: ['work'], contactCount: 8, favorite: false, deleted: false, deletedAt: null },
  { id:5, first:'Kabir',   last:'Singh',     email:'kabir.singh@gmail.com',    phone:'+91 99001 23456', company:'Zomato',      label:'Mobile', labels: ['mobile'], contactCount: 15, favorite: true, deleted: false, deletedAt: null },
  { id:6, first:'Ananya',  last:'Gupta',     email:'ananya.g@gmail.com',       phone:'+91 80001 11223', company:'Flipkart',    label:'Home', labels: ['home', 'family'], contactCount: 2, favorite: false, deleted: false, deletedAt: null },
  { id:7, first:'Vivaan',  last:'Joshi',     email:'vivaan.joshi@icloud.com',  phone:'+91 70001 55667', company:'Paytm',       label:'Work', labels: ['work'], contactCount: 6, favorite: false, deleted: false, deletedAt: null },
  { id:8, first:'Ishaan',  last:'Kumar',     email:'ishaan.k@gmail.com',       phone:'+91 91234 56789', company:"BYJU's",     label:'Mobile', labels: ['mobile', 'friends'], contactCount: 9, favorite: false, deleted: false, deletedAt: null },
  { id:9, first:'Saanvi',  last:'Reddy',     email:'saanvi.r@gmail.com',        phone:'+91 82233 44556', company:'Nykaa',       label:'Home', labels: ['home', 'family'], contactCount: 4, favorite: false, deleted: false, deletedAt: null },
  { id:10,first:'Arjun',   last:'Verma',     email:'arjun.v@gmail.com',        phone:'+91 93344 55667', company:'OYO',         label:'Work', labels: ['work'], contactCount: 7, favorite: false, deleted: false, deletedAt: null },
  { id:11,first:'Meera',   last:'Nair',      email:'meera.nair@gmail.com',     phone:'+91 94455 66778', company:'Swiggy',      label:'Mobile', labels: ['mobile'], contactCount: 11, favorite: false, deleted: false, deletedAt: null },
  { id:12,first:'Dev',     last:'Kapoor',    email:'dev.k@outlook.com',        phone:'+91 95566 77889', company:'HDFC Bank',   label:'Work', labels: ['work'], contactCount: 13, favorite: true, deleted: false, deletedAt: null },
  { id:13,first:'Sneha',   last:'Agarwal',   email:'sneha.a@gmail.com',        phone:'+91 96677 88990', company:'Reliance',    label:'Home', labels: ['home', 'family'], contactCount: 1, favorite: false, deleted: false, deletedAt: null },
  { id:14,first:'Tanvi',   last:'Bhatt',     email:'tanvi.bhatt@gmail.com',    phone:'+91 97788 99001', company:'Sun Pharma',  label:'Mobile', labels: ['mobile'], contactCount: 10, favorite: false, deleted: false, deletedAt: null },
  { id:15,first:'Neil',    last:'Malhotra',  email:'neil.m@gmail.com',         phone:'+91 98899 00112', company:'ONGC',        label:'Work', labels: ['work'], contactCount: 14, favorite: false, deleted: false, deletedAt: null },
];

