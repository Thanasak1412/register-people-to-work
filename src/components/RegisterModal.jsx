import { forwardRef, useState } from 'react';

import { Button, Form, Modal, Schema } from 'rsuite';

import RSFormGroup from './RSFormGroup';

const { StringType } = Schema.Types;
const model = Schema.Model({
  fName: StringType().isRequired('This field is required.'),
  lName: StringType().isRequired('This field is required.'),
  phone: StringType()
    .addRule((value) => {
      return asyncCheckPhone(value);
    }, 'Duplicate name')
    .isRequired('This field is required.'),
});

function asyncCheckPhone(phone) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (phone === '0123456789') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

const defaultFormValue = {
  fName: '',
  lName: '',
  phone: '',
  position: '',
};

const RegisterModal = forwardRef(
  ({ open, onCloseModalBooking, setData }, ref) => {
    const [formValue, setFormValue] = useState(defaultFormValue);
    const position = ref.current;

    const onChange = (e) => {
      if (e !== '') setFormValue(e);
      setFormValue((prev) => ({ ...prev, userId: position }));
    };

    const onSubmit = () => {
      setData((prev) => [...prev, formValue]);
      setFormValue(defaultFormValue);
      onCloseModalBooking();
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
