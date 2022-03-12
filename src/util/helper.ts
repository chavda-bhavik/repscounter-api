export const formatDateToString = (
    date: Date | string | number,
) => {
    // create date object and get date parameters
    date = new Date(date);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let d = ('0' + date.getDate()).slice(-2);

    // formatting date
    return `${year}-${month}-${d}`;
};

export const groupBy = <T>(array: T[], predicate: (v: T) => string) =>
    array.reduce((acc, value) => {
        (acc[predicate(value)] ||= []).push(value);
        return acc;
    }, {} as { [key: string]: T[] });