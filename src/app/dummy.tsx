// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../store';
// import { fetchTasks, addTask, updateTask, deleteTask } from '../features/tasks/tasksSlice';
// import { Task } from '../types/task';
// import Head from 'next/head';
// import TaskForm from '../components/TaskForm';
// import TaskList from '../components/TaskList';
// import TaskFilter from '../components/TaskFilter';
// import StatsPanel from '../components/StatsPanel';
// import { AppDispatch } from '../store';

// export default function Home() {
//   const dispatch = useDispatch<AppDispatch>();
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);
//   const status = useSelector((state: RootState) => state.tasks.status);
//   const error = useSelector((state: RootState) => state.tasks.error);

//   const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
//   const [editingTask, setEditingTask] = useState<Task | null>(null);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchTasks());
//     }
//   }, [status, dispatch]);

//   const handleAddTask = (task: Omit<Task, 'id'>) => {
//     dispatch(addTask(task));
//   };

//   const handleUpdateTask = (task: Task) => {
//     dispatch(updateTask(task));
//     setEditingTask(null);
//   };

//   const handleDeleteTask = (id: string) => {
//     dispatch(deleteTask(id));
//   };

//   const handleEditTask = (task: Task) => {
//     setEditingTask(task);
//   };

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'completed') return task.completed;
//     if (filter === 'active') return !task.completed;
//     return true;
//   });

//   if (status === 'loading') {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="text-red-500 text-center p-4">Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Task Manager</title>
//         <meta name="description" content="Manage your tasks efficiently" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="container mx-auto py-8 px-4">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Task Manager</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
//               <TaskForm 
//                 onSubmit={editingTask ? handleUpdateTask : handleAddTask}
//                 initialTask={editingTask}
//                 onCancel={() => setEditingTask(null)}
//               />
//             </div>

//             <div className="bg-white rounded-lg shadow p-6 mt-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Your Tasks</h2>
//                 <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
//               </div>
//               <TaskList 
//                 tasks={filteredTasks} 
//                 onEdit={handleEditTask}
//                 onDelete={handleDeleteTask}
//               />
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <StatsPanel tasks={tasks} />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }