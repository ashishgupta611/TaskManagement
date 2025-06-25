// app/add-task/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { RootState } from '@/src/store';
import { usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/src/hooks';
import { useRouter } from 'next/navigation';
import validate from 'validate.js';
import { TaskItem as Task } from '../interfaces';
import { updateTaskItem } from '@/src/services/taskService';
import { createTaskFromConstraints as  constraints} from '../constraints';
import { hasValidDate } from '../utils';

const EditTaskForm = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state: RootState) => state.rootReducer.tasks);
  const router = useRouter();
  const pathname = usePathname();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [task, setTask] = useState<Task>({
    id:'',
    title: '',
    description: '',
    priority: 'Medium',
    assignedTo: 'Unassigned',
    creationDate: -1,
    endDate: -1,
    // startDate: -1,
    status: 'Open',
  });

  useEffect(() => {
      if (!!pathname) {
        const taskID = pathname.split('/').filter(Boolean).pop();
        const [taskItem] = tasks.filter((item) => item.id === taskID);
  
        if (taskItem) {
          setTask(taskItem);
        }
      }
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(task, constraints);
    setErrors(validationErrors || {});

    if (!validationErrors) {
      setIsSubmitting(true);

      if (task.status === 'Done') {
        if (!hasValidDate(task.endDate)) {
          task.endDate = Date.now();
        }
      }
      else {
        task.endDate = -1;
      }

      await updateTaskItem(task, dispatch);
      router.push('/');
    }
  };

  return (
    <div className="max-w-5xl min-w-3xl mx-auto p-6 mt-4 justify-center border border-gray-600 rounded-lg bg-gradient-to-r from-blue-300/60 via-pink-200/20 via-red-300 to-blue-300/60 shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-6 text-white">Edit Task</h1>
      
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-white mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors?.title ? 'border-red-500' : 'text-white'}`}
            placeholder="Task title"
          />
          {errors?.title && (
            <p className="mt-1 text-sm font-semibold text-red-600">{errors.title[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-white mb-1">
            Description *
          </label>
          <textarea

          
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md text-white ${errors?.description ? 'border-red-500' : 'border-white'}`}
            placeholder="Task description"
          />
          {errors?.description && (
            <p className="mt-1 text-sm font-semibold text-red-600">{errors.description[0]}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-white mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-white rounded-md"
          >
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Under-review">Under-review</option>
            <option value="Done">Done</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-semibold text-white mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-white rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="assignedTo" className="block text-sm font-semibold text-white mb-1">
            Assign To (Email) *
          </label>
          <input
            id="assignedTo"
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors?.assignedTo ? 'border-red-500' : 'text-white'}`}
            placeholder="user@example.com"
          />
          {errors?.assignedTo && (
            <p className="mt-1 text-sm font-semibold text-red-600">{errors.assignedTo[0]}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 border text-white rounded-md text-gray-700 hover:bg-gray-50 font-semibold hover:text-gray-800"
            disabled={isSubmitting}
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'UPDATE'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;