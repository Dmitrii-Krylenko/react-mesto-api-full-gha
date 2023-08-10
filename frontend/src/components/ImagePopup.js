import React from 'react';


function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_photo_big ${card.link && 'popup_opened'}`}>
      <div className="popup__container popup__container_big ">
        <img className=" popup__image-big" alt={card.name} src={card.link} />
        <h2 className="popup__header popup__header_big" >{card.name}</h2>
        <button onClick={onClose} type="button" className="popup__close popup__close_photo_big">
        </button>
      </div>
    </div>
  )
}
export default ImagePopup;