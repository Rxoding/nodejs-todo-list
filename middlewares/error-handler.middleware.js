export default (err, req, res, next) => {
  console.error(err);
  // 발생한 에러가 예상한 에러인지 아닌지
  if (err.name === 'ValidationError') {
    return res.status(400).json({ errorMessage: err.message });
  }
  // 예상한 에러가 아니라면
  return res
    .status(500)
    .json({ errorMessage: '서버에서 에러가 발생했습니다.' });
};
