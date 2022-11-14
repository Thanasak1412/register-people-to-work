import { useEffect, useState } from 'react';

import { Navbar, Nav, Modal, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';

import { logo } from '../assets/icon_logo';
import ProfileIcon from '../assets/icon_profile';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../routes/paths';

const NavigationBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isConfirmLogout, setIsConfirmLogout] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(PATH_AUTH.login);
  }, [navigate, isAuthenticated]);

  const onConfirmLogout = () => {
    setIsConfirmLogout(true);
  };

  const onClose = () => {
    setIsConfirmLogout(false);
  };

  const onLogout = () => {
    logout();
    navigate(PATH_AUTH.login);
  };

  return (
    <>
      <Navbar appearance="inverse">
        <Navbar.Brand href="#" className="py-1 flex-1">
          <div className="w-10 h-10">{logo}</div>
        </Navbar.Brand>
        <Nav pullRight className="flex-2">
          <Nav.Item onClick={onConfirmLogout}>Log Out</Nav.Item>
          <Nav.Item icon={<ProfileIcon />}>
            {!!user && user.fName} {!!user && user.lName}
          </Nav.Item>
        </Nav>
      </Navbar>
      <Modal
        backdrop="static"
        role="alertdialog"
        open={isConfirmLogout}
        onClose={onClose}
        size="xs"
      >
        <Modal.Body className="flex items-center">
          <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
          Logout
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onLogout} className="text-white bg-blue-400">
            Ok
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavigationBar;
