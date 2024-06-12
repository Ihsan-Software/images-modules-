const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true,'missing name of habit...']
    },

    description: {
        type: String,
        require: [true, 'missing description of habit...'],
        default: ' ',
    },
    icon: {
        type: String,
        require: [true,'missing icon of habit...'],
    },

    counter: {
        type: Number,
        require: [true,'missing counter of habit...'],
        default: 0,
    },

    active: {
        type: Boolean,
        require: [true,'missing active of habit...'],
        default: false
    },
    date: {
        type: Array,
        default:[]
    },
    appearDays: Array,

    user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: [true,'missing userID of habit...']
        }
},{
    timestamps: true
});
habitSchema.pre(/^find/, function(next){
    this.find().select('-__v')
    next();
})


const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;