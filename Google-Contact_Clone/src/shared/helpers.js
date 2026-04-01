import { COLORS } from './constants.js';

export const colorFor = (name = '') => {
  const key = String(name).trim() || 'contact';
  const hash = [...key].reduce((total, char, index) => total + char.charCodeAt(0) * (index + 1), 0);
  return COLORS[hash % COLORS.length];
};

export const textColorFor = (background = '') => {
  if (!background.startsWith('#')) return '#ffffff';

  const hex = background.slice(1);
  const normalized = hex.length === 3 ? [...hex].map(char => char + char).join('') : hex;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 170 ? '#202124' : '#ffffff';
};

export const initials = (contact) => {
  const first = contact?.first?.[0] || '';
  const last = contact?.last?.[0] || '';
  return (first + last).toUpperCase();
};

export const fullName = (contact) => `${contact.first} ${contact.last}`.trim();

