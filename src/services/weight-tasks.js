
export const getWeightFactor = (task) => {    
    const labelNames = task.labels.map(label => label.name);    
    if (labelNames.includes('XL')) return 3;    
    if (labelNames.includes('L')) return 2;    
    return 1;
};

export const removeWeightFactor = (task) => {
    const weightFactors = ['L', 'XL'];
    return task.labels.filter(label => !weightFactors.includes(label.name));    
};

export const weightTask = (task) => {
    const weightFactor = getWeightFactor(task);
    const categoryLabelsOnly = removeWeightFactor(task);
    task.labels = [].concat(...Array(weightFactor).fill(categoryLabelsOnly));
    return task;
};

export const weightTasks = (tasks) => {
    return tasks.map(weightTask);
};