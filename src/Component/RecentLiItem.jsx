import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function RecentLiItem({ itm, title, link }) {
  let name = "";
  let category = "";
  console.log(title);

  switch (title) {
    case "Mentors":
      name = itm.name;
      category = itm.subjectTaught || itm.specialization || "Mentor";
      break;

    case "Courses":
      name = itm?.title || "Untitled Course";
      category = itm.examCategory || "N/A";
      break;

    case "Quizzes":
      name = itm.title;
      category = itm.exam || null;
      break;

    case "PYQs":
      name = itm?.title || "Untitled Paper";
      category = null;
      break;

    case "Batches":
      name = itm?.batchName || "Untitled Batch";
      category = itm.batchCategory || null;
      break;

    default:
      name = "Unknown Item";
      category = null;
  }

  return (
    <li className="flex items-center justify-between p-2 px-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 hover:shadow-sm transition">
      <div>
        <p className="text-sm font-medium text-gray-800">
          {name}{" "}
          {category && (
            <span className="text-gray-500 text-xs uppercase">
              - {category}
            </span>
          )}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(itm?.createdAt).toLocaleDateString()}
        </p>
      </div>
      <Link
        to={link}
        className="p-2 rounded-full bg-gray-100 border border-gray-100 hover:bg-gray-200 transition"
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </li>
  );
}
