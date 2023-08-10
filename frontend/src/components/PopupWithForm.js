import React from 'react';

function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
            <div className="popup__container">
                <h2 className="popup__header">{title}</h2>
                <form className={`popup__form popup__form-${name}`} name={name} onSubmit={onSubmit} >
                    {children}
                    <button type="submit" className="popup__save popup__button">{buttonText}</button>
                </form>
                <button type="button" onClick={onClose} className={`popup__close  popup__close_${name}`}>
                </button>
            </div>
        </div>
    )
}
export default PopupWithForm;

