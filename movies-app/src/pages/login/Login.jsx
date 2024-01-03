// Login.jsx
import React, { useState } from 'react';
import "./style.scss"
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Đường dẫn đến file database.json
    const databasePath = '../../../../database.json';

    // Đọc dữ liệu từ file database.json
    fetch(databasePath)
      .then((response) => response.json())
      .then((data) => {
        // Kiểm tra xem tồn tại user với email và password nhập vào hay không
        const user = data.users.find((user) => user.email === email && user.password === password);

        if (user) {
          // Đăng nhập thành công, gọi hàm onLogin với thông tin user
          onLogin(user);
        } else {
          // Đăng nhập thất bại, hiển thị thông báo lỗi
          setErrorMessage('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Error reading database:', error);
        setErrorMessage('Error reading database');
      });
  };

  return (
    <div className='loginForm'>
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
