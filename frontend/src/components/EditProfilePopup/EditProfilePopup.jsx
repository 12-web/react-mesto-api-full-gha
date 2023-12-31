import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { PopupWithForm } from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Input } from '../Input/Input';

/**
 * Компонент попапа изменения данных пользователя
 * @component
 * @param { Object } props
 * @param { boolean } props.isOpen - состояние открытия попапа
 * @param { function } props.onClose - функция закрытия попапа
 * @param { function } props.onUpdateUser - функция изменения данных пользователя
 * @param { boolean } props.isFormLoading - состояние загрузки ответа с сервера
 */
export const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  isFormLoading,
}) => {
  const [userData, setUserData] = useState({ name: '', about: '' });
  const currentUser = useContext(CurrentUserContext);
  const nameId = 'edit-name';
  const aboutId = 'edit-about';

  /** добавление данных пользователя при загрузке страницы */
  useEffect(() => {
    setUserData({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  /** функция отправки формы при которой обновляются данные в профиле */
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser(userData);
  };

  /** функция получения данных из формы */
  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title='Редактировать профиль'
      name='edit'
      submitText={isFormLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <Input
        className='popup__input popup__input_value_name'
        id={nameId}
        type='text'
        name='name'
        placeholder='Имя'
        minLength={2}
        maxLength={40}
        value={userData.name}
        onChange={handleChange}
        required
      />
      <span className={`popup__error ${nameId}-error`}></span>
      <Input
        className='popup__input popup__input_value_profession'
        id={aboutId}
        type='text'
        name='about'
        placeholder='Род деятельности'
        minLength={2}
        maxLength={200}
        value={userData.about}
        onChange={handleChange}
        required
      />
      <span className={`popup__error ${aboutId}-error`}></span>
    </PopupWithForm>
  );
};

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateUser: PropTypes.func,
  isFormLoading: PropTypes.bool,
};
