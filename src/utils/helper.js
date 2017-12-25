export const groupListByKey = (items, key='id') => {
    return items.reduce((grouped, item) => ({
        ...grouped,
        [item[key]]: item
    }), {});
};