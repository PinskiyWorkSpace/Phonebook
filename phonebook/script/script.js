'use strict';

{
  const getStorage = (key) => {
    const res = JSON.parse(localStorage.getItem(key));
    if (res !== null) {
      return res;
    } else {
      return [];
    }
  };

  const data = getStorage('data');

  const setStorage = (key, obj) => {
    const newData = getStorage(key);

    newData.push(obj);

    localStorage.setItem('data', JSON.stringify(newData));
  };

  const removeStorage = (phone) => {
    const newData = getStorage('data');

    newData.forEach((el, index) => {
      if (el.phone === phone) {
        newData.splice(index, 1);
      }
    });
    localStorage.setItem('data', JSON.stringify(newData));
  };

  const addContactData = contact => {
    data.push(contact);
    console.log('data: ', data);
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({
      className,
      type,
      text,
    }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class="delete">Удалить</th>
      <th class="name">Имя</th>
      <th class="surname">Фамилия</th>
      <th class="phone" colspan="2">Телефон</th>
    </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);

    table.thead = thead;
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" name="name" id="name"
        type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname" id="surname" 
        type="text" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone" id="phone" 
        type="number" required>
    </div>

    `);

    const buttonGroup = createButtonsGroup([{
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('div');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const createCopyright = title => {
    const copyright = document.createElement('p');
    copyright.textContent = `Все права защищены © ${title}`;

    return copyright;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([{
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
    ]);
    const table = createTable();
    const {
      form,
      overlay,
    } = createForm();
    const footer = createFooter();
    const copyright = createCopyright(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    footer.footerContainer.append(copyright);
    app.append(header, main, footer);

    return {
      listHead: table.thead,
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    };
  };

  const createRow = ({
    name: firstName,
    surname,
    phone,
  }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    const edit = document.createElement('td');
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Редактировать';

    edit.append(btnEdit);

    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone, edit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', () => {
      openModal();
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay ||
        target.closest('.close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      const phone = target.closest('.contact').querySelector('a').textContent;

      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        removeStorage(phone);
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);

      addContactPage(newContact, list);
      addContactData(newContact);

      form.reset();
      closeModal();

      setStorage('data', newContact);
    });
  };

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
    } = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

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
