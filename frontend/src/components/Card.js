import React from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardClick, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`elements__like ${isLiked && 'elements__like_active'}`);
    const isOwn = card.owner === currentUser._id;

    function hadleClickCard() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <div className="elements__card">
            {isOwn && <button type="button" className="elements__trash" onClick={handleDeleteClick} />}
            <img className="elements__image" alt={card.name} src={card.link} onClick={hadleClickCard} />
            <div className="elements__text-like">
                <h2 className="elements__text" >{card.name}</h2>
                <div className="elements__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <h2 className="elements__likes-number" >{card.likes.length}</h2>
                </div>
            </div>
        </div>

    )
}

export default Card;


