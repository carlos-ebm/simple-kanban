import React, { useState } from "react";
import { Paper, Typography, Button, Grid, TextField } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";

const Task = ({ task, onDelete }) => {
  // Estado para controlar si la tarea está en modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estados para almacenar los cambios en el título y emoji editados
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedEmoji, setEditedEmoji] = useState(task.emoji);

  // Maneja el clic en el botón de editar
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Maneja el clic en el botón de guardar (editar tarea)
  const handleSaveClick = () => {
    // Aquí puedes manejar la lógica para guardar la tarea editada en la base de datos

    // Finaliza el modo de edición
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "16px",
        marginBottom: "8px",
        background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          {isEditing ? (
            // Modo de edición: campos de entrada para título y emoji
            <>
              <TextField
                variant="standard"
                size="small"
                value={editedEmoji}
                onChange={(e) => setEditedEmoji(e.target.value)}
              />
              <TextField
                variant="standard"
                size="small"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSaveClick}
              >
                <CheckIcon />
              </Button>
            </>
          ) : (
            // Modo de visualización: muestra el emoji y título de la tarea
            <>
              <span style={{ marginRight: "8px" }}>{task.emoji}</span>
              <Typography variant="body1">{task.title}</Typography>
            </>
          )}
        </Grid>
        <Grid item>
          {isEditing ? (
            // Botón de guardar en modo de edición
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              <CheckIcon />
            </Button>
          ) : (
            // Botones de edición y eliminación en modo de visualización
            <>
              {/* Comentario: Agregar funcionalidad de edición */}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEditClick}
                style={{ marginRight: "8px" }} // Agrega margen derecho
              >
                <EditIcon />
              </Button>
              <Button variant="contained" color="secondary" onClick={onDelete}>
                <RemoveIcon />
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Task;
