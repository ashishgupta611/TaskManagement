//Implement home page for TaskManager application
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './globals.css';
import { useAPI, useNetworkAPI } from '../hooks';
import { TaskItem } from '../interfaces';
import { API } from '../constants';
import Main from '../components/main-item';
import ListItems from '../components/list-items';
import SearchComponent from '../components/search-component';
import { removeTask } from '../reducers/tasksSlice';
import { useAppDispatch } from '../hooks';
//import { useFilteredTask } from '../hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const url = `${API.URL.BASE}${API.PATH.ADD_TASK}`;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);

  // const filteredTasks = useFilteredTask();

  //const { data, loading, error } = useAPI<TaskItem[]>({ url, initialData: [] });
  const { data, loading, error } = useNetworkAPI<TaskItem[]>({ url});
  
  useEffect(()=> {
    handleSearch();
  }, [data, searchQuery]);

  const handleSearch = () => {
    console.log("Search tapped for:", searchQuery);
    const filtered = data?.filter((item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())));
    if (filtered) setFilteredTasks(filtered);
  };

  const deleteTask = (task: TaskItem) => {
    dispatch(removeTask(task.id));
  };

  const renderItem = ({ item }: { item: TaskItem }) => (
    <div className="bg-cyan-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg backdrop-blur-md bg-white/30">
      <div className="p-4 pt-2">
        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
        <p className="text-white mb-5 mt-1">{item.description}</p>
        <Link href={`/detail/${item.id}`} className='bg-clear font-semibold shadow-md border border-blue-300 text-blue-300 py-2 px-4 rounded hover:bg-gray-400'>DETAILS</Link>
        <Link href={`/edit/${item.id}`} className='ml-5 font-semibold bg-clear shadow-md border border-orange-200 text-orange-200 py-2 px-5 rounded hover:bg-gray-400'>EDIT</Link>
        <button className='ml-5 bg-clear font-semibold shadow-md border border-red-300 text-red-300 py-2 px-5 rounded hover:bg-gray-400' onClick={() => {deleteTask(item)}}>DELETE</button>
      </div>
    </div>
  );

  return (
    <Main href='/create' hrefName='CREATE NEW'>
      <div className='p-4 border border-gray-200 rounded-lg shadow-sm mt-5 h-[600px]'>
       <div className='flex'>
         <p className="text-white text-center text-1.5xl font-semibold mt-1 ml-3">Showing {filteredTasks.length} tasks.</p>
        <SearchComponent searchQuery={searchQuery} onTextChange={setSearchQuery} onSearch={handleSearch} />
       </div>
        {loading &&
          <label className="block text-center text-2xl text-white font-bold">Loading ...</label>
        }
        {error as (string | null) &&
          <label className="block text-center text-2xl text-white font-bold">Something went wrong. Please refresh the page.</label>
        }
        {/* {(!loading && filteredTasks.length === 0) &&
          <label className="block text-center text-2xl text-white font-bold">No task details found.</label>
        } */}
        {!loading && <ListItems
          data={filteredTasks}
          containerHeight='h-[500px]'
          renderItem={renderItem}
          numColumns={2}
          onEndReached={() => console.log('Load more products...')}
          className="mt-6"
        />}
      </div>
    </Main>
  );
}
