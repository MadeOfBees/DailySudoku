const {User} = require('../models/user');

module.exports = {
    newUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json({ message: 'User created successfully', newUser });
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    },
    allUsers: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const users = await User.find();
                res.status(200).json({ message: 'Users retrieved successfully', users });
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving users', error });
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized user, access denied.' });
        }
    },
    userbyID: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const user = await User.findById(req.params.id);
                res.status(200).json({ message: 'User retrieved successfully', user });
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving user', error });
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized user, access denied.' });
        }
    },
    deleteByID: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const user = await User.findByIdAndDelete(req.params.id);
                res.status(200).json({ message: 'User deleted successfully', user });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting user', error });
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized user, access denied.' });
        }
    },
    deleteAll: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const users = await User.deleteMany();
                res.status(200).json({ message: 'Users deleted successfully', users });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting users', error });
            }
        }
        else {
            res.status(401).json({ message: 'Unauthorized user, access denied.' });
        }
    },
    isValidUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                res.status(200).json({ valid: true });
            }
            else {
                res.status(200).json({ valid: false });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error finding user', error });
        }
    }
};