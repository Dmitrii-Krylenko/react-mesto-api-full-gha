
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import '../index.css';
import React from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Union from '../images/Union.png'
import Fail from '../images/fail.png'
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from '../utils/Auth';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [isSuccsessful, setSuccsessful] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error})`))
  }, []);

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsPlacePopupOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false)
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) =>
          setCards((state) => state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`));
    } else {

      api
        .setLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }
  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => { setCards((state) => state.filter((item) => item._id !== card._id)) })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAva(avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`));

  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .editPhoto(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])

        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }

  function handleRegister({ password, email }) {
    auth.register(password, email)
      .then((res) => {
        setSuccsessful(true)
        handleInfoTooltip()
      })
      .catch((err) => {
        setSuccsessful(false)
        handleInfoTooltip()
        console.log(err)
      });
  }

  function handlelogin({ password, email }) {
    auth.login(password, email)
      .then(() => {
        setEmail(email)
        setLoggedIn(true)
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const checkToken = () => {
  
      auth.getToken()
        .then((user) => {
          if (!user) {
            return
          }
          setSuccsessful(true)
          setEmail(user.data.email)
          navigate('/')
        })
        .catch(
          (err) => {
            setSuccsessful(Fail)
            console.log(err)})
    
  }

  React.useEffect(
    () => {
      checkToken();
    }, []
  )

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='body'>
        <Header
          email={email}
        />

        <Routes>
          <Route exact path="/sign-in" element={<Login
            onLogin={handlelogin}
          />} />
          <Route exact path="/sign-up" element={<Register
            onRegister={handleRegister}
          />} />
          <Route path="*" element={<Login
            onLogin={handlelogin}
          />} />

          <Route exact path="/"
            element={
              <>
                <ProtectedRouteElement
                  isLoggedIn={isLoggedIn}
                /> {
                  <>
                    <Main
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={setSelectedCard}
                      onCardLike={handleCardLike}
                      cards={cards}
                      onCardDelete={handleDeleteCard}
                      isLoggedIn={isLoggedIn} />

                      

                    <Footer />
                  </>
                }
              </>
            } />

        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          succsessful={isSuccsessful}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>
        <InfoTooltip />

        <div className="popup popup_delete">
          <div className="popup__container">
            <h2 className="popup__header">Вы уверены?</h2>
            <form className="popup__form popup__form-add" noValidate>
              <button type="submit" className="popup__save popup__save-add popup__button">Да</button>
            </form>
            <button type="button" className="popup__close popup__close_foto ">
            </button>
          </div>
        </div>

        <div className='popup  popup__informing '>
          <div className='popup__container '>
            <img className='popup__informing-img' src={Union} alt="успех" />
            <h2 className=' popup__informing-text' >Вы успешно зарегистрировались!</h2>
            <button type="button" className="popup__close ">
            </button>
          </div>
        </div>

        <div className='popup  popup__informing '>
          <div className='popup__container '>
            <img className='popup__informing-img' src={Fail} alt="неудача" />
            <h2 className=' popup__informing-text' >Что-то пошло не так! Попробуйте ещё раз.</h2>
            <button type="button" className="popup__close ">
            </button>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
