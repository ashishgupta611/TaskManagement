//Implement home page for TaskManager application
'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/src/hooks';
import React from 'react';
import '../../globals.css';
import { InputChangeHandler } from '@/src/types';
import LabelWithInput from '@/src/components/label-with-input';
import { addTask } from '@/src/reducers/tasksSlice';
import { usePathname } from 'next/navigation';

export default function EditTask() {
  const pathname = usePathname();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  // if (!!pathname) {
  //       const bookId = pathname.split('/').filter(Boolean).pop();
  //       const book = books.filter((item) => item.id === bookId);
  // }

  const handleNameChange = (e: InputChangeHandler) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: InputChangeHandler) => {
    setDescription(e.target.value);
  };

  const handleAddClick = () => {
    console.log('Button click');
    dispatch(addTask({
      name: name,
      description: description,
      creationTime: Date.now()
    }));
  };

  return (
    <div className='flex-col justify-center border border-blue-300 rounded-lg bg-clear shadow-lg p-8 px-40 mt-5'>
      <div className="flex flex-col border rounded-lg border-blue-300 justify-center bg-clear shadow-lg py-5 px-5">
        <label className="block text-center text-2xl text-white font-bold">Edit Task</label>
        <LabelWithInput label='Name' placeholder="Enter task name" type='text' value={name} onChange={handleNameChange} />
        <LabelWithInput label='Description' type='textarea' placeholder="Enter task description" value={description} onChange={handleDescriptionChange} />
      </div>
      <button className="bg-clear border border-green-300 mt-10 w-full font-bold text-green-300 px-4 py-2 rounded" onClick={handleAddClick}>UPDATE</button>
    </div>
  );
}
