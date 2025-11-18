import {  useNavigate } from "react-router-dom";
import DashCard from "../Component/Cards/DashCards";
import { GiNotebook } from "react-icons/gi";
import RecentItemsCard from "../Component/Cards/RecentAddedCard";
import Loader from "../Component/Loader";
import { PiChalkboardSimpleBold, PiVideoBold } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { useGetContent } from "../hooks/useHooks";

function Dashboard() {
  const navigate = useNavigate();

  const {
    data: dashboard,
    isLoading,
    isError,
    error,
  } = useGetContent({
    keys: ["dashboard"],
    handlerProps: {
      url: "/totalcount",
    },
  });

  if (isLoading) return <Loader />;

  if (isError) return <p>{error}</p>;

  const CardsData = [
    {
      icon: <FaUsers />,
      title: "Mentors",
      count: dashboard.MentorsCount,
      // path: "/users/retailers",
      bgColor: "bg-[var(--accent)]",
    },
    {
      icon: <MdHistory />,
      title: "PYQs",
      count: dashboard.PYQsCount,
      // path: "/users/customers",
      bgColor: "bg-[var(--accent-dark)]",
    },
    {
      icon: <PiVideoBold />,
      title: "Courses",
      count: dashboard.CoursesCount,
      // path: "/products",
      bgColor: "bg-[var(--success)]",
    },
    {
      icon: <PiChalkboardSimpleBold />,
      title: "Batches",
      count: dashboard.BatchesCount,
      // path: "/messages",
      bgColor: "bg-[var(--warning)]",
    },
    {
      icon: <GiNotebook />,
      title: "Quizzes",
      count: dashboard.QuizzesCount,
      // path: "/revenue",
    },
  ];

  const recentCardData = [
    {
      title: "Mentors",
      link: "/mentors",
      data: dashboard.Mentors,
    },
    {
      title: "PYQs",
      link: "/studymaterial/pyq",
      data: dashboard?.PYQs[0]?.questionspaper || [],
    },
    {
      title: "Courses",
      link: "/courses",
      data: dashboard?.Courses[0]?.courses || [],
    },
    {
      title: "Batches",
      link: "/batches",
      data: dashboard.Batches[0].batches?.slice(0, 3),
    },
    {
      title: "Quizzes",
      link: "/studymaterial/quiz",
      data: dashboard.Quizzes,
    },
  ];

  return (
    <section className="p-6 w-full bg-[var(--primary-bg)] min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--primary-text)] mb-8">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  lg:grid-cols-5 ">
        {CardsData.map(({ icon, title, count, path, bgColor }, idx) => (
          <div
            key={idx}
            // className="cursor-pointer"
            // onClick={() => navigate(path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(path);
            }}
          >
            <DashCard
              icon={icon}
              title={title}
              number={count}
              bgColor={bgColor}
            />
          </div>
        ))}
      </div>

      <section className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-5   h-auto my-5 ">
        {recentCardData.map((item, i) => (
          <RecentItemsCard key={i} item={item} />
        ))}
      </section>
    </section>
  );
}

export default Dashboard;
