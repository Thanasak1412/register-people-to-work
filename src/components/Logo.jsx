import { Link as RouterLink } from 'react-router-dom';

import { logo } from '../assets/icon_logo';

export default function Logo() {
  return (
    <RouterLink to="/">
      <div className="fixed top-2/4 right-2/4">{logo}</div>
    </RouterLink>
  );
}
