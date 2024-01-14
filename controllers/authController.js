import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
	try {
		const { name, email, password, phone, address, answer } = req.body;
		//validation
		if (!name) {
			return res.send({ message: "Name is Required" });
		}
		if (!email) {
			return res.send({ message: "Email is Required" });
		}
		if (!password) {
			return res.send({ message: "Password is Required" });
		}
		if (!phone) {
			return res.send({ message: "Phone is Required" });
		}
		if (!address) {
			return res.send({ message: "Address is Required" });
		}
		if (!answer) {
			return res.send({ message: "Answer is Required" });
		}

		//check if user already exists
		const existingUser = await userModels.findOne({ email });
		if (existingUser) {
			return res.status(200).send({
				success: true,
				message: "Already registered please login!",
			});
		}

		//hash password
		const hashedPassword = await hashPassword(password);
		//save
		const user = await new userModels({
			name,
			email,
			phone,
			address,
			password: hashedPassword,
			answer
		});
		user.save();
		res.status(201).send({
			success: true,
			message: "User registeration successful",
			user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in registration",
			error,
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
				message: "Invalid email or password",
			});
		}
		//check user
		const user = await userModels.findOne({ email });
		if (!user) {
			res.status(404).send({
				success: false,
				message: "Email is not registered",
			});
		}

		const passwordMatch = await comparePassword(password, user.password);
		if (!passwordMatch) {
			res.status(200).send({
				success: false,
				message: "Invalid Password",
			});
		}

		//Token
		const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.status(200).send({
			success: true,
			message: "Login Successful",
			user: {
				name: user.name,
				email: user.email,
				phone: user.phone,
				address: user.address,
				role: user.role,
			},
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "error in login",
			error,
		});
	}
};

export const testController = (req, res) => {
	res.send("Protected Rouute");
};

//Forgot password controller
export const forgotPasswordController = async (req, res) => {
	try {
		const { email, answer, newPassword } = req.body;
		if (!email) {
			res.status(400).send({ message: "Email is required" });
		}
		if (!answer) {
			res.status(400).send({ message: "Answer is required" });
		}
		if (!newPassword) {
			res.status(400).send({ message: "NewPassword is required" });
		}
		//check
		const user = await userModels.findOne({ email, answer });
		//validation
		if (!user) {
			return res.status(404).send({
				success: false,
				message: "Wrong Email or Answer",
			});
		}
		const hashed = await hashPassword(newPassword);
		await userModels.findByIdAndUpdate(user._id, { password: hashed });
		res.status(200).send({
			success: true,
			message: "Password Reset Successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "something went wrong",
			error,
		});
	}
};
