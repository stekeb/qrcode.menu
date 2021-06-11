export const createUser = (userName, password, eMail) => {
  return fetch('http://localhost:3001', {
    method: 'POST',
    body: JSON.stringify({userName, password, eMail}),
    headers: {
      "Content-Type": 'application/json'  
    }
  })
  .then(data => data.json())
  .then(userData => userData)
}

export const findUser = (userName, password) => {
  return fetch('http://localhost:3001/' + userName + '/' + password)
  .then(data => data.json())
  .then(userData => userData)
}
