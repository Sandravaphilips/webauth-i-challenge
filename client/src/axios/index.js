import axios from "axios";

export default function withAuth() {
  const cookie = sessionStorage.getItem('cookie');
  

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookie
    },
  });

  return instance;
}