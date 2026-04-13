import bcrypt from 'bcryptjs';
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

        await user.save();

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

const deleteAccount = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('+password');

        if(!user){
            return res.status(400).json({message: "No user found"});
        }

        const { password } = req.body;
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({message: "Wrong password"});
        }

        const deletedUser = await User.findByIdAndDelete(req.user.id);

        if(!deletedUser){
            return res.status(400).json({success: false, message: "Failed to delete user. No user found."});
        }

        res.status(200).json(
            {success: true, 
            message: "Successfully deleted your account", 
            deletedUser: {
                name: deletedUser.name.first_name + " " + deletedUser.name.last_name
            }
        });

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const getAllUsers = async (req,res) => {

    try{
        const sortBy = req.sorting
        const { page, limit, skip, totalUsers, totalPages} = req.pagination

        const users = await 
            User.find({role: "user"})
                .sort(sortBy)
                .skip(skip)
                .limit(limit)

        res.status(200).json(
            {
                success: true, 
                users: users,
                page: page,
                limit: limit,
                skip: skip,
                totalUsers: totalUsers,
                totalPages: totalPages,
                sortBy: sortBy
            }
        )
    }catch(error){
        res.status(500).json({error: error.message});
    }

}

const deleteUser = async (req,res) => {

    try{
        const { id } = req.params;
        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({message: "User not found. "});
        }

        const { confirmation } = req.body;

        if(!confirmation){
            return res.status(400).json({message: "No confirmation message. "});
        }

        if(confirmation !== "confirm user deletion"){
            return res.status(400).json({message: "Wrong confirmation message. "});
        }
        
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        res.status(200).json({success: true, 
            message: "Successfully deleted user. ",
            deletedUser: {
                id: id,
                name: deletedUser.name.first_name + " " + deletedUser.name.last_name
            }
        })

    }catch(error){
        return res.status(500).json({error : error.message });
    }

}

export {getUserProfile, updatePassword, updateProfile, deleteAccount, getAllUsers, deleteUser};