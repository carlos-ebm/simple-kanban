// firebaseUtils.js

import { db } from "./firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

// Colección de tareas en la base de datos
const tasksCollection = collection(db, "tasks");

/**
 * Recupera las tareas organizadas por estado desde la base de datos.
 * @returns Un objeto con las tareas organizadas por estado.
 */
export const fetchTasks = async () => {
  try {
    const queries = [
      query(tasksCollection, where("status", "==", "todo")),
      query(tasksCollection, where("status", "==", "inProgress")),
      query(tasksCollection, where("status", "==", "done")),
    ];

    const [todoSnapshot, inProgressSnapshot, doneSnapshot] = await Promise.all(
      queries.map(getDocs)
    );

    const todoTasks = todoSnapshot.docs.flatMap((doc) => doc.data().tasks);
    const inProgressTasks = inProgressSnapshot.docs.flatMap(
      (doc) => doc.data().tasks
    );
    const doneTasks = doneSnapshot.docs.flatMap((doc) => doc.data().tasks);

    return {
      todo: todoTasks,
      inProgress: inProgressTasks,
      done: doneTasks,
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

/**
 * Actualiza las tareas de una lista en la base de datos.
 * @param {string} listId - El identificador de la lista de tareas.
 * @param {array} updatedTasks - Las tareas actualizadas.
 */
export const updateTasks = async (listId, updatedTasks) => {
  try {
    const docRef = doc(db, "tasks", listId);
    await updateDoc(docRef, { tasks: updatedTasks });
  } catch (error) {
    console.error("Error updating tasks:", error);
    throw error;
  }
};

export const addTask = async (listId, newTask, emoji) => {
  try {
    const listDocRef = doc(db, "tasks", listId);
    const listDocSnapshot = await getDoc(listDocRef);

    if (listDocSnapshot.exists()) {
      const listData = listDocSnapshot.data();
      const updatedTasks = [
        ...listData.tasks,
        { title: newTask, status: listId, emoji: emoji }, // Agrega el emoji aquí
      ];

      await updateDoc(listDocRef, { tasks: updatedTasks });
    }
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};