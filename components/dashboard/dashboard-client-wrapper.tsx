"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddTaskModal from "@/components/dashboard/add-task-modal";
import EditTaskModal from "@/components/dashboard/edit-task-modal";
import SideBar from "@/components/dashboard/sidebar";

export default function DashboardClient({ initialUser }: { initialUser: any }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const [tasks, setTasks] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const fetchUser = async () => {
    if (!initialUser?.id) return;
    try {
      const res = await axios.get(`/api/users/${initialUser.id}`);
      setUserData(res.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/users/${initialUser.id}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      await Promise.all([fetchTasks(), fetchUser()]);
    };
    initData();
  }, []);

  const handleDeleteTask = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleComplete = async (id: number, currentStatus: boolean) => {
    try {
      const res = await axios.put(`/api/tasks/${id}`, {
        completed: !currentStatus,
      });
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "todo") return !task.completed;
    if (activeFilter === "completed") return task.completed;
    return true;
  });

  const openEditModal = (task: any) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  const formatDate = (dateString: any) =>
    new Date(dateString).toLocaleDateString("id-ID");
  const getTitle = () =>
    activeFilter === "todo"
      ? "To Do"
      : activeFilter === "completed"
        ? "Completed"
        : "All Tasks";

  return (
    <section className="dashboard flex flex-col lg:flex-row min-h-screen bg-[#f9fbfd] text-[#4C3575] p-4 md:p-6 gap-4 md:gap-6 font-sans">
      <SideBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        userData={userData}
      />

      <div className="main flex-1 bg-white rounded-3xl border border-[#4C3575]/10 shadow-sm p-6 md:p-8 relative overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-xl md:text-2xl font-bold">{getTitle()}</h1>
            <div className="absolute -bottom-1 left-0 w-8 h-1 bg-[#4C3575] rounded-full"></div>
          </div>
        </header>

        <div className="main__card-container grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {isLoading ? (
            <p className="text-center col-span-full">Loading tasks...</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="main__card bg-[#f9fbfd] p-5 rounded-2xl border border-[#4C3575]/5 shadow-sm hover:border-[#4C3575]/20 transition-all"
              >
                <div>
                  <h2 className="text-lg font-bold mb-2">{task.title}</h2>
                  <p className="text-[#4C3575]/60 text-sm mb-4">
                    {task.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="text-xs text-[#4C3575]/40 mb-4 font-medium">
                    {formatDate(task.createdAt)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-4 py-1 text-[10px] font-bold rounded-full uppercase cursor-pointer ${task.completed ? "bg-green-100 text-green-600" : "bg-[#4C3575]/10 text-[#4C3575]"}`}
                      onClick={() =>
                        handleToggleComplete(task.id, task.completed)
                      }
                    >
                      {task.completed ? "Completed" : "To Do"}
                    </span>
                    <div className="main__card-feature flex gap-3 opacity-40">
                      <button
                        className="hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => openEditModal(task)}
                      >
                        <img
                          src="/dashboard/edit.png"
                          alt="edit"
                          className="w-4 h-4"
                        />
                      </button>
                      <button
                        className="hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <img
                          src="/dashboard/delete.png"
                          alt="delete"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          <div
            className="border-2 border-dashed border-[#4C3575]/10 rounded-2xl flex items-center justify-center min-h-\[180px\] cursor-pointer hover:bg-[#4C3575]/5 hover:border-[#4C3575]/30 transition group"
            onClick={() => setModalOpen(true)}
          >
            <div className="flex items-center gap-2 text-[#4C3575]/40 group-hover:text-[#4C3575]">
              <span className="text-xl font-bold">+</span>
              <span className="text-sm font-semibold">Add New Task</span>
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRefresh={fetchTasks}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        task={editingTask}
        onClose={() => setEditModalOpen(false)}
        setEditingTask={setEditingTask}
        onUpdate={(updatedTask) => {
          setTasks(
            tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
          );
        }}
      />
    </section>
  );
}
