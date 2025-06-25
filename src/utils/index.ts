export * from './confirm';
export * from './formatter';


export const hasValidDate = (date?: number): boolean => {
    if (date && date !== -1) {
        return true;
    }
    return false;
};