import AddNewQuiz from "../StudyMaterial/Quiz/AddQuiz";
import QuizListPage from "../StudyMaterial/Quiz/QuizListPage";

/* ---------- Component ---------- */

export default function () {
  return (
    <div className="flex">
      <div className="flex-1/2">
        <QuizListPage
          urls={{
            get: "/home/quizzes",
            delete: "/home/quizzes/delete/",
            update: "/home/update-quiz/",
          }}
          queryKey={"homeQuiz"}
          hideButton={true}
          cls={"grid grid-cols-1  gap-3"}
        />
      </div>
      <div className="flex-1/2">
        <AddNewQuiz url="/home/quizzes/upload" queryKey={"homeQuiz"} />
      </div>
    </div>
  );
}
