const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    profileImageUrl: { type: String },
    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
