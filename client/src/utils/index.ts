// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkIfIncluded = (list: any[], object: { [key: string]: number | string }): boolean => {
    if (!list.length) {
        return false;
    }

    const key = Object.keys(object)[0];

    return Boolean(list.find((element) => element[key] === object[key]));
};
