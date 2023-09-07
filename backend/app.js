const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const NotFoundError = require('./components/NotFoundError');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, ORIGIN, DB_CONN } = process.env;
dotenv.config();
const app = express();

/**
 * безопасность приложения (количество запросов и заголовки)
 */
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(helmet());

/**
 * добавление парсеров
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * предотвращение возврата полей, для которых установлено select: false
 */
mongoose.set('toObject', { useProjection: true });
mongoose.set('toJSON', { useProjection: true });

/**
 * подключение базы данных
 */
mongoose.connect(DB_CONN, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(requestLogger);
/**
 * установка роутов
 */
app.use('/', require('./routes'));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);
/**
 * обработка ошибок
 */
app.all('*', () => {
  throw new NotFoundError('Задан неверный путь');
});

app.use(errors());
app.use(errorHandler);

/**
 * установка порта для сервера
 */
app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
