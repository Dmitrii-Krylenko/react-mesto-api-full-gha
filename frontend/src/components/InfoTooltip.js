import React from 'react';
import Union from '../images/Union.png'
import Fail from '../images/fail.png'

function InfoTooltip({ isOpen, onClose, succsessful }) {

  if (succsessful)
    return (
      <div className={`popup popup__informing ${isOpen && 'popup_opened'}`}>
        <div className='popup__container '>
          <img className='popup__informing-img' src={Union} alt="успех" />
          <h2 className=' popup__informing-text' >Вы успешно зарегистрировались.</h2>
          <button type="button" className="popup__close " onClick={onClose}>
          </button>
        </div>
      </div>
    );

  return (
    <div className={`popup popup__informing ${isOpen && 'popup_opened'}`}>
      <div className='popup__container '>
        <img className='popup__informing-img' src={Fail} alt="неудача" />
        <h2 className=' popup__informing-text' >Что-то пошло не так! Попробуйте ещё раз.</h2>
        <button type="button" className="popup__close " onClick={onClose}>
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
