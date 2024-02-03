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
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/routes/AdminRoute';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/Auth/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/dashboard" element={<PrivateRoute />}>
					<Route path="user" element={<Dashboard />} />
					<Route path="user/orders" element={<Orders />} />
					<Route path="user/profile" element={<Dashboard />} />
				</Route>
				<Route path='/dashboard' element={<AdminRoute />}>
					<Route path="admin" element={<AdminDashboard />} />
					<Route path="admin/create-category" element={<CreateCategory />} />
					<Route path="admin/create-product" element={<CreateProduct />} />
					<Route path="admin/product/:slug" element={<UpdateProduct />} />
					<Route path="admin/products" element={<Products />} />
					<Route path="admin/users" element={<Users />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/policy" element={<Policy />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
