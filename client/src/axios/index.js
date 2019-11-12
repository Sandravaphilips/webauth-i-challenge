import axios from "axios";

export default function withAuth() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
  
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        username: username,
        password: password
      },
    });
  
    return instance;
  }