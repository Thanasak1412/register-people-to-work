import { Navbar, Nav } from 'rsuite';

import { logo } from '../assets/icon_logo';
import ProfileIcon from '../assets/icon_profile';

const NavigationBar = () => {
  // const { user } = useAuth();

  return (
    <Navbar appearance="inverse">
      <Navbar.Brand href="#" className="py-1 flex-1">
        <div className="w-10 h-10">{logo}</div>
      </Navbar.Brand>
      <Nav pullRight className="flex-2">
        <Nav.Item icon={<ProfileIcon />}>
          <>Thanasak Srisaeng</>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
