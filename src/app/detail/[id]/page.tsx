//Implement home page for TaskManager application
'use client';

import '../../globals.css';

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/src/hooks';
import React from 'react';
import { TaskItem as Task } from '@/src/interfaces';
import { RootState } from '@/src/store';
import { usePathname, useRouter } from 'next/navigation';
import { formatTimestamp } from '@/src/utils';

export default function TaskDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const { tasks } = useAppSelector((state: RootState) => state.rootReducer.tasks);

  const [task, setTask] = useState<Task>({
    id: '',
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

  const renderKeyValue = (key: string, value: string) => {
    return (
      <div className=' mt-5'>
        <label className="block text-1xl font-semibold text-white mb-3">
          {key}
        </label>
        <label id={key}
          className={`block px-3 py-2 border text-1xl rounded-md text-white border-white bg-gray-600`}
        >
          {value}
        </label>
      </div>
    );
  };

  return (
    <div className="max-w-5xl min-w-3xl mx-auto p-6 mt-4 justify-center border border-gray-600 rounded-lg bg-gradient-to-r from-blue-300/60 via-pink-200/20 via-red-300 to-blue-300/60 shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-6 text-white">DETAILS</h1>
      {renderKeyValue('Title', task.title)}
      {renderKeyValue('Description', task.description)}
      {renderKeyValue('Priority', task.priority)}
      {renderKeyValue('Status', task.status)}
      {renderKeyValue('Start Time', `${formatTimestamp(task.creationDate)}`)}
      {renderKeyValue('End Time', `${formatTimestamp(task.endDate)}`)}
      {renderKeyValue('Assigned To', task.assignedTo)}

      <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 border text-white rounded-md text-gray-700 hover:bg-gray-50 font-semibold hover:text-gray-800"
          >
            BACK
          </button>
          <button onClick={() => router.push(`/edit/${task.id}`)}
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 font-semibold"
          >
            EDIT
          </button>
        </div>
    </div>
  );
}
