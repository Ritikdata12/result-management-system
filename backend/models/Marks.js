const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    attendanceMarks: Number,
    projectReviewMarks: Number,
    assessmentMarks: Number,
    projectSubmissionMarks: Number,
    linkedInPostMarks: Number,
    totalMarks: Number,
});

MarksSchema.pre('save', function (next) {
    this.totalMarks = this.attendanceMarks + this.projectReviewMarks + 
                      this.assessmentMarks + this.projectSubmissionMarks + 
                      this.linkedInPostMarks;
    next();
});

const MarksModel = mongoose.model('Marks', MarksSchema);
module.exports = MarksModel;