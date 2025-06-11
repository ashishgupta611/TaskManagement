//Implement home page for TaskManager application
'use client';

import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import Image from 'next/image';
import bgImage from '../resources/images/bg_home.png';
import React from 'react';
import './globals.css';
import { InputChangeHandler } from '../types';
import LabelWithInput from '../components/LabelWithInput';
import { addTask } from '../reducers/tasksSlice';

export default function Home() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();


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
    <main className="flex justify-center bg-gray-600">
      <Image
        src={bgImage}
        alt="Task Manager"
        className="blur-xl"
      />
      <div className='flex absolute flex-col'>
        <div className="flex-col justify-center border border-red-300 rounded-lg bg-clear shadow-lg p-8 px-40 mt-5">
          <h1 className="text-4xl font-bold mb-2 text-red-300">Welcome to TaskManager</h1>
          <p className="text-lg text-center text-blue-300 justify-center">Your personal task management application.</p>
        </div>
        <div className='flex-col justify-center border border-blue-300 rounded-lg bg-clear shadow-lg p-8 px-40 mt-5'>
          <div className="flex flex-col border rounded-lg border-blue-300 justify-center bg-clear shadow-lg py-5 px-5">
          <label className="block text-center text-2xl text-white font-bold">Create New Task</label>
          <LabelWithInput label='Name' placeholder="Enter task name" type='text' value={name} onChange={handleNameChange} />
          <LabelWithInput label='Description' type='textarea' placeholder="Enter task description" value={description} onChange={handleDescriptionChange} />
        </div>
        <button className="bg-clear border border-green-300 mt-10 w-full font-bold text-green-300 px-4 py-2 rounded" onClick={handleAddClick}>ADD</button>
        </div>
      </div>
    </main>
  );
}
