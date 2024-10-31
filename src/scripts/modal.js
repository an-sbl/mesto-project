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


export const addPopupListeners = (popUp) => {
  popUp.classList.add('popup_is-animated');
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

