// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки
export function createCard(link, name, alt, deleteCard, popUpImage, likeCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  deleteButton.addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => popUpImage(name, link, alt));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  return cardElement;
}


// @todo: Функция удаления карточки
export function removeCard(evt){
  const eventTarget = evt.target;
  const cardItem = eventTarget.closest('.card');
  cardItem.remove();
}

export function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active'); 
}
