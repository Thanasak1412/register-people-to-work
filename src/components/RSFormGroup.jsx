import { Form } from 'rsuite';

export default function RSFormGroup({ name, label }) {
  return (
    <Form.Group controlId={name}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control name={name}></Form.Control>
    </Form.Group>
  );
}
