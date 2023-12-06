import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children, title, description, keywords, author }) => {
	return (
		<div>
			<div className="application">
				<Helmet>
					<meta charSet="utf-8" />
					<meta name="description" content={description} />
					<meta name="keywords" content={keywords} />
					<meta name="author" content={author} />
					<title>{title}</title>
				</Helmet>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
				<Header />
				<main style={{ flex: '1', minHeight: 'calc(100vh - (30vh))' }}>
					<ToastContainer />
					{children}
				</main>
				<Footer />
			</div>
		</div>
	);
};

Layout.defaultProps = {
	title: 'Ecommerce App - shop now',
	description: 'MERN stack project',
	keywords: 'react,node,mongodb,express',
	author: 'Aayush Bhandari'
};

export default Layout;
