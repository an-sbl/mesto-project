const serverConfig = {
url:"https://nomoreparties.co/v1/wff-cohort-26",
auth:"ab741f44-5d39-4d07-9d34-724dcb089dae"
}
function checkResponse(res) {
  if (res.ok) {
    return Promise.resolve(res.json());
  }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
} 

// Запрос редактирования профиля
export const requestEditProfile = (newProfile) =>{
  return fetch(`${serverConfig.url}/users/me`, {
  method: 'PATCH',
    headers: {
      authorization: serverConfig.auth,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(newProfile)
  })   
  .then((res) =>{
    return checkResponse(res);
  });
    
};
// Запрос добавления карточки
export const requestAddCard = (newCard) =>{
  return fetch(`${serverConfig.url}/cards`, {
  method: 'POST',
    headers: {
      authorization: serverConfig.auth,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(newCard)
  })   
  .then((res) =>{
    return checkResponse(res);
  });
};

// Запрос смены аватара профиля
export const requestEditProfileImage = (newProfileImage) =>{
  return fetch(`${serverConfig.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: serverConfig.auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: newProfileImage
    })
  })
  .then((res) =>{
    return checkResponse(res);
  });
};


// Запрос удаления карточки
export const requestDeleteCard = (cardId) =>{
  return fetch(`${serverConfig.url}/cards/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: serverConfig.auth,
}
  })   
  .then((res) =>{
    return checkResponse(res);
  });
};

// Запрос добавления лайка карточки
export const requestAddLikeCard = (cardId) =>{
  return fetch(`${serverConfig.url}/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: serverConfig.auth,
}
  })   
  .then((res) =>{
    return checkResponse(res);
  });
};

// Запрос удаления лайка карточки
export const requestDeleteLikeCard = (cardId) =>{
  return fetch(`${serverConfig.url}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: serverConfig.auth,
}
  })   
  .then((res) =>{
    return checkResponse(res);
  });
};

export const requestProfile = new Promise((resolve, reject) => {
  fetch(`${serverConfig.url}/users/me`, {
      headers: {
        authorization: serverConfig.auth
      }
    })
    .then((res) => {
      if (res.ok) {
        resolve(res.json());
      }
          reject(`Что-то пошло не так: ${res.status}`);
});
});

export const requestCard = new Promise((resolve, reject) => {
  fetch(`${serverConfig.url}/cards`, {
    headers: {
      authorization: serverConfig.auth
    }
  })
  .then((res) => {
    if (res.ok) {
      resolve(res.json());
    }
  reject(`Что-то пошло не так: ${res.status}`);
});
});




