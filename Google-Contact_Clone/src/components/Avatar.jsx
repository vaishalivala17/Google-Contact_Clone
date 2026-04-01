import { colorFor, initials, fullName, textColorFor } from '../shared/helpers.js';

const Avatar = ({ contact, size = 40, className = 'avatar', ...props }) => {
  const background = colorFor(fullName(contact));

  const style = {
    width: size,
    height: size,
    background,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Google Sans', sans-serif",
    fontSize: size * 0.4,
    fontWeight: 500,
    color: textColorFor(background),
    flexShrink: 0,
    lineHeight: 1,
    ...props.style
  };

  return (
    <div className={className} style={style}>
      {initials(contact)}
    </div>
  );
};

export default Avatar;

