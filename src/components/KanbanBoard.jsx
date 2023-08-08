import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchTasks, updateTasks, addTask } from "../utils/firebaseUtils";
import Column from "./Column";
import "../assets/css/KanbanBoard.css";

const KanbanBoard = () => {
  // Estado para almacenar las tareas en las diferentes columnas
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  // Efecto para cargar las tareas desde la base de datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  // Maneja el clic en el botón de eliminar tarea
  const handleDelete = async (listId, index) => {
    const updatedTasks = [...tasks[listId]];
    updatedTasks.splice(index, 1);
    await updateTasks(listId, updatedTasks);
    setTasks((prevState) => ({
      ...prevState,
      [listId]: updatedTasks,
    }));
  };

  // Maneja el añadir una nueva tarea
  const handleAddTask = async (listId, newTask, emoji) => {
    try {
      await addTask(listId, newTask, emoji);
      const tasksCopy = { ...tasks };
      tasksCopy[listId] = [
        ...tasksCopy[listId],
        { title: newTask, status: listId, emoji: emoji },
      ];
      setTasks(tasksCopy);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;

    const sourceTasks = [...tasks[sourceListId]];
    const destinationTasks = [...tasks[destinationListId]];

    if (sourceListId === destinationListId) {
      // Movimiento dentro de la misma columna
      const [movedTask] = sourceTasks.splice(result.source.index, 1);
      sourceTasks.splice(result.destination.index, 0, movedTask);

      setTasks((prevState) => ({
        ...prevState,
        [sourceListId]: sourceTasks,
      }));

      await updateTasks(sourceListId, sourceTasks);
    } else {
      // Movimiento entre columnas diferentes
      const [movedTask] = sourceTasks.splice(result.source.index, 1);
      destinationTasks.splice(result.destination.index, 0, movedTask);

      setTasks((prevState) => ({
        ...prevState,
        [sourceListId]: sourceTasks,
        [destinationListId]: destinationTasks,
      }));

      await updateTasks(sourceListId, sourceTasks);
      await updateTasks(destinationListId, destinationTasks);
    }
  };


  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {/* Columna "Por Hacer" */}
        <Column
          title="Por Hacer"
          listId="todo"
          tasks={tasks.todo}
          onDelete={handleDelete}
          onAddTask={handleAddTask} // Asegúrate de pasar el emoji aquí
        />
        {/* Columna "En Progreso" */}
        <Column
          title="En Progreso"
          listId="inProgress"
          tasks={tasks.inProgress}
          onDelete={handleDelete}
          onAddTask={handleAddTask} // Asegúrate de pasar el emoji aquí
        />
        {/* Columna "Hecho" */}
        <Column
          title="Hecho"
          listId="done"
          tasks={tasks.done}
          onDelete={handleDelete}
          onAddTask={handleAddTask} // Asegúrate de pasar el emoji aquí
        />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;

