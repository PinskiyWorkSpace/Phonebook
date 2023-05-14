import * as create from './createElements.mjs';
import {createRow} from './createElements.mjs';

export const renderPhoneBook = (app, title) => {
  const header = create.createHeader();
  const imageLogo = create.createImageLogo();
  const logo = create.createLogo(title);
  const main = create.createMain();
  const buttonGroup = create.createButtonsGroup([{
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
  const table = create.createTable();
  const {
    form,
    overlay,
  } = create.createForm();
  const footer = create.createFooter();
  const copyright = create.createCopyright(title);

  header.headerContainer.append(imageLogo, logo);
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

export const renderContacts = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};
