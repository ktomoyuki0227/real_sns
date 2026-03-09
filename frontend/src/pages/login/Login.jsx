import React, { useContext, useRef } from 'react';
import { loginCall } from '../../state/actionCalls';
import { AuthContext } from '../../state/AuthContext';
import './Login.css';

export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, error, dispatch } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(email.current.value);
		// console.log(password.current.value);
		loginCall(
			{
				email: email.current.value,
				password: password.current.value,
			},
			dispatch
		);
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
						<p className="loginMsg">ログインはこちら</p>
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
						{error && (
							<span style={{ color: "red", fontSize: "13px", textAlign: "center" }}>
								{typeof error === "string" ? error : "メールアドレスまたはパスワードが正しくありません"}
							</span>
						)}
						<button className="loginButton" type="submit" disabled={isFetching}>
							{isFetching ? "ログイン中..." : "ログイン"}
						</button>
						<span className="loginForgot">パスワードを忘れた方へ</span>
						<button className="loginRegisterButton" type="button" onClick={() => window.location.href='/register'}>アカウント作成</button>
					</form>
				</div>
			</div>
		</div>
	)
}
