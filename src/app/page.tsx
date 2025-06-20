//Implement home page for TaskManager application
'use client';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import './globals.css';
import { useAPI, useAppSelector, useNetworkAPI, useAppDispatch } from '../hooks';
import { TaskItem } from '../interfaces';
import { API, API_ENDPOINTS } from '../constants/endpoints';
import Main from '../components/mainItem';
import ListItems from '../components/listItems';
import SearchComponent from '../components/searchComponent';
import { loadTasks } from '../reducers/tasksSlice';
import { RootState } from '../store';

const TaskCard = lazy(() => import('../components/taskCard'));

export default function Home() {
  const { tasks } = useAppSelector((state: RootState) => state.rootReducer.tasks);

  const dispatch = useAppDispatch();
  const url = `${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}`;
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const { data, loading, error } = useNetworkAPI<TaskItem[]>({ url });

  useEffect(() => {
    loadItems(data);
    handleSearch();
  }, [data]);

  useEffect(() => {
    handleSearch();
  }, [tasks, searchQuery]);

  const loadItems = (items: TaskItem[] | null) => {
    if (items && Array.isArray(items) && items.length > 0) {
      dispatch(loadTasks(items));
    }
  };

  // const filteredTasks = useFilteredTask();
  //const { data, loading, error } = useAPI<TaskItem[]>({ url, initialData: [] });

  const handleSearch = () => {
    const filtered = tasks.filter((item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())));
    if (filtered) setFilteredTasks(filtered);
  };

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
        <Suspense fallback={<label className="block text-center text-2xl text-white font-bold">Loading ...</label>}>
          {
            !loading ? <ListItems
              data={filteredTasks}
              containerHeight='h-[512px]'
              renderItem={({ item }: { item: TaskItem }) => <TaskCard task={item} />}
              numColumns={1}
              onEndReached={() => console.log('Load more products...')}
              className="mt-5"
            /> : ''
          }
        </Suspense>
      </div>
    </Main>
  );
}
