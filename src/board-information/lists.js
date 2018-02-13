export const listNames = {
  BACKLOG_OTHER: "Backlog > Other",
  BACKLOG_TESTING: "Backlog > Testing",
  BACKLOG_SOFTWARE_DESIGN: "Backlog > Software Design",
  BACKLOG_COMMUNICATION: "Backlog > Communication",
  BACKLOG_AGILE_METHODS: "Backlog > Agile Methods",
  BACKLOG_LEARNING: "Backlog > Learning",
  BACKLOG_TOOLS: "Backlog > Tools",
  PLANNED_FOR_THIS_WEEK: "Planned for this Week",
  IN_PROGRESS: "In Progress",
  DONE_WEEKLY: "Done Weekly",
  DONE_OVERALL: "Done Overall",
  BLOCKED: "Blocked"
}

// Consider adding local cache here
export const getListId = ({lists}, name) => {
  const list = lists.find(list => list.name === name);
  return list && list.id;
}