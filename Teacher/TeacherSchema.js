const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    subject: { type: String, required: true },
    profileImageUrl: { type: String },

    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
