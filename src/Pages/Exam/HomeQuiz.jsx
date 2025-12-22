import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddNewQuiz from "../StudyMaterial/Quiz/AddQuiz";
import QuizListPage from "../StudyMaterial/Quiz/QuizListPage";

/* ---------- Helpers ---------- */

const createEmptyQuestion = () => ({
  type: "multiple_choice",
  question: "",
  options: ["", "", "", ""],
  correctAnswerIndex: null,
  marks: 2,
  topic: "",
  difficulty: "easy",
});

/* ---------- Component ---------- */

export default function () {
  const [title, setTitle] = useState("");
  const [exam, setExam] = useState("");
  const [duration, setDuration] = useState(3600);
  const [tags, setTags] = useState("");
  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [loading, setLoading] = useState(false);

  /* ---------- Handlers ---------- */

  const updateQuestion = useCallback((index, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  }, []);

  const updateOption = useCallback((qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, idx) => (idx === oIndex ? value : o)),
            }
          : q
      )
    );
  }, []);

  const addQuestion = () =>
    setQuestions((prev) => [...prev, createEmptyQuestion()]);

  const removeQuestion = (index) =>
    setQuestions((prev) =>
      prev.length === 1 ? prev : prev.filter((_, i) => i !== index)
    );

  /* ---------- Submit ---------- */

  const handleSubmit = async () => {
    if (!title.trim() || !exam.trim()) {
      return toast.error("Title and Exam are required");
    }

    for (const q of questions) {
      if (
        !q.question.trim() ||
        q.correctAnswerIndex === null ||
        q.options.some((o) => !o.trim()) ||
        !q.topic.trim()
      ) {
        return toast.error("Please complete all question fields");
      }
    }

    const payload = {
      title: title.trim(),
      exam: exam.trim(),
      duration,
      totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      questions,
    };

    /* ---------- CONSOLE PAYLOAD ---------- */
    console.group("📦 Home Quiz Upload Payload");
    console.log(JSON.stringify(payload, null, 2));
    console.groupEnd();

    try {
      setLoading(true);

      await axios.post(
        "https://backend.mastersaab.co.in/api/home/quizzes/upload",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Home Quiz uploaded successfully");
      setTitle("");
      setExam("");
      setDuration(3600);
      setTags("");
      setQuestions([createEmptyQuestion()]);
    } catch (err) {
      console.error("❌ Upload Error:", err);
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

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
