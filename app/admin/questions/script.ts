import { QuestionModelRequest } from "@/app/Models/QuestionModel/QuestionModelRequest";
import { QuestionModel } from "@/app/Models/QuestionModel/QuestionModel";
import { fetchAddQuestionAsync } from "@/app/services/questionServices/fetchAddQuestionAsync";
import { fetchUpdateQuestionAsync } from "@/app/services/questionServices/fetchUpdateQuestionAsync";
import { fetchDeleteQuestionAsync } from "@/app/services/questionServices/fetchDeleteQuestionAsync";
import styles from './styles.module.css';

export const addQuestion = async () => {
    const selectTestId = document.getElementById('tests') as HTMLSelectElement;
    const inputQuestionText = document.getElementById('questionText') as HTMLInputElement;
    const inputLinkPhoto = document.getElementById('linkPhoto') as HTMLInputElement;
    const inputAnswer1 = document.getElementById('answer1') as HTMLInputElement;
    const inputAnswer2 = document.getElementById('answer2') as HTMLInputElement;
    const inputAnswer3 = document.getElementById('answer3') as HTMLInputElement;
    const inputAnswer4 = document.getElementById('answer4') as HTMLInputElement;
    const inputCorrectAnswer = document.getElementById('correctAnswer') as HTMLInputElement;

    const questionModelRequest: QuestionModelRequest = {
        idTest: selectTestId.value,
        questionText: inputQuestionText.value,
        linkPhoto: inputLinkPhoto.value,
        answer1: inputAnswer1.value,
        answer2: inputAnswer2.value,
        answer3: inputAnswer3.value,
        answer4: inputAnswer4.value,
        correctAnswer: inputCorrectAnswer.value,
    }

    const result = await fetchAddQuestionAsync(questionModelRequest);
    if(result){
        inputQuestionText.value = '';
        inputLinkPhoto.value = '';
        inputAnswer1.value = '';
        inputAnswer2.value = '';
        inputAnswer3.value = '';
        inputAnswer4.value = '';
        inputCorrectAnswer.value = '';
    }
}

export const handleUpdateQuestion = async (questionModel: QuestionModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;

    const testName = document.getElementById(`testName-${questionModel.id}`);
    const questionText = document.getElementById(`questionText-${questionModel.id}`);
    const linkPhoto = document.getElementById(`linkPhoto-${questionModel.id}`);
    const answer1 = document.getElementById(`answer1-${questionModel.id}`);
    const answer2 = document.getElementById(`answer2-${questionModel.id}`);
    const answer3 = document.getElementById(`answer3-${questionModel.id}`);
    const answer4 = document.getElementById(`answer4-${questionModel.id}`);
    const correctAnswer = document.getElementById(`correctAnswer-${questionModel.id}`);

    const tests = document.getElementById(`dropdownTest-${questionModel.id}`) as HTMLSelectElement;
    const inputNewQuestionText = document.getElementById(`updateQuestionNameInput-${questionModel.id}`) as HTMLInputElement;
    const inputNewLinkPhoto = document.getElementById(`updateLinkPhotoInput-${questionModel.id}`) as HTMLInputElement;
    const inputNewAnswer1 = document.getElementById(`updateAnswer1Input-${questionModel.id}`) as HTMLInputElement;
    const inputNewAnswer2 = document.getElementById(`updateAnswer2Input-${questionModel.id}`) as HTMLInputElement;
    const inputNewAnswer3 = document.getElementById(`updateAnswer3Input-${questionModel.id}`) as HTMLInputElement;
    const inputNewAnswer4 = document.getElementById(`updateAnswer4Input-${questionModel.id}`) as HTMLInputElement;
    const inputNewCorrectAnswer = document.getElementById(`updateCorrectAnswerInput-${questionModel.id}`) as HTMLInputElement;

    if(buttons && testName && questionText && linkPhoto && answer1 && answer2 && answer3 && answer4 && correctAnswer
        && tests && inputNewQuestionText && inputNewLinkPhoto && inputNewAnswer1 && inputNewAnswer2 && inputNewAnswer3 && inputNewAnswer4 && inputNewCorrectAnswer) {
        // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
        (buttons[0] as HTMLElement).style.display = 'none';
        (buttons[3] as HTMLElement).style.display = 'none';
        testName.style.display = 'none';
        questionText.style.display = 'none';
        linkPhoto.style.display = 'none';
        answer1.style.display = 'none';
        answer2.style.display = 'none';
        answer3.style.display = 'none';
        answer4.style.display = 'none';
        correctAnswer.style.display = 'none';

        // Show the "Check Mark" and "Cancellation" buttons
        (buttons[1] as HTMLElement).style.display = 'inline-block';
        (buttons[2] as HTMLElement).style.display = 'inline-block';
        // Find the category by name and set its value in the dropdown
        const testOptions = Array.from(tests.options);
        const selectedOption = testOptions.find(option => option.text === questionModel.nameTest);
        if (selectedOption) {
        tests.value = selectedOption.value;
        tests.style.display = 'inline-block';
        }

        inputNewQuestionText.value = questionModel.questionText;
        inputNewQuestionText.style.display = 'inline-block';
        inputNewLinkPhoto.value = questionModel.linkPhoto;
        inputNewLinkPhoto.style.display = 'inline-block';
        inputNewAnswer1.value = questionModel.answer1;
        inputNewAnswer1.style.display = 'inline-block';
        inputNewAnswer2.value = questionModel.answer2;
        inputNewAnswer2.style.display = 'inline-block';
        inputNewAnswer3.value = questionModel.answer3;
        inputNewAnswer3.style.display = 'inline-block';
        inputNewAnswer4.value = questionModel.answer4;
        inputNewAnswer4.style.display = 'inline-block';
        inputNewCorrectAnswer.value = questionModel.correctAnswer;
        inputNewCorrectAnswer.style.display = 'inline-block';
    }
}

export const handleUpdateQuestionConfirm = async (questionModel: QuestionModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
        const buttons = event.currentTarget.parentNode?.children;
        const tests = document.getElementById(`dropdownTest-${questionModel.id}`) as HTMLSelectElement;
        const inputNewQuestionText = document.getElementById(`updateQuestionNameInput-${questionModel.id}`) as HTMLInputElement;
        const inputNewLinkPhoto = document.getElementById(`updateLinkPhotoInput-${questionModel.id}`) as HTMLInputElement;
        const inputNewAnswer1 = document.getElementById(`updateAnswer1Input-${questionModel.id}`) as HTMLInputElement;
        const inputNewAnswer2 = document.getElementById(`updateAnswer2Input-${questionModel.id}`) as HTMLInputElement;
        const inputNewAnswer3 = document.getElementById(`updateAnswer3Input-${questionModel.id}`) as HTMLInputElement;
        const inputNewAnswer4 = document.getElementById(`updateAnswer4Input-${questionModel.id}`) as HTMLInputElement;
        const inputNewCorrectAnswer = document.getElementById(`updateCorrectAnswerInput-${questionModel.id}`) as HTMLInputElement;
        const card = event.currentTarget.closest(`.${styles.card}`) as HTMLElement | null;

        if(buttons && tests && inputNewQuestionText && inputNewLinkPhoto && inputNewAnswer1 && inputNewAnswer2 && inputNewAnswer3 && inputNewAnswer4 && inputNewCorrectAnswer && card) {
            const updateQuestionRequest: QuestionModelRequest = {
                idTest: tests.value,
                questionText: inputNewQuestionText.value,
                linkPhoto: inputNewLinkPhoto.value,
                answer1: inputNewAnswer1.value,
                answer2: inputNewAnswer2.value,
                answer3: inputNewAnswer3.value,
                answer4: inputNewAnswer4.value,
                correctAnswer: inputNewCorrectAnswer.value
            }

            const updatedQuestion = await fetchUpdateQuestionAsync(questionModel.id, updateQuestionRequest);
            console.log(updatedQuestion);
            if (updatedQuestion){
                // Update the user's card
                const questionIdElement = card.querySelector("h3:nth-of-type(1)");
                const testNameElement = card.querySelector("h3:nth-of-type(2)");
                const questionTextElement = card.querySelector("h3:nth-of-type(3)");
                const linkPhotoElement = card.querySelector("h3:nth-of-type(4)");
                const answer1Element = card.querySelector("h3:nth-of-type(5)");
                const answer2Element = card.querySelector("h3:nth-of-type(6)");
                const answer3Element = card.querySelector("h3:nth-of-type(7)");
                const answer4Element = card.querySelector("h3:nth-of-type(8)");
                const correctAnswerElement = card.querySelector("h3:nth-of-type(9)");

                if(questionIdElement && testNameElement && questionTextElement && linkPhotoElement && answer1Element && answer2Element && answer3Element && answer4Element 
                    && correctAnswerElement){
                    questionIdElement.textContent = `Id: ${updatedQuestion.id}`;
                    testNameElement.textContent = `Name test: ${updatedQuestion.nameTest}`;
                    questionTextElement.textContent = `Question text: ${updatedQuestion.questionText}`;
                    linkPhotoElement.textContent = `Link photo: ${updatedQuestion.linkPhoto}`;
                    answer1Element.textContent = `Answer 1: ${updatedQuestion.answer1}`;
                    answer2Element.textContent = `Answer 2: ${updatedQuestion.answer2}`;
                    answer3Element.textContent = `Answer 3: ${updatedQuestion.answer3}`;
                    answer4Element.textContent = `Answer 4: ${updatedQuestion.answer4}`;
                    correctAnswerElement.textContent = `Correct answer: ${updatedQuestion.correctAnswer}`;
                }

                questionModel.nameTest = updatedQuestion.nameTest;
                questionModel.questionText = updatedQuestion.questionText;
                questionModel.linkPhoto = updatedQuestion.linkPhoto;
                questionModel.answer1 = updatedQuestion.answer1;
                questionModel.answer2 = updatedQuestion.answer2;
                questionModel.answer3 = updatedQuestion.answer3;
                questionModel.answer4 = updatedQuestion.answer4;
                questionModel.correctAnswer = updatedQuestion.correctAnswer;

                // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
                hideButtons(questionModel, buttons);
        
                // Show the "Check Mark" and "Cancellation" buttons
                showButtons(questionModel, buttons);
            }
        }
    } catch (error) {
        console.error("Error updating category:", error);
    }
}

export const handleDeleteQuestion = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      (buttons[0] as HTMLElement).style.display = 'none';
      (buttons[3] as HTMLElement).style.display = 'none';
  
      // Show the "Check Mark" and "Cancellation" buttons
      (buttons[4] as HTMLElement).style.display = 'inline-block';
      (buttons[5] as HTMLElement).style.display = 'inline-block';
    }
}

export const handleCancellation = async (question: QuestionModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons = event.currentTarget.parentNode?.children;
  
    if (buttons) {
      // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
      hideButtons(question, buttons);
  
      // Show the "Check Mark" and "Cancellation" buttons
      showButtons(question, buttons);
    }
};

export const handleDeleteQuestionConfirm = async (question: QuestionModel, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
        const buttons = event.currentTarget.parentNode?.children;
        if(buttons) {
            await fetchDeleteQuestionAsync(question.id);

            // Hide the "Issue a Moderator" and "Delete a Moderator" buttons
            hideButtons(question, buttons);

            // Show the "Check Mark" and "Cancellation" buttons
            showButtons(question, buttons);
        }
    } catch (error) {
        console.error("Error deletion question:", error);
    }
}

const hideButtons = (question: QuestionModel, buttons: HTMLCollection) => {
    (buttons[1] as HTMLElement).style.display = 'none';
    (buttons[2] as HTMLElement).style.display = 'none';
    (buttons[4] as HTMLElement).style.display = 'none';
    (buttons[5] as HTMLElement).style.display = 'none';

    const tests = document.getElementById(`dropdownTest-${question.id}`) as HTMLSelectElement;
    const inputNewQuestionText = document.getElementById(`updateQuestionNameInput-${question.id}`) as HTMLInputElement;
    const inputNewLinkPhoto = document.getElementById(`updateLinkPhotoInput-${question.id}`) as HTMLInputElement;
    const inputNewAnswer1 = document.getElementById(`updateAnswer1Input-${question.id}`) as HTMLInputElement;
    const inputNewAnswer2 = document.getElementById(`updateAnswer2Input-${question.id}`) as HTMLInputElement;
    const inputNewAnswer3 = document.getElementById(`updateAnswer3Input-${question.id}`) as HTMLInputElement;
    const inputNewAnswer4 = document.getElementById(`updateAnswer4Input-${question.id}`) as HTMLInputElement;
    const inputNewCorrectAnswer = document.getElementById(`updateCorrectAnswerInput-${question.id}`) as HTMLInputElement;

    tests.style.display = 'none';
    inputNewQuestionText.style.display = 'none';
    inputNewLinkPhoto.style.display = 'none';
    inputNewAnswer1.style.display = 'none';
    inputNewAnswer2.style.display = 'none';
    inputNewAnswer3.style.display = 'none';
    inputNewAnswer4.style.display = 'none';
    inputNewCorrectAnswer.style.display = 'none';
  };
  
  const showButtons = (question: QuestionModel, buttons: HTMLCollection) => {
    (buttons[0] as HTMLElement).style.display = 'inline-block';
    (buttons[3] as HTMLElement).style.display = 'inline-block';

    const testName = document.getElementById(`testName-${question.id}`);
    const questionText = document.getElementById(`questionText-${question.id}`);
    const linkPhoto = document.getElementById(`linkPhoto-${question.id}`);
    const answer1 = document.getElementById(`answer1-${question.id}`);
    const answer2 = document.getElementById(`answer2-${question.id}`);
    const answer3 = document.getElementById(`answer3-${question.id}`);
    const answer4 = document.getElementById(`answer4-${question.id}`);
    const correctAnswer = document.getElementById(`correctAnswer-${question.id}`);

    if(testName && questionText && linkPhoto && answer1 && answer2 && answer3 && answer4 && correctAnswer) {
        testName.style.display = 'inline-block';
        questionText.style.display = 'inline-block';
        linkPhoto.style.display = 'inline-block';
        answer1.style.display = 'inline-block';
        answer2.style.display = 'inline-block';
        answer3.style.display = 'inline-block';
        answer4.style.display = 'inline-block';
        correctAnswer.style.display = 'inline-block';
    }
};