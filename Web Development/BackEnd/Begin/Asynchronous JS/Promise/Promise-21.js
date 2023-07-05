// *! Create a function that takes an array of asynchronous tasks (functions that return promises) and 
// *! executes them concurrently with a maximum concurrency. Concurrently means at the same time 

async function concurrentExecution(tasks, limit) {
    const results = [];
    const executing = [];
    for (const task of tasks) {
      const p = task().then((res) => {
        results.push(res);
        console.log(p)
        executing.splice(executing.indexOf(p), 1);
      });
      executing.push(p);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
    await Promise.all(executing);
    return results;
}  
// Define asynchronous tasks
const task1 = () => new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
const task2 = () => new Promise((resolve) => setTimeout(() => resolve('Task 2'), 2000));
const task3 = () => new Promise((resolve) => setTimeout(() => resolve('Task 3'), 3000));
const tasks = [task1, task2, task3];
concurrentExecution(tasks, 2).then((results) => console.log(results));