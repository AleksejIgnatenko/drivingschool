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
        } else {
            const card = document.getElementById(`question-${test.questions[i].id}`)
            if(card) {
                card.style.borderTop = '2px solid rgb(226, 3, 3)';
                card.style.borderBottom = '2px solid rgb(226, 3, 3)';
            }
        }
    }

    const buttonPass = document.getElementById('buttonPass');
    const buttonRestartTest = document.getElementById('buttonRestartTest');
    buttonPass!.style.display = 'none';
    buttonRestartTest!.style.display = 'inline-block';

    setTimeout(() => {
        if (countCorrectAnswerUser > 8) {
            alert("Ваш результат: " + countCorrectAnswerUser + " из 10 (экзамен сдан)");
        } else {
            alert("Ваш результат: " + countCorrectAnswerUser + " из 10 (экзамен не сдан)");
        }
    }, 0);

    const answer: AnswerModelRequest = {
        testId: test.id,
        resultTest: countCorrectAnswerUser
    };

    fetchAddUserAnswerAsync(answer)
};

export const handleRestartTest = async() => {
    window.location.reload();
}