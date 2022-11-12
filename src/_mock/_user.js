import { faker } from '@faker-js/faker';

export const _user = {
  userId: 1,
  fName: 'firstNameTest',
  lName: 'lastNameTest',
  phone: '0123456789',
  role: 'USER',
};

export const _userAdmin = {
  userId: 2,
  fName: 'firstNameAdmin',
  lName: 'lastNameAdmin',
  phone: '9876543210',
  role: 'ADMIN',
};

export const mockUsers = (length) => {
  const createRowData = (rowIndex) => {
    const fName = faker.name.firstName();
    const lName = faker.name.lastName();
    const phone = faker.phone.number();
    const role = 'USER';

    return {
      userId: rowIndex + 1,
      fName,
      lName,
      phone,
      role,
    };
  };

  return Array.from({ length }).map((_, index) => createRowData(index));
};

export const mockTreeData = (options) => {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    const length = limits[layer];
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue
        ? `${parentValue}-${index + 1}`
        : `${index + 1}`;
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;
      let row = {
        label: typeof label === 'function' ? label(layer, value, faker) : value,
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value),
        };
      }
      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
};
