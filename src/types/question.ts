export interface Question {
  lessonId: string;
  title: string;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  title: string;
  correct: boolean;
}
