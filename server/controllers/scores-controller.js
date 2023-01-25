const {Scores} = require('../models/scores');

module.exports = {
    newScore: async (req, res) => {
        try {
            const newScore = await Scores.create(req.body);
            res.status(200).json({message: 'Score created successfully', newScore});
        } catch (error) {
            res.status(500).json({message: 'Error creating score', error});
        }
    },
    scorebyID: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const score = await Scores.findById(req.params.id);
                res.status(200).json({message: 'Score retrieved successfully', score});
            } catch (error) {
                res.status(500).json({message: 'Error retrieving score', error});
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized user, access denied.'});
        }
    },
    allScores: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const scores = await Scores.find();
                res.status(200).json({message: 'Scores retrieved successfully', scores});
            } catch (error) {
                res.status(500).json({message: 'Error retrieving scores', error});
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized user, access denied.'});
        }
    },
    topTenScores: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const scores = await Scores.find().sort({score: 1}).limit(10);
                res.status(200).json({message: 'Scores retrieved successfully', scores});
            } catch (error) {
                res.status(500).json({message: 'Error retrieving scores', error});
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized user, access denied.'});
        }
    },
    deleteByID: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const score = await Scores.findByIdAndDelete(req.params.id);
                res.status(200).json({message: 'Score deleted successfully', score});
            } catch (error) {
                res.status(500).json({message: 'Error deleting score', error});
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized user, access denied.'});
        }
    },
    deleteAll: async (req, res) => {
        if (req.body.password === process.env.SPASSWORD) {
            try {
                const scores = await Scores.deleteMany();
                res.status(200).json({message: 'Scores deleted successfully', scores});
            } catch (error) {
                res.status(500).json({message: 'Error deleting scores', error});
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized user, access denied.'});
        }
    }
}

// list all of the controllers here
// newScore, scorebyID, allScores, topTenScores, deleteByID, deleteAll