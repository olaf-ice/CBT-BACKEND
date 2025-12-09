import { User } from "../../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required." });
        }

        // validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // validate password length
        if (password.length < 6 || password.length > 50) {
            return res.status(400).json({ message: "Password must be between 6 and 50 characters." });
        }

        // validate username length
        if (username.length < 1 || username.length > 30) {
            return res.status(400).json({ message: "Username must be between 1 and 30 characters." });
        }

        const usernameLower = username.toLowerCase();
        const emailLower = email.toLowerCase();

        // check if the user exists already by username or email
        const existing = await User.findOne({ $or: [{ email: emailLower }, { username: usernameLower }] });
        if (existing) {
            return res.status(409).json({ message: "User already exists" });
        }

        // create user
        const user = await User.create({
            username: usernameLower,
            email: emailLower,
            password: password
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        console.error('registerUser error:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate key error' });
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const loginUser = async ( req, res) =>{
    try{


        // checking if the user already exist
        const{ email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });


        //  compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
        
    } catch (error){
                res.status(500).json({
                    message: "Internal Server Error"
                })


    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not Found",
            });
        }

        res.status(200).json({
            message: "User logged out successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}; 
export { 
    registerUser,
    loginUser,
    logoutUser

};

