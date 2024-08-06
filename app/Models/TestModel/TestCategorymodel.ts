import { QuestionModel } from "../QuestionModel/QuestionModel";

export interface CategoryTestModel{
    id: string;
    nameTest: string
    questions: QuestionModel[]
}