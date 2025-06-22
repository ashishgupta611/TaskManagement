import React from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteTaskItem } from '../../services/taskService';
import { TaskItem, TaskCardProps } from '../../interfaces';
import { statusColors, priorityColors } from '../../helpers';
import { formatDate, confirm } from '../../utils';
import { useRouter } from 'next/navigation';
import { BorderButton } from '../core/borderButton';

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDeleteSuccess, onView }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const css = 'text-white group-hover:text-gray-600';

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        confirm(dispatch, {
            title: 'Delete Task',
            message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
            confirmText: 'Delete',
            onConfirm: async () => {
                await deleteTask(task);
            },
        });
    };

    const deleteTask = async (task: TaskItem) => {
        if (await deleteTaskItem(task.id, dispatch)) {
            //console.error('Task deleted successfully.');
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEdit) onEdit(task.id);
        router.push(`/edit/${task.id}`);
    };

    const handleCardClick = () => {
        if (onView) onView(task.id);

        router.push(`/detail/${task.id}`);
    };
    return (
        <div onClick={handleCardClick}
            className="flex flex-col p-3 rounded-lg shadow-md bg-white/50 border-1 border-gray-50 mb-4 hover:bg-gray-50 group">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className={`font-semibold text-lg ${css} truncate`}>{task.title}</h2>
                    <p className={`${css} text-sm line-clamp-2 mt-1`}>
                        {task.description}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <BorderButton type='edit' onClick={handleEdit} />
                    <BorderButton type='delete' onClick={handleDelete} />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4 text-sm text-gray-700 mt-4">
                <div className={`${css} col-span-2`}>
                    <span className={`font-bold ${css}`}>Assigned to:</span><br />
                    {task.assignedTo}
                </div>
                <div className={`${css}`}>
                    <span className={`font-bold ${css}`}>Start date:</span><br />
                    {formatDate(task.startDate)}
                </div>
                <div className={`${css}`}>
                    <span className={`font-bold ${css}`}>End date:</span><br />
                    {formatDate(task.endDate)}
                </div>
                <div>
                    <span className={`font-semibold text-white group-hover:text-gray-600`}>Status:</span><br />
                    <span className={`font-bold ${statusColors[task.status]} py-1 px-2 bg-gray-200 rounded-lg`}>{task.status.toUpperCase()}</span>
                </div>
                <div>
                    <span className={`font-semibold text-white group-hover:text-gray-600`}>Priority:</span><br />
                    <span className={`font-bold ${priorityColors[task.priority]} py-1 px-2 bg-gray-200 rounded-lg`}>{task.priority.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
   };

export default TaskCard;