const extractLabels = (tasks) => {
  const uniqueLabels = {};
  tasks.forEach(task => {
    task.labels.forEach(label => {
      const { name, id } = label;
      let { color } = label;
      if (!uniqueLabels[id]) {
        if (color === 'sky') {
          color = 'skyblue';
        }
        uniqueLabels[id] = {
          name,
          color,
          id,
          count: 1
        }
      } else {
        uniqueLabels[id].count++;
      }
    })
  })

  return uniqueLabels;
}

export const formatPieChartData = (completedTasks) => {
  const labels = extractLabels(completedTasks);
  const formatted = {
    labels: [],
    datasets:[{
      data: [],
      backgroundColor: []
    }]
  };

  Object.values(labels).forEach(label => {
    formatted.labels.push(label.name);
    formatted.datasets[0].data.push(label.count);
    formatted.datasets[0].backgroundColor.push(label.color);
  });

  console.log(formatted)
  return formatted;
}