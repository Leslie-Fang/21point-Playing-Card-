var mongoose = require('mongoose');

var Result = mongoose.Schema({
    computerScore: { type: Number },
    userScore: { type: Number },
    userInitials: {type: String}
});

//mongoose.connect('mongodb://localhost/hw06');
exports.Result = mongoose.model('Result', Result);