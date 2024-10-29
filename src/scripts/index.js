import '../pages/index.css';
import './cards.js';

import { initialCards } from './cards.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard(link, name, alt, deleteCard, listenPopUpImage){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = alt;
    cardElement.querySelector('.card__title').textContent = name;
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}

function appendCard(card){
    placesList.append(card);
}

// @todo: Функция удаления карточки
function removeCard(evt){
    const eventTarget = evt.target;
    const cardItem = eventTarget.closest('.card');
    cardItem.remove();
 }

// @todo: Вывести карточки на страницу

initialCards.forEach(function (cardInfo){
    const link = cardInfo.link;
    const name = cardInfo.name;
    const alt = cardInfo.alt;
    const card = createCard(link, name, alt, removeCard);
    appendCard(card);
});




 
// Открытие, закрытие popUp
const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
};
  
export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
  };
  
export const closeModal= (modal) => {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKeyUp);
  };
  
  
export const listenPopUp = (popUp) => {
    
    const popupClose = popUp.querySelector('.popup__close');
    popupClose.addEventListener("click", () => {
      closeModal(popUp);
    });
  
    popUp.addEventListener("mousedown", (event) => {
        if (event.target.classList.contains('popup')){
            closeModal(popUp);
        }
    });
  }

const profileEditButton = document.querySelector('.profile__edit-button');
const popUpEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const popUpImage = document.querySelector('.popup_type_image');
const cards = document.querySelectorAll('.card');
    
listenPopUp(popUpEditProfile);
listenPopUp(popUpAddCard);
listenPopUp(popUpImage);

profileEditButton.addEventListener('click', function(){
    openModal(popUpEditProfile);
    }
);

addCardButton.addEventListener('click', function(){
    openModal(popUpAddCard);
}
);

cards.forEach(function(card){
    const cardImage = card.querySelector('.card__image');
    card.addEventListener('click', listenPopUpImage);
    //     popUpImage.querySelector('.popup__image').src = card.querySelector('.card__image').src;
    //     popUpImage.querySelector('.popup__caption').textContent =card.querySelector('.card__title').textContent;
    //     openModal(popUpImage);
    // }
    // );
});
function listenPopUpImage (e){
    document.querySelector('.popup__image').src = e.link;
    document.querySelector('.popup__caption').textContent =e.name;
    openModal(popUpImage);
}

    
// Обработка редактирования профиля

const formEdit = document.forms.editProfile;          
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput =  formEdit.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
        evt.preventDefault();
        const profileName = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        profileName.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closeModal(popUpEditProfile);
    }
formEdit.addEventListener('submit', handleFormSubmit);

// Обработка добавления карточки

const formCard = document.forms.newPlace;
const cardNnameInput = formCard.querySelector('.popup__input_type_card-name');
const cardUrlInput =  formCard.querySelector('.popup__input_type_url');

function handleFormAddCardSubmit(evt) {
        evt.preventDefault();
        const card = createCard(cardUrlInput.value, cardNnameInput.value, "Описание картинки", removeCard);
        appendCard(card);
        formCard.reset();
        closeModal(popUpAddCard);
    }
formCard.addEventListener('submit', handleFormAddCardSubmit);


