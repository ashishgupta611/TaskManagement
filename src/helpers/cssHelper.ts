import { BorderButtonType } from "../types";

export const getCSSAndText = (type?: BorderButtonType): {css: string, text: string } => {
    switch (type) {
        case 'edit':
            return {
                css: 'text-sm font-semibold bg-clear shadow-md border border-orange-200 group-hover:border-orange-400 text-orange-200 group-hover:text-orange-400 py-2 px-5 rounded hover:bg-gray-400',
                text: 'EDIT'
            };
        case 'delete':
            return {
                css: 'text-sm bg-clear font-semibold shadow-md border border-red-200 text-red-200 group-hover:border-red-500 group-hover:text-red-400 py-2 px-5 rounded hover:bg-gray-400',
                text: 'DELETE'
            };
        default:
            return {
                css: 'px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors duration-150',
                text: ''
            };
    }
};

