import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from  '../models/user_model.js';

const register = async (req,res) => {
    try{
        const {
            name,
            email,
            age,
            username,
            password,
            phone_number,
            role
        } = req.body

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({registered: false, message: 'Email already exists'});
        }

        const newUser = new User(
            {
                name,
                email,
                age,
                username,
                password,
                phone_number,
                role
            }
        )

        await newUser.save();
        res.status(200).json({registerd: true, message: 'Sucessfully registered user'});

    }catch(error){
        // check if the error is a validation error from mongoose
        if (error.name === 'ValidationError') {
            // initialize an empty dictionary
            const formattedErrors = {};
            
            // get all the validation error from mongoose with the key as the field along with the error message
            for (let field in error.errors) {
                formattedErrors[field] = error.errors[field].message;
            }

            // return a status 400 and the errors
            return res.status(400).json({ 
                registered: false,
                message: "Please fix the following errors", 
                errors: formattedErrors 
            });
        }

        // else for database errors
        res.status(500).json({ 
            registered: false,
            message: 'Something went wrong on the server', 
            error: error.message 
        })
    }
    
};

const login = async (req,res) => {
    const { email, password } = req.body;
};

export {register, login};