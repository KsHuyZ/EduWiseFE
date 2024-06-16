export type TChoice = {
  content: string;
  correct: boolean;
};

export type TQuestion = {
  content: string;
  description: string;
  level: number;
  choiceResponses: TChoice[];
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
