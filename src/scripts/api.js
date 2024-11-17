export const requestEditProfile = (newProfile) =>{
  return fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me', {
  method: 'PATCH',
    headers: {
      authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(newProfile)
  })   
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
});
};
// Запрос добавления карточки
export const requestAddCard = (newCard) =>{
  return fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
  method: 'POST',
    headers: {
      authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(newCard)
  })   
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
});
};

// Запрос смены аватара профиля
export const requestEditProfileImage = (newProfileImage) =>{
  return fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae'
    },
    body: JSON.stringify(newProfileImage)
  })
  .then((res) => {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
};


// Запрос удаления карточки
export const requestDeleteCard = (cardId) =>{
  return fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae',
}
  })   
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
});
};

// Запрос добавления лайка карточки
export const requestAddLikeCard = (cardId) =>{
  return fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardId}`, {
  method: 'PUT',
  headers: {
    authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae',
}
  })   
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
});
};

// Запрос удаления лайка карточки
export const requestDeleteLikeCard = (cardId) =>{
  return fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae',
}
  })   
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
});
};

export const requestProfile = new Promise((resolve, reject) => {
 fetch('https://nomoreparties.co/v1/wff-cohort-26/users/me', {
    headers: {
      authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae'
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
  fetch('https://nomoreparties.co/v1/wff-cohort-26/cards', {
    headers: {
      authorization: 'ab741f44-5d39-4d07-9d34-724dcb089dae'
    }
  })
  .then((res) => {
    if (res.ok) {
      resolve(res.json());
    }
  reject(`Что-то пошло не так: ${res.status}`);
});
});





