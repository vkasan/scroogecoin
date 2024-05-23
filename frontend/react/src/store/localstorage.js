
const saveToken = (token) => {
  localStorage.setItem('token', token);
}

const getToken = () => {
  return localStorage.getItem('token') || '';
}

const dropToken = () => {
  localStorage.removeItem('token');
}

export {
  saveToken,
  getToken,
  dropToken,
};
