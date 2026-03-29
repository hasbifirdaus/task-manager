import axios from "axios";

interface IEditTaskModalProps {
  isOpen: boolean;
  task: any;
  onClose: () => void;
  onUpdate: (updatedTask: any) => void;
  setEditingTask: (task: any) => void;
}

export default function EditTaskModal({
  isOpen,
  task,
  onClose,
  onUpdate,
  setEditingTask,
}: IEditTaskModalProps) {
  if (!isOpen || !task) return null;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (res.status === 200) {
        onUpdate(res.data);
        onClose();
      }
    } catch (error) {
      console.error("Error updating task", error);
      alert("Error updating task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          className="w-full border p-2 mb-3 rounded-lg"
          value={task.title}
          onChange={(e) => setEditingTask({ ...task, title: e.target.value })}
          required
        />
        <textarea
          className="w-full border p-2 mb-4 rounded-lg"
          value={task.description}
          onChange={(e) =>
            setEditingTask({ ...task, description: e.target.value })
          }
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-[#4C3575] text-white px-4 py-2 rounded-lg flex-1"
          >
            Update Task
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
