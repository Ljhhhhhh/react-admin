import Mock from 'mockjs';

// export default {
//   // 使用 mockjs 等三方库
//   'POST /api/register': (req, res) => {
//     res.send({ status: 'ok', currentAuthority: 'user' });
//   },
// };

Mock.mock('/api/register', { status: 'ok', currentAuthority: 'user' , code: 0})