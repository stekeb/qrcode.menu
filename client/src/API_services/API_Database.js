const BASEURL = process.env.REACT_APP_BASEURL;

export const createUser = (userName, password, eMail) => {
  return fetch(`${BASEURL}`, {
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
  return fetch(`${BASEURL}login/${userName}/${password}`)
    .then((data) => data.json())
    .then((userData) => userData);
};

export const findUserMobile = (userName) => {
  return fetch(`${BASEURL}menu/${userName}`)
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
  UserId
) => {
  return fetch(`${BASEURL}item/${UserId}`, {
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
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const deleteItem = (id) => {
  return fetch(`${BASEURL}item/delete/${id}`, {
    method: "DELETE",
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const moveItemUp = (id) => {
  return fetch(`${BASEURL}item/up/${id}`, {
    method: "PUT",
  })
    .then((data) => data.json())
    .then((userData) => userData);
};

export const moveItemDown = (id) => {
  return fetch(`${BASEURL}item/down/${id}`, {
    method: "PUT",
  })
    .then((data) => data.json())
    .then((userData) => userData);
};
