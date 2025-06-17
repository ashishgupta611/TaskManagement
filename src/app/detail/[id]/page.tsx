//Implement home page for TaskManager application
'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/src/hooks';
import React from 'react';
import '../../globals.css';
import LabelWithInput from '@/src/components/label-with-input';
import { TaskItem } from '@/src/interfaces';
import { RootState } from '@/src/store';
import { usePathname, useRouter } from 'next/navigation';

export default function TaskDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const [task, setTask] = useState<TaskItem>();
  const { tasks } = useAppSelector((state: RootState) => state.rootReducer.tasks);

  useEffect(() => {
    if (!!pathname && tasks) {
      const taskID = pathname.split('/').filter(Boolean).pop();
      const taskItem = tasks.find((item) => item.id === taskID);

      if (taskItem) {
        setTask(taskItem);
      }
    }
  }, [tasks]);

  const handleBack = async () => {
    router.push('/');
  };


  return (
    <div className='flex-col justify-center border border-blue-300 rounded-lg bg-clear shadow-lg p-8 px-40 mt-5'>
      <div className="flex flex-col border rounded-lg border-blue-300 justify-center bg-clear shadow-lg py-5 px-5">
        <label className="block text-center text-2xl text-white font-bold">DETAILS</label>
        <LabelWithInput label='Name' placeholder="Enter task name" type='text' value={task?.name || ''} readOnly={true} disabled={true} />
        <LabelWithInput label='Description' type='textarea' placeholder="Enter task description" value={task?.description || ''} readOnly={true} disabled={true} />
      </div>
      <button className="bg-clear border border-green-300 mt-10 w-full font-bold text-green-300 px-4 py-2 rounded" onClick={handleBack}>BACK</button>
    </div>
  );
}
