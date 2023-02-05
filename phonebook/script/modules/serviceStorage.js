
const getStorage = (key) => {
  const res = JSON.parse(localStorage.getItem(key));
  if (res !== null) {
    return res;
  } else {
    return [];
  }
};

const data = getStorage('data');

export const addContactData = contact => {
  data.push(contact);
  console.log('data: ', data);
};

export const setStorage = (key, obj) => {
  const newData = getStorage(key);

  newData.push(obj);

  localStorage.setItem('data', JSON.stringify(newData));
};

export const removeStorage = (phone) => {
  const newData = getStorage('data');

  newData.forEach((el, index) => {
    if (el.phone === phone) {
      newData.splice(index, 1);
    }
  });
  localStorage.setItem('data', JSON.stringify(newData));
};

export default data;
