import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Container,
  Content,
  Footer,
  Form,
  ButtonToolbar,
  Button,
  Panel,
  FlexboxGrid,
} from 'rsuite';

import RSFormGroup from '../../components/RSFormGroup';
import { ROLE_ADMIN, ROLE_USER } from '../../constants';
import useAuth from '../../hooks/useAuth';
import { PATH_AUTH, PATH_ROOT } from '../../routes/paths';
import { model } from '../../schemas/Register';

const defaultFormValue = {
  fName: '',
  lName: '',
  phone: '',
  position: '',
};

export default function Login() {
  const [formValue, setFormValue] = useState(defaultFormValue);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onChange = (value) => {
    if (value !== '') setFormValue(value);
  };

  const onSubmit = () => {
    const userId = Math.floor(Math.random() * 100);

    login({ ...formValue, userId, role: ROLE_ADMIN });

    isAuthenticated ? navigate(PATH_ROOT) : navigate(PATH_AUTH.login);
  };

  return (
    <div className="mt-28">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h1>Login</h1>} bordered>
                <Form
                  model={model}
                  formValue={formValue}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  fluid
                >
                  <RSFormGroup name="fName" label="First Name" />
                  <RSFormGroup name="lName" label="Last Name" />
                  <RSFormGroup name="phone" label="Phone" />
                  <Form.Group>
                    <ButtonToolbar className="text-center">
                      <Button type="submit" className="text-white bg-blue-400">
                        Sign In
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        <Footer className="grid place-content-center mt-12">
          <small>&copy; Copyright {new Date().getFullYear()}</small>
        </Footer>
      </Container>
    </div>
  );
}
