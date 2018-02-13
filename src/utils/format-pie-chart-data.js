const extractLabels = (tasks) => {
  const uniqueLabels = {};
  tasks.forEach(({labels}) => {
    labels.forEach(label => {
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

  Object.values(labels).forEach(({name, count, color}) => {
    formatted.labels.push(name);
    formatted.datasets[0].data.push(count);
    formatted.datasets[0].backgroundColor.push(color);
  });
  return formatted;
}