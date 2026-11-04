"use client";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
};

const Tasks = () => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Finish project report",
      description: "Complete the final report for the project and submit it.",
      status: "In Progress",
      dueDate: "2025-02-18",
    },
    {
      id: 2,
      title: "Update website content",
      description: "Revise the homepage text to reflect recent changes.",
      status: "Pending",
      dueDate: "2025-02-20",
    },
    {
      id: 3,
      title: "Review pull requests",
      description:
        "Check and approve pending pull requests from the development team.",
      status: "In Progress",
      dueDate: "2025-02-19",
    },
    {
      id: 4,
      title: "Setup database backup",
      description:
        "Configure automated daily backups for the production database.",
      status: "Completed",
      dueDate: "2025-02-15",
    },
    {
      id: 5,
      title: "Design new landing page",
      description:
        "Create wireframes and mockups for the upcoming marketing campaign.",
      status: "Pending",
      dueDate: "2025-02-25",
    },
    {
      id: 6,
      title: "Fix login bug",
      description:
        "Resolve the issue where users cannot log in with Google authentication.",
      status: "In Progress",
      dueDate: "2025-02-17",
    },
    {
      id: 7,
      title: "Team sync meeting",
      description:
        "Discuss project milestones and sprint goals with the engineering team.",
      status: "Pending",
      dueDate: "2025-02-21",
    },
    {
      id: 8,
      title: "Write API documentation",
      description:
        "Document all REST API endpoints for the external developer portal.",
      status: "Pending",
      dueDate: "2025-02-28",
    },
    {
      id: 9,
      title: "Optimize image assets",
      description:
        "Compress and convert large images to WebP format to improve load times.",
      status: "Completed",
      dueDate: "2025-02-14",
    },
    {
      id: 10,
      title: "Deploy to staging",
      description:
        "Push the latest build to the staging environment for QA testing.",
      status: "Pending",
      dueDate: "2025-02-22",
    },
  ];

  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const MarkAsCompleted = (id: number) => {
    setTaskList((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task,
      ),
    );
  };

  const DeleteTask = (id: number) => {
    setTaskList((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  };

  const EditTask = (id: number) => {
    const task = taskList.find((task) => task.id === id);
    if (!task) {
      return;
    }

    const title = prompt("Edit Task Title:", task.title);
    if (title === null || title.trim() === "") {
      return;
    }

    setTaskList((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === id
          ? { ...currentTask, title: title.trim() }
          : currentTask,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tasks</h1>

        <section className="space-y-6">
          {taskList.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 border-l-4"
              style={{
                borderColor:
                  task.status === "Completed"
                    ? "green"
                    : task.status === "In Progress"
                      ? "yellow"
                      : "red",
              }}
            >
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">
                  {task.title}
                </h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              <section className="flex space-x-4">
                <span
                  className={`px-4 py-3 text-center text-sm rounded-full ${task.status === "Completed" ? "bg-green-200" : task.status === "In Progress" ? "bg-yellow-200" : "bg-red-200"}`}
                >
                  {task.status}
                </span>
                {/* Add a button for actions like "Mark as Completed" or "Edit" */}
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() => EditTask(task.id)}
                >
                  Edit
                </button>

                {task.status !== "Completed" && (
                  <button
                    className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                    onClick={() => MarkAsCompleted(task.id)}
                  >
                    Mark as Completed
                  </button>
                )}

                <button
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={() => DeleteTask(task.id)}
                >
                  delete
                </button>
              </section>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Tasks;
