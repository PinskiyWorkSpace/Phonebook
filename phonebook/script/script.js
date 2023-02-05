import {renderPhoneBook, renderContacts} from './modules/render.js';
import data from './modules/serviceStorage.js';
import * as control from './modules/control.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      listHead,
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);
    // Функционал
    const allRow = renderContacts(list, data);
    const {
      closeModal,
    } = control.modalControl(btnAdd, formOverlay);

    control.hoverRow(allRow, logo);
    control.deleteControl(btnDel, list);
    control.formControl(form, list, closeModal);

    const sortArr = (value) => {
      const result = (a, b) => {
        if (a[value] > b[value]) {
          return 1;
        } else {
          return -1;
        }
      };
      return result;
    };

    listHead.addEventListener('click', e => {
      const value = e.target.classList.value;
      data.sort(sortArr(value));

      const contact = list.querySelectorAll('.contact');
      contact.forEach(el => {
        el.remove();
      });

      renderContacts(list, data);
    });
  };

  window.phoneBookInit = init;
}
