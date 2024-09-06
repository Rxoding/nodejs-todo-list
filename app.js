import express from 'express';
import connect from './schemas/index.js';
import todosRouter from './routes/todos.router.js';
import errorHandlerMiddleware from './middlewares/error-handler.middleware.js';

const app = express();
const PORT = 3000;

connect();

// Express에서 req.body에 접근하여 body 데이터를 사용할 수 있도록 설정합니다.
app.use(express.json()); // 미들웨어1
app.use(express.urlencoded({ extended: true })); // 미들웨어2
// assets 경로에 있는 파일(프론트엔드파일)을 아무런 가공없이 그대로 전달해주는 미들웨어
app.use(express.static('./assets')); // 미들웨어3

// 미들웨어4
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl, ' - ', new Date());
  next();
});

const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hi!' });
});

// 미들웨어5
app.use('/api', [router, todosRouter]);

// 에러처리 미들웨어 등록
app.use(errorHandlerMiddleware);

// 서버실행 제일 첫번째로 실행된다.
app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
