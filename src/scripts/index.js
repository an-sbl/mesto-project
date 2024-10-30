import '../pages/index.css';
import './cardsDB.js';
import {createCard, appendCard, removeCard, handleLikeCard} from './cards.js'
import {openModal, closeModal, listenPopUp} from './modal.js'

import { initialCards} from './cardsDB.js';

// Вывод карточки на страницу

initialCards.forEach(function (cardInfo){
    const link = cardInfo.link;
    const name = cardInfo.name;
    const alt = cardInfo.alt;
    const card = createCard(link, name, alt, removeCard, listenPopUpImage, handleLikeCard);
    appendCard(card);
});

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
    const name = card.querySelector('.card__title').textContent;
    const link = card.querySelector('.card__image').src;
    card.querySelector('.card__image').addEventListener('click', () => listenPopUpImage(name, link));
    card.querySelector('.card__like-button').addEventListener('click', handleLikeCard);
});

// Обработка попапа картинки карточки

export function listenPopUpImage(name, link){
    popUpImage.querySelector('.popup__image').src = link;
    popUpImage.querySelector('.popup__caption').textContent = name;
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
        const card = createCard(cardUrlInput.value, cardNnameInput.value, "Описание картинки", removeCard, listenPopUpImage, handleLikeCard);
        appendCard(card);
        formCard.reset();
        closeModal(popUpAddCard);
    }
formCard.addEventListener('submit', handleFormAddCardSubmit);

