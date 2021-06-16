export const createUser = (userName, password, eMail) => {
  return fetch("http://192.168.178.100:3001", {
    method: "POST",
    body: JSON.stringify({ userName, password, eMail }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const findUser = (userName, password) => {
  return fetch("http://192.168.178.100:3001/login/" + userName + "/" + password)
    .then((data) => data.json())
    .then((userData) => userData);
};

export const findUserMobile = (userName) => {
  return fetch("http://192.168.178.100:3001/menu/" + userName)
    .then((data) => data.json())
    .then((userData) => userData);
};

export const createItem = (
  toBeTranslated,
  className,
  en,
  de,
  fr,
  es,
  it,
  price,
  menuNumber,
  UserId
) => {
  return fetch("http://192.168.178.100:3001/item/" + UserId, {
    method: "POST",
    body: JSON.stringify({
      toBeTranslated,
      className,
      en,
      de,
      fr,
      es,
      it,
      price,
      menuNumber,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const deleteItem = (id) => {
  return fetch("http://192.168.178.100:3001/item/delete/" + id, {
    method: "DELETE",
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const moveItemUp = (id) => {
  return fetch("http://192.168.178.100:3001/item/up/" + id, {
    method: "PUT",
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const moveItemDown = (id) => {
  return fetch("http://192.168.178.100:3001/item/down/" + id, {
    method: "PUT",
  })
    .then((data) => data.json())
    .then((userData) => userData);
};
