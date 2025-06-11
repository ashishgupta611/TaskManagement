'use client';

import { InputChangeHandler } from "../types";

interface LabelWithInputProps {
    label: string;
    placeholder: string;
    value: string;
    type?: 'text' | 'textarea';
    onChange?: (e: InputChangeHandler) => void;
}

const LabelWithInput = (props: LabelWithInputProps) => {
    const { label, type, ...restProps } = props;

    return (
        <>
            <label className="mt-7 block text-white mb-2 font-bold">{label}</label>
            {type === 'textarea' && <textarea className="border-blue-300 text-white px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                rows={8}
                cols={50}
                {...restProps}
            />
            }
            {type === 'text' && <input className="border-blue-300 text-white px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                type="text"
                {...restProps}
            />}
        </>
    );
};

export default LabelWithInput;