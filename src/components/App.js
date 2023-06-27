import { useEffect, useState } from 'react';
import api from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPhotoPopup from './AddPhotoPopup.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);

  useEffect(() => {
    api
      .getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });

    function handleESC(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleOverlayClose(evt) {
      evt.target.classList.contains('popup_opened') && closeAllPopups();
    }

    document.addEventListener('keydown', handleESC);
    document.addEventListener('mousedown', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleOverlayClose);
      document.removeEventListener('mousedown', handleESC);
    };
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setDeletePopupOpen(true);
    setDeleteCard(card);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editMyProfile({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .editMyAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }, onSuccess) {
    setIsLoading(true);
    api
      .addPhoto({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        onSuccess();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletePopupOpen(false);
    setDeleteCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleDeleteClick}
      />

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPhotoPopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        card={deleteCard}
        popupTitle="popup__title-delete"
        container="delete-container"
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        button={isLoading ? 'Сохранение...' : 'Да'}
        onSubmit={handleCardDelete}
      ></PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default App;
