// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
export const myId ='c085d33261774860d5b8749b';


// @todo: Функция создания карточки
export function createCard(link, name, alt, likes, idCard, ownerId, deleteCard, popUpImage, likeCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__like-number').textContent = likes;
  cardElement.setAttribute("likes",likes);
  cardElement.id = idCard;
  ownerId !== myId && deleteButton.remove();
  deleteButton.addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => popUpImage(name, link, alt));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(cardItem){
    cardItem.remove();
}

export function likeCard(card) {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}
