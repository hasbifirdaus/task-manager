import axios from "axios";
import { useState } from "react";

interface IAddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onRefresh,
}: IAddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/tasks", formData);

      if (res.status === 201) {
        onRefresh();
        onClose();
        setFormData({ title: "", description: "", completed: false });
      }
    } catch (error) {
      console.error("Error adding task", error);
      alert("Failed to add task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">New Task</h2>
        <input
          className="w-full border p-2 mb-3 rounded-lg"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2 mb-4 rounded-lg"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#4C3575] text-white px-4 py-2 rounded-lg flex-1"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 px-4 py-2 rounded-lg flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
