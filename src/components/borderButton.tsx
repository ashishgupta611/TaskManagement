import React, { MouseEventHandler } from "react";
import { BorderButtonType } from "../types";
import { getCSSAndText } from "../helpers";

interface BorderButtonProps<T extends HTMLElement = HTMLButtonElement> {
    title?: string;
    className?: string | undefined;
    type?: BorderButtonType;
    onClick?: MouseEventHandler<T>;
}

export const BorderButton = ({ title, className, type = 'edit', onClick }: BorderButtonProps) => {
    const { css, text } = getCSSAndText(type);
    return (
        <button onClick={onClick}
            className={className || css}>
            {title || text}
        </button>
    );
};

