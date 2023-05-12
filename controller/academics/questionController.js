const AsyncHandler = require('express-async-handler');
const Question = require('../../models/Academic/Questions');
const Exam = require('../../models/Academic/Exam');

//@desc Create Questions
//@route POST /api/v1/questions/:examID
//@access Private teachers only
exports.createQuestion = AsyncHandler(async (req, res) => {
    const {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        isCorrect
    } = req.body;

    //find Exam
    const examFound = await Exam.findById(req.params.examID);
    if (!examFound) {
        res.status(404);
        throw new Error('Exam not found');
    }

    //check if question already exist
    const questionExist = await Question.findOne({question});
    if(questionExist){
        throw new Error('Question already exist');
    }

    //create Exam question
    const questionCreated = await Question.create({
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        isCorrect,
        createdBy: req.userAuth._id,
    });

    //add question to exam
    examFound.questions.push(questionCreated?._id);

    //save exam
    await examFound.save();
    res.status(201).json({
        success: "success",
        message: 'Question created successfully',
        data: questionCreated,
    });
});