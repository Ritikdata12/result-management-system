const MarksModel = require('../models/Marks');
const excelJS = require('exceljs');

const uploadMarks = async (req, res) => {
    try {
        const workbook = new excelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet(1);
        
        worksheet.eachRow(async (row, rowIndex) => {
            if (rowIndex > 1) {
                const [studentId, attendance, projectReview, assessment, projectSubmission, linkedInPost] = row.values;
                await MarksModel.create({
                    studentId,
                    attendanceMarks: attendance,
                    projectReviewMarks: projectReview,
                    assessmentMarks: assessment,
                    projectSubmissionMarks: projectSubmission,
                    linkedInPostMarks: linkedInPost,
                });
            }
        });
        res.status(200).send('Marks uploaded successfully');
    } catch (err) {
        res.status(500).send('Error uploading marks');
    }
};
module.exports = {uploadMarks}