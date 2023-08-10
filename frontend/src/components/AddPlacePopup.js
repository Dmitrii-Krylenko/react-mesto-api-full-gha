import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeNameCard(e) {
        setName(e.target.value);
    }

    function handleChangeLinkCard(e) {
        setLink(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm buttonText="Создать" onClose={onClose} isOpen={isOpen} onSubmit={handleSubmit} name="add" title="Новое место">
            <input className="popup__input popup__input_inter_title" value={name} placeholder="название" name="name" type="text" minLength={2} maxLength={30} required onChange={handleChangeNameCard} />
            <span className="popup__input-error popup__input-error_type_name" />
            <input className="popup__input popup__input_inter_link" value={link} placeholder="Ссылка на картинку" name="link" type="url" required onChange={handleChangeLinkCard} />
            <span className="popup__input-error popup__input-error_type_link" />
        </PopupWithForm>
    )
}
export default AddPlacePopup;