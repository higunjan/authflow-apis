const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    image: { type: String, required: true },
    hash: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now },
    skill: { type: Array, default: [] }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);