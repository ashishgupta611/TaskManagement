'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/src/store';
import { useAppSelector, useAppDispatch } from '@/src/hooks';
import '../../globals.css';
import { InputChangeHandler } from '@/src/types';
import LabelWithInput from '@/src/components/core/labelWithInput';
import { updateTaskItem } from '@/src/services/taskService';
import { usePathname } from 'next/navigation';
import { TaskItem } from '@/src/interfaces';

export default function EditTask() {
  const router = useRouter();
  const pathname = usePathname();
  const [task, setTask] = useState<TaskItem>();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state: RootState) => state.rootReducer.tasks);

  useEffect(() => {
    if (!!pathname) {
      const taskID = pathname.split('/').filter(Boolean).pop();
      const [taskItem] = tasks.filter((item) => item.id === taskID);

      if (taskItem) {
        setTask(taskItem);
      }
    }
  }, []);

  const handleNameChange = (e: InputChangeHandler) => {
    setTask(prevTask => {
      if (!prevTask) return prevTask;
      return { ...prevTask, name: e.target.value};
    });
  };

  const handleDescriptionChange = (e: InputChangeHandler) => {
    setTask(prevTask => {
      if (!prevTask) return prevTask;
      return { ...prevTask, description: e.target.value};
    });
  };

  const handleAddClick = async () => {
    console.log('Button click');
    if (task && task.title && task.description) {
      await updateTaskItem(task, dispatch);
      router.push('/');
    }
  };

  return (
    <div className='flex-col justify-center border border-blue-300 rounded-lg bg-clear shadow-lg p-8 px-40 mt-5'>
      <div className="flex flex-col border rounded-lg border-blue-300 justify-center bg-clear shadow-lg py-5 px-5">
        <label className="block text-center text-2xl text-white font-bold">Edit Task</label>
        <LabelWithInput label='Name' placeholder="Enter task name" type='text' value={task?.title || ''} onChange={handleNameChange} />
        <LabelWithInput label='Description' type='textarea' placeholder="Enter task description" value={task?.description || ''} onChange={handleDescriptionChange} />
      </div>
      <button className="bg-clear border border-green-300 mt-10 w-full font-bold text-green-300 px-4 py-2 rounded" onClick={handleAddClick}>UPDATE</button>
    </div>
  );
}
