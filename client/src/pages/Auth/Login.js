import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AuthStyle.css';
import { useAuth } from '../../context/auth';

const Login = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ auth, setAuth ] = useAuth();

	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
				email,
				password
			});
			if (res && res.data.success) {
				toast.success(res.data && res.data.message);
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token
				});
				localStorage.setItem('auth', JSON.stringify(res.data));
				navigate('/');
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!');
		}
	};
	return (
		<Layout title={'Login - Ecommerce App'}>
			<div className="register form-container">
				<h4 className="title">Login Page</h4>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-control"
							id="exampleInputEmail"
							placeholder="Enter Your Email"
							required
						/>
					</div>
					<div className="mb-3">
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Enter Your Password"
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Login;