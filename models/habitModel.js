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
    date: Array,
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


habitSchema.methods.getTodayHabitsProcess = async function (req, id) {
    
    console.log('start getTodayHabitsProcess')
    result = []
    console.log("from model", req.query.specialTime, req.query.specialDay);

    console.log(req.user.id);
    console.log(req.query.specialTime);
    console.log( req.query.specialDay);
    var activeHabits = await Habit.find({ $and: [{ date:req.query.specialTime}, { user: id },{ appearDays:  req.query.specialDay }]});
    var notActiveHabits = await Habit.find({
        $and: [{ date: { $not: { $eq: req.query.specialTime } } }, { appearDays:  req.query.specialDay }, { user: id }, {
        $expr: {
            $lte: [
                { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                req.query.specialTime
            ]
        }
    }]});


    result[0] = notActiveHabits
    result[1] = activeHabits

    return await result
}

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;