import { taskList } from "../mock";

export const getTasks = () => new Promise((resolve) => {
    setTimeout(() => {
        return resolve(taskList);
    })
});

// const res = (p) => (p);

// const a = new Promise((resolve) => {
//     setTimeout(() => {
//         return resolve({a: 111});
//     }, 300);
// });

// const test = a.then((eee) => eee);