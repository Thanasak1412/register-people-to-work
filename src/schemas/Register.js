import { Schema } from 'rsuite';

const { StringType } = Schema.Types;

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

export const model = Schema.Model({
  fName: StringType().isRequired('This field is required.'),
  lName: StringType().isRequired('This field is required.'),
  phone: StringType()
    .addRule((value) => {
      return asyncCheckPhone(value);
    }, 'Duplicate name')
    .isRequired('This field is required.'),
});
