import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const changeAvatar = React.useRef(null);
    React.useEffect(() => {
        changeAvatar.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: changeAvatar.current.value,
        });
    }

    function handleChangeAvatar() {
        return changeAvatar.current.value;
    }

    return (
        <PopupWithForm buttonText="Сохранить" onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen} name="avatar" title="Обновить аватар">
            <input className="popup__input popup__input_inter_link" onChange={handleChangeAvatar} ref={changeAvatar} placeholder="Ссылка на картинку" name="link" type="url" required />
            <span className="popup__input-error popup__input-error_type_link" />
        </PopupWithForm>
    )

}

export default EditAvatarPopup;