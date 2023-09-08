const { NODE_ENV, REACT_APP_BASE_URL } = process.env;
/**
 * Проверка ответа на запрос к серверу
 * @param { Promise } res - возвращаемый при fetch-запросе объект
 * @returns { Object } - возвращаемый объект переведен в json-формат и содержит готовые данные
 */
const getResponseData = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

/**
 * Осуществление запроса к серверу
 * @param { string } url - эндпойнт запроса
 * @param { string } options - объект конфигурации запроса
 * @returns { Promise } - возвращаемый объект переведен в json-формат и содержит готовые данные
 */

const request = (url, options) => {
  return fetch(
    `${'https://api.likee.nomoredomainsic.nomoredomainsicu.ru'}${url}`,
    options
  ).then(res => getResponseData(res));
};

/**
 * Аутентификация пользователя
 * @param { Object } user
 * @param { string}  user.email - email пользователя при регистрации
 * @param { string } user.password - password пользователя при регистрации
 * @returns { Promise.<{string[]}> } - возвращаемый объект содержит id зарегистрированного пользователя и email
 */
export const register = ({ email, password }) => {
  return request('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  });
};

/**
 * Авторизация пользователя
 * @param { Object } user
 * @param { string } user.email - email пользователя при авторизации
 * @param { string } user.password - password пользователя при авторизации
 * @returns { Promise.<{string}> } - возвращаемый объект содержит токен пользователя
 */
export const authorize = ({ email, password }) => {
  return request('/signin', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  });
};

/**
 * Выход пользователя из личного кабинета
 * @returns { Promise.<{string}> } - возвращаемый объект содержит сообщение об очистке cookie
 */
export const signout = () => {
  return request('/signout', {
    method: 'POST',
    credentials: 'include',
  });
};

/**
 * Проверка токека пользователя
 * @returns { Promise.<{string}> } - возвращаемый объект содержит id зарегистрированного пользователя и email
 */
export const tockenCheck = () => {
  return request('/', {
    credentials: 'include',
  });
};
