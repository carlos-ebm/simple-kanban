import { updateTasks, addTask } from "../../utils";

export const handleDelete = async (tasks, setTasks, listId, index) => {
  const updatedTasks = [...tasks[listId]];
  updatedTasks.splice(index, 1);

  await updateTasks(listId, updatedTasks);

  setTasks((prevState) => ({
    ...prevState,
    [listId]: updatedTasks,
  }));
};

export const handleAddTask = async (tasks, setTasks, listId, newTask) => {
  try {
    await addTask(listId, newTask);
    const tasksCopy = { ...tasks };
    tasksCopy[listId] = [
      ...tasksCopy[listId],
      { title: newTask, status: listId },
    ];
    setTasks(tasksCopy);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const handleDragEnd = async (
  tasks,
  setTasks,
  result,
  docRef
) => {
  if (!result.destination) {
    return;
  }

  const sourceListId = result.source.droppableId;
  const destinationListId = result.destination.droppableId;

  const sourceTasks = [...tasks[sourceListId]];
  const destinationTasks = [...tasks[destinationListId]];

  const [movedTask] = sourceTasks.splice(result.source.index, 1);
  destinationTasks.splice(result.destination.index, 0, movedTask);

  setTasks((prevState) => ({
    ...prevState,
    [sourceListId]: sourceTasks,
    [destinationListId]: destinationTasks,
  }));

  await updateTasks(docRef, {
    [sourceListId]: sourceTasks,
    [destinationListId]: destinationTasks,
  });
};
