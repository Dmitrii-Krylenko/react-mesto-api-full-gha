import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm buttonText="Сохранить" onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit} name="edit-profil" title="Редактировать профиль">
      <input className="popup__input  popup__input_inter_name" placeholder="Введите имя" name={"name"} type="text" minLength={2} maxLength={40} required onChange={handleChangeName} value={name || ''} />
      <span className="popup__input-error popup__input-error_type_name" />
      <input className="popup__input popup__input_inter_occupation" placeholder="Веведите род занятий" name={"occupation"} type="text" minLength={2} maxLength={200} required onChange={handleChangeDescription} value={description || ''} />
      <span className="popup__input-error popup__input-error_type_occupation" />
    </PopupWithForm>
  )


}
export default EditProfilePopup;
