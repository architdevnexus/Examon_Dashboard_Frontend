const data = [
  {
    id: 1,
    category: "a",
    exams: [
      {
        title: "exam 1",
      },
      {
        title: "exam 2",
      },
      {
        title: "exam 3",
      },
    ],
  },
  {
    id: 1,
    category: "b",
    exams: [
      {
        title: "exam 1",
      },
      {
        title: "exam 2",
      },
      {
        title: "exam x",
      },
    ],
  },
];

const modified = data
  .map((ec) => ({
    exam: ec.exams.filter((exam) => exam.title == "exam x"),
    category: ec.category,
  }))
  .filter((exm) => exm.exam.length > 0);

console.log(modified);
