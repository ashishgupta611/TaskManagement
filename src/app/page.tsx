'use client';

import './globals.css';

import React, { lazy, Suspense, useState, useEffect } from 'react';
import { useAppSelector, useNetworkAPI, useAppDispatch } from '../hooks';
import { TaskItem } from '../interfaces';
import { API, API_ENDPOINTS } from '../constants/endpoints';
import Main from '../components/mainItem';
import ListItems from '../components/listItems';
import SearchComponent from '../components/searchComponent';
import { loadTasks } from '../reducers/tasksSlice';
import { RootState } from '../store';
import { SortOption, SortDirection } from '../types';
import { filterAndSortTasks } from '../utils';

const TaskCard = lazy(() => import('../components/taskCard'));

export default function Home() {
  const url = `${API.URL.BASE}${API_ENDPOINTS.TASK.ADD}`;

  const { tasks } = useAppSelector((state: RootState) => state.rootReducer.tasks);
  const dispatch = useAppDispatch();
  const [sortOption, setSortOption] = useState<SortOption>('title');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
  const { data, loading, error } = useNetworkAPI<TaskItem[]>({ url });

  useEffect(() => {
    loadItems(data);
    handleSearch();
  }, [data]);

  useEffect(() => {
    handleSearch();
  }, [tasks, searchQuery, sortOption, sortDirection]);

  const loadItems = (items: TaskItem[] | null) => {
    if (items && Array.isArray(items) && items.length > 0) {
      dispatch(loadTasks(items));
    }
  };

  const handleSearch = () => {
    //const filtered = tasks.filter((item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())));
    const filtered = filterAndSortTasks(tasks, {sortBy: sortOption, direction: sortDirection, searchText: searchQuery});
    if (filtered) setFilteredTasks(filtered);
  };

  return (
    <Main href='/create' hrefName='CREATE NEW'>
      <div className='p-4 border border-gray-200 rounded-lg shadow-sm mt-5 h-[600px]'>
        <div className='flex'>
          <p className="text-white text-center text-1.5xl font-semibold mt-1 ml-3">Showing {filteredTasks.length} tasks.</p>
          <div className='ml-4'>
            <label className="text-1xl text-center justify-center font-bold text-white mr-2">
              Sort By:
            </label>
            <select
              id="sortOption"
              name="sortOption"
              value={sortOption}
              onChange={(value) => {
                setSortOption(value.target.value as SortOption)
              }}
              className="border text-white rounded-md py-2"
            >
              <option value="title">Title</option>
              <option value="description">Description</option>
              <option value="assignedTo">Assigned To</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="creationDate">Start Date</option>
              <option value="endDate">End Date</option>
            </select>
            <select
              id="sortDirection"
              name="sortDirection"
              value={sortDirection}
              onChange={(value) => {
                setSortDirection(value.target.value as SortDirection)
              }}
              className="ml-2 border text-white rounded-md py-2"
            >
              <option value="asc">△</option>
              <option value="desc">▽</option>
            </select>
          </div>
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
