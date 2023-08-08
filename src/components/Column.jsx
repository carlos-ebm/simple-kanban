import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  InputLabel,
} from "@mui/material";
import { Task } from "../components";
import AddIcon from "@mui/icons-material/Add";
import "../assets/css/KanbanBoard.css"; // Importa tus estilos CSS
import DashboardIcon from "@mui/icons-material/Dashboard";

const Column = ({ title, listId, tasks, onDelete, onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(""); // Nuevo estado para el emoji

  const handleAddClick = () => {
    if (newTaskTitle.trim() !== "" && selectedEmoji !== "") {
      onAddTask(listId, newTaskTitle, selectedEmoji); // Pasa el emoji a la función
      setNewTaskTitle("");
      setSelectedEmoji(""); // Limpia el estado del emoji después de agregar la tarea
    }
  };

  return (
    <Droppable droppableId={listId}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          className="column"
          style={{
            padding: "16px",
            minHeight: "100px",
            backgroundColor:
              title === "Por Hacer"
                ? "#ffcccb"
                : title === "En Progreso"
                ? "#ffff99"
                : "#90ee90",
          }}
        >
          {/* Título de la columna */}
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <DashboardIcon sx={{ marginRight: "8px" }} />
            {title}
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          {/* Mapea y renderiza las tareas */}
          {tasks.map((task, index) => (
            <Draggable
              key={`${listId}-${index}`}
              draggableId={`${listId}-${index}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {/* Renderiza el componente Task */}
                  <Task task={task} onDelete={() => onDelete(listId, index)} />
                </div>
              )}
            </Draggable>
          ))}
          <Divider style={{ margin: "10px 0" }} />
          {/* Campo para agregar nueva tarea */}
          <div className="add-task">
            <div className="add-task-input">
              <InputLabel htmlFor="emoji-select">
                ¿Qué tienes en mente?
              </InputLabel>
              <TextField
                id="outlined-multiline-static"
                label="Nueva tarea"
                multiline
                fullWidth
                rows={1}
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddClick();
                  }
                }}
              />
            </div>
            <div className="add-task-options">
              <div className="add-task-emoji">
                <InputLabel htmlFor="emoji-select">Reacción:</InputLabel>
                <select
                  className="emoji-select"
                  value={selectedEmoji}
                  onChange={(e) => setSelectedEmoji(e.target.value)}
                >
                  <option value="">Seleccionar Emoji</option>
                  {/* Opciones de emoji relacionadas con tableros kanban */}
                  <option value="📋">📋 - Tablero</option>
                  <option value="🗂️">🗂️ - Carpeta</option>
                  <option value="📅">📅 - Calendario</option>
                  <option value="📊">📊 - Gráficos</option>
                  <option value="🔍">🔍 - Investigar</option>
                  <option value="📝">📝 - Notas</option>
                  <option value="💡">💡 - Ideas</option>
                  <option value="🛠️">🛠️ - Herramientas</option>
                  <option value="📄">📄 - Documento</option>
                  <option value="💼">💼 - Trabajo</option>
                  <option value="📔">📔 - Cuaderno</option>
                  <option value="📂">📂 - Archivos</option>
                  <option value="✅">✅ - Completado</option>
                  <option value="🚀">🚀 - En progreso</option>
                  <option value="🔜">🔜 - Próximo</option>
                  <option value="❗">❗ - Importante</option>
                  {/* Otras opciones de emoji */}
                </select>
                <div
                  className="add-task-button"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {/* Botón para agregar tarea */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleAddClick}
                    startIcon={<AddIcon />}
                  >
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );
};

export default Column;
