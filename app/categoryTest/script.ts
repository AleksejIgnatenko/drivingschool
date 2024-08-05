import { QuestionModel } from "../Models/QuestionModel/QuestionModel";

export const handleCheckingTestAsync = async (questionData: QuestionModel[], userAnswers: string[]) => {
    let countCorrectAnswerUser = 0;
    for(let i = 0; i < questionData.length; i++){
        if(questionData[i].correctAnswer === userAnswers[i]){
            countCorrectAnswerUser++;
        }
    }
    console.log(userAnswers)
    console.log(countCorrectAnswerUser);
  };