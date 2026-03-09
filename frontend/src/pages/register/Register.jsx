import React, { useRef, useState } from 'react'
import './Register.css'
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //パスワードと確認用パスワードが一致しているかどうか確認
    if (password.current.value !== passwordConfirmation.current.value) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      setLoading(true);
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      //registerApiを叩く
      await API.post("/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 500) {
        setError("このユーザー名またはメールアドレスはすでに使用されています");
      } else {
        setError("登録に失敗しました。もう一度お試しください");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className='loginLogo'>Real SNS</h3>
          <span className="loginDesc">本格的なSNSを、自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">新規登録はこちら</p>
            <input
              type="text"
              className="loginInput"
              placeholder='ユーザー名'
              required
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder='Eメール'
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder='パスワード'
              required
              minLength="6"
              ref={password}
            />
            <input
              type="password"
              className="loginInput"
              placeholder='確認用パスワード'
              required
              minLength="6"
              ref={passwordConfirmation}
            />
            {error && (
              <span style={{ color: "red", fontSize: "13px", textAlign: "center" }}>
                {error}
              </span>
            )}
            <button className="loginButton" type='submit' disabled={loading}>
              {loading ? "登録中..." : "サインアップ"}
            </button>
            <button className="loginRegisterButton" type="button" onClick={() => navigate("/login")}>ログイン</button>
          </form>
        </div>
      </div>
    </div>
  )
}