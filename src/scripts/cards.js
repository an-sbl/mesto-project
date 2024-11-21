import {requestAddLikeCard, requestDeleteLikeCard} from './api.js'
const cardTemplate = document.querySelector('#card-template').content;


// @todo: Функция создания карточки
export function createCard(link, name, alt, likes, idCard, userId, ownerId, deleteCard, popUpImage, likeCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeElement = cardElement.querySelector('.card__like-button');
  const numLikesElement = cardElement.querySelector('.card__like-number');
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = alt;
  cardElement.querySelector('.card__title').textContent = name;
  numLikesElement.textContent = likes;
  cardElement.setAttribute("likes",likes);
  cardElement.id = idCard;
  ownerId !== userId && deleteButton.remove();
  deleteButton.addEventListener('click', deleteCard);
  cardElement.querySelector('.card__image').addEventListener('click', () => popUpImage(name, link, alt));
  likeElement.addEventListener('click', () => likeCard(cardElement, idCard, likeElement, numLikesElement));
  return cardElement;
}

// @todo: Функция удаления карточки
export function removeCard(cardItem){
    cardItem.remove();
}

export function likeCard(card) {
  card.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}
export const handleLikeCard = (card, idCard, likeElement, numLikesElement) => {  
  if (likeElement.classList.contains('card__like-button_is-active')){
    requestDeleteLikeCard(idCard)
    .then((res)=> {
      likeCard(card);
      numLikesElement.textContent = Number(card.getAttribute('likes')) - 1;
      card.setAttribute("likes", Number(card.getAttribute('likes')) - 1);
    })
    .catch((err) => {
      console.log(err);
    }); 
  }else{
    requestAddLikeCard(idCard)
    .then((res)=> {
      likeCard(card);
      numLikesElement.textContent = Number(card.getAttribute('likes')) + 1;
      card.setAttribute("likes", Number(card.getAttribute('likes')) + 1);
    })
    .catch((err) => {
      console.log(err);
    }); 
  }
};
