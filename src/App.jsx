// App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import { SidebarProvider, useSidebar } from "./Component/Navbar/SidebarContext";
import { ToastContainer } from "react-toastify";

// Pages
import Dashboard from "./Pages/Dashboard";
// import Commission from "./Pages/Reviews";

// Latest news
import AddNewsForm from "./Pages/LatestNews/AddNews";

import NewsList from "./Pages/LatestNews/NewsListingPage";

// Product Moderation

// User Management
import Mentors from "./Pages/Mentors/Mentors";

// Authentication
import Login from "./Pages/Login";
import ProtectedRoute from "./Component/Auth/ProtectRoute";

// Quiz
import AddNewQuiz from "./Pages/StudyMaterial/Quiz/AddQuiz";
import QuizListPage from "./Pages/StudyMaterial/Quiz/QuizListPage";

// Courses
import CourseFormPage from "./Pages/Courses/AddCourse";
import CourseList from "./Pages/Courses/ListAllCourses";

// Achivements
import Achievements from "./Pages/Achievements";
import ReviewListPage from "./Pages/Reviews";

// blog
import BlogPage from "./Pages/Blogs/BlogListingPage";
import WriteBlog from "./Component/TextEditor/Editor";

// Batch
import BatchListingPage from "./Pages/Batches/BatchListingPage";
import AddBatchForm from "./Pages/Batches/AddBatch";

// pyqs
import PYQListingPage from "./Pages/StudyMaterial/PYQs/PYQListingPage";
import AddPyqForm from "./Pages/StudyMaterial/PYQs/AddPYQForm";

// Notes
import NotesListingPage from "./Pages/StudyMaterial/Notes/NotesListingPage";
import AddNotes from "./Pages/StudyMaterial/Notes/AddNotes";
import CourseUpdateForm from "./Pages/Courses/EditCourse";
import BatchUpdateForm from "./Pages/Batches/BatchUpdateForm";
import UpdateQuizForm from "./Pages/StudyMaterial/Quiz/UpdateQuiz";
import ExamDetail from "./Pages/Exam/ExamDetail";
import AddExamEditor from "./Pages/Exam/AddExamEditor";
import AddMentorForm from "./Pages/Mentors/AddMentor";
import UpdateMentorForm from "./Pages/Mentors/UpdateMentor";
import DedicatedBlogPage from "./Pages/Blogs/Blog";
import ViewExamInDetail from "./Pages/Exam/ViewExamInDetail";
import UpdateExamEditor from "./Pages/Exam/UpdateExam";
import UpdateNewsForm from "./Pages/LatestNews/UpdateNews";
import LogOut from "./Component/LogOut";
import { useState } from "react";
import UpdateBlog from "./Pages/Blogs/UpdateBlog";
import ContactDetailsPage from "./Pages/ContactUs";
import UserManagement from "./Pages/UserManagement";
import UserReview from "./Pages/DynamicPages/UserReview";
import UserQuiz from "./Pages/DynamicPages/UserQuiz";
import Notification from "./Pages/Notification";

function AppContent() {
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  const { collapsed } = useSidebar();

  return (
    <div className="flex   w-auto">
      {authUser && <Navbar user={authUser} />}

      {/* Dynamic margin left based on collapse */}
      <main
        className={`transition-all duration-300 w-full min-h-screen bg-gray-50 ${
          authUser && (collapsed ? "ml-20" : "ml-72")
        }`}
      >
        <Routes>
          <Route path="/login" index element={<Login />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<Dashboard />} />

                  <Route
                    path="/logout"
                    element={<LogOut logout={setAuthUser} />}
                  />

                  <Route path="/mentors" element={<Mentors />} />

                  <Route path="/mentors/add" element={<AddMentorForm />} />

                  <Route
                    path="/mentors/update/:id"
                    element={<UpdateMentorForm />}
                  />

                  <Route path="/notification" element={<Notification />} />

                  {/* ------------- Quizzzzzz -------------- */}
                  <Route
                    path="/studymaterial/quiz"
                    element={<QuizListPage />}
                  />
                  <Route
                    path="/studymaterial/add-quiz"
                    element={<AddNewQuiz />}
                  />
                  <Route
                    path="/studymaterial/update-quiz/:id"
                    element={<UpdateQuizForm />}
                  />
                  {/* --------------------------- */}

                  {/* ------------- PYQ -------------- */}

                  <Route
                    path="/studymaterial/pyq"
                    element={<PYQListingPage />}
                  />
                  <Route
                    path="/studymaterial/pyq/add"
                    element={<AddPyqForm />}
                  />
                  {/* ------------- Notes -------------- */}

                  <Route
                    path="/studymaterial/notes"
                    element={<NotesListingPage />}
                  />
                  <Route
                    path="/studymaterial/notes/add"
                    element={<AddNotes />}
                  />
                  {/* --------------------------- */}

                  {/* ------------- course -------------- */}

                  <Route path="/courses" element={<CourseList />} />

                  <Route path="/course/add" element={<CourseFormPage />} />

                  <Route
                    path="/course/update/:cid/:id"
                    element={<CourseUpdateForm />}
                  />

                  <Route path="/user-reviews/:id" element={<UserReview />} />
                  <Route path="/user-quizzes/:id" element={<UserQuiz />} />

                  {/* --------------------------- */}

                  <Route path="/achievements" element={<Achievements />} />

                  <Route path="/exams" element={<ExamDetail />} />
                  <Route path="/exams/:id" element={<ViewExamInDetail />} />
                  <Route path="/exams/add" element={<AddExamEditor />} />
                  <Route
                    path="/exams/update/:id"
                    element={<UpdateExamEditor />}
                  />

                  <Route path="/news" element={<NewsList />} />
                  <Route path="/news/add" element={<AddNewsForm />} />
                  <Route path="/news/update/:id" element={<UpdateNewsForm />} />

                  <Route path="/reviews" element={<ReviewListPage />} />
                  <Route path="/reviews/pending" element={<ReviewListPage />} />

                  {/* blog routes */}
                  <Route path="/blogs" element={<BlogPage />} />
                  <Route path="/blog/add" element={<WriteBlog />} />
                  <Route path="/blog/update/:id" element={<UpdateBlog />} />
                  <Route path="/blog/:id" element={<DedicatedBlogPage />} />
                  {/* <Route path="/blog/:id" element={< />} /> */}

                  {/* batch routes */}

                  <Route path="/batches" element={<BatchListingPage />} />

                  <Route path="/user-management" element={<UserManagement />} />

                  <Route path="/batch/add" element={<AddBatchForm />} />

                  <Route path="/contact-us" element={<ContactDetailsPage />} />

                  <Route
                    path="/batch/update/:cid/:id"
                    element={<BatchUpdateForm />}
                  />

                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!rounded-xl !text-sm !font-medium"
        progressClassName="!bg-blue-500"
        bodyClassName="!text-white"
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppContent />
      </SidebarProvider>
    </Router>
  );
}

export default App;
