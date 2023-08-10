import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <button className="profile__button" onClick={onEditAvatar} type="button">
                        <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                    </button>
                    <div className="profile__text">
                        <div className="profile__name-button">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" onClick={onEditProfile} className="profile__edit" />
                        </div>
                        <p className="profile__occupation">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" onClick={onAddPlace} className="profile__add" />
            </section>
            <section className="foto">
                <ul className="elements">
                </ul>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}

            </section>
        </main>

    );
}

export default Main;
