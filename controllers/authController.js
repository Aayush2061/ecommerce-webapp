import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModels from '../models/userModels.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
	try {
		const { name, email, password, phone, address } = req.body;
		//validation
		if (!name) {
			return res.send({ message: 'Name is Required' });
		}
		if (!email) {
			return res.send({ message: 'Email is Required' });
		}
		if (!password) {
			return res.send({ message: 'Password is Required' });
		}
		if (!phone) {
			return res.send({ message: 'Phone is Required' });
		}
		if (!address) {
			return res.send({ message: 'Address is Required' });
		}

		//check if user already exists
		const existingUser = await userModels.findOne({ email });
		if (existingUser) {
			return res.status(200).send({
				success: true,
				message: 'Already registered please login!'
			});
		}

		//hash password
		const hashedPassword = await hashPassword(password);
		//save
		const user = await new userModels({ name, email, phone, address, password: hashedPassword });
		user.save();
		res.status(201).send({
			success: true,
			message: 'User registeration successful',
			user
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'Error in registration',
			error
		});
	}
};

export const loginController = async (req, res) => {
	try {
		const { email, password } = req.body;
		//validation
		if (!email || !password) {
			return res.status(404).send({
				success: false,
				message: 'Invalid email or password'
			});
		}
		//check user
		const user = await userModels.findOne({ email });
		if (!user) {
			res.status(404).send({
				success: false,
				message: 'Email is not registered'
			});
		}

		const passwordMatch = await comparePassword(password, user.password);
		if (!passwordMatch) {
			res.status(200).send({
				success: false,
				message: 'Invalid Password'
			});
		}

		//Token
		const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

		res.status(200).send({
			success: true,
			message: 'Login Successful',
			user: {
				name: user.name,
				email: user.email,
				phone: user.phone,
				address: user.address
			},
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: 'error in login',
			error
		});
	}
};

export const testController = (req, res) => {
	res.send('Protected Rouute');
};
