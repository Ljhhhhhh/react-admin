import request from "@/utils/request";

export const fetchRegister = data => {
  return request({
    url: "/api/register", // '/api/register'
    method: "POST"
  });
};
// export const fetchRegister = (data) => {
//   'POST /api/register': (req, res) => {
//     res.send({ status: 'ok', currentAuthority: 'user' });
//   },
//   return request({
//     url: '/api/register', // '/api/register'
//     method: 'POST',
//   })
// }
