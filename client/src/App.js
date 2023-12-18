import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Auth/user/Dashboard';
import PrivateRoute from './components/routes/Private';
function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dashboard" element={<PrivateRoute />}>
					<Route path="" element={<Dashboard />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/policy" element={<Policy />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
