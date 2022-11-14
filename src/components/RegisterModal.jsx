import { forwardRef, useState } from 'react';

import { Button, Form, Modal } from 'rsuite';

import { ROLE_ADMIN } from '../constants';
import useAuth from '../hooks/useAuth';
import { model } from '../schemas/Register';
import RSFormGroup from './RSFormGroup';

const defaultFormValue = {
  fName: '',
  lName: '',
  phone: '',
  position: '',
};

const RegisterModal = forwardRef(
  ({ open, onCloseModalBooking, setData, checkReserved, data }, ref) => {
    const [formValue, setFormValue] = useState(defaultFormValue);
    const position = ref.current;
    const { user } = useAuth();

    const onChange = (e) => {
      if (e !== '') setFormValue(e);
      setFormValue((prev) => ({ ...prev, userId: position }));
    };

    const onSubmit = () => {
      const userWithPosition = checkReserved(formValue.userId);
      const idxReserved = data.findIndex(
        (user) =>
          user.fName === formValue.fName && user.lName === formValue.lName
      );
      const idxNotFound = -1;

      if (user.role === ROLE_ADMIN && !!userWithPosition) {
        setData((prev) => [
          ...prev.map((user) =>
            user.userId === userWithPosition.userId ? formValue : user
          ),
        ]);
      } else if (idxReserved !== idxNotFound) {
        data.splice(idxReserved, 1, formValue);
        setData(data);
      } else {
        setData((prev) => [...prev, formValue]);
      }

      onCloseModalBooking();
      setFormValue(defaultFormValue);
    };

    return (
      <>
        <Modal open={open} onClose={onCloseModalBooking}>
          <Form
            onChange={onChange}
            onSubmit={onSubmit}
            fluid
            model={model}
            formValue={formValue}
          >
            <Modal.Header>
              <Modal.Title>ลงทะเบียนคนเข้างาน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <RSFormGroup name="fName" label="First Name" />
              <RSFormGroup name="lName" label="Last Name" />
              <RSFormGroup name="phone" label="Phone" />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Ok</Button>
              <Button onClick={onCloseModalBooking}>Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
);
export default RegisterModal;
