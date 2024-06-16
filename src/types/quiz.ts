export type TChoice = {
  content: string;
  correct: boolean;
};

export type TQuestion = {
  content: string;
  description: string;
  level: number;
};

export type TQuestionResponse = TQuestion & {
  choiceResponses: TChoice[];
};

export type TQuestionCredential = TQuestion & {
  choices: TChoice[];
};

export type TQuestionResults = {
  questionId: string;
  answerResults: {
    answerId: string;
  }[];
};

export type TQuizSubmitResults = {
  quizId: string;
  questionResultRequestList: TQuestionResults[];
};

export type TQuizCredentials = {
  title: string;
  description: string;
  idLesson: string;
  isFinalExam: boolean;
  questions: TQuestion[];
};
export type TQuiz = {
  id: string;
} & TQuizCredentials;
