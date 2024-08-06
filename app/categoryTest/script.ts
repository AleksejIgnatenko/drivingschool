import { CategoryTestModel } from "../Models/TestModel/TestCategorymodel";
import { AnswerModelRequest } from "../Models/AnswerModel/AnswerModelRequest";
import { fetchAddUserAnswerAsync } from "../services/answerServices/fetchAddUserAnswerAsync";

export const handleCheckingTestAsync = async (test: CategoryTestModel | undefined, userAnswers: string[]) => {
    if (!test) {
        console.error('No test data provided');
        return;
    }

    let countCorrectAnswerUser = 0;
    for (let i = 0; i < test.questions.length; i++) {
        if (test.questions[i].correctAnswer === userAnswers[i]) {
            countCorrectAnswerUser++;
        }
    }

    const answer: AnswerModelRequest = {
        testId: test.id,
        resultTest: countCorrectAnswerUser
    };

    fetchAddUserAnswerAsync(answer)
};