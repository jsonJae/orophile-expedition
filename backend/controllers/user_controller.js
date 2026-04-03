import User from '../models/user_model.js';

const getUserProfile = async (req, res) => {

    try{
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({message: "User not found."});
        }

        res.status(200).json(user);

    }catch(error){
        res.status(500).json({message: "Server error."})
    }

}

const updatePassword = async (req,res) => {
    
    try{
        const { newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({updated: false, message: "User not found."});
        }

        user.password = newPassword;

        user.save();

        res.status(200).json({updated: true, message: "Password updated", })

    }catch(error){
        res.status(500).json({message: "Server error."});
    }

}

const updateProfile = async (req,res) => {

    try{
        const { newName, newAge, newUsername, newPhoneNumber } = req.body
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {   
                $set:  {
                "name.first_name": newName?.first_name,
                "name.last_name": newName?.last_name,
                age: newAge,
                username: newUsername,
                phone_number: newPhoneNumber
                }
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );  

        if(!updatedUser){
            return res.status(400).json({updated: false, message: "Update profile failed" });
        }

        res.status(200).json({updated: true, message: "Successfully updated profile.", user: updatedUser});

    }catch(error){
        res.status(500).json({updated: false, message: "Update profile failed."});
    }
}

const getAllUsers = async (req,res) => {

    try{
        const users = await User.find();

        if(!users){
            return res.status(400).json({ message: "No users available"});
        }

        res.status(200).json({ success: true, users: users});

    }catch(error){

    }

}

export {getUserProfile, updatePassword, updateProfile, getAllUsers};