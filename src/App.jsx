import React from "react";
import { Typography } from "@material-ui/core";
import "./assets/css/KanbanBoard.css"; // Importa tus estilos CSS
import { KanbanBoard } from "./components"; // Importa el componente KanbanBoard desde la carpeta "components"
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

const App = () => {
  return (
    <div className="app">
      {/* Título del tablero Kanban */}
      <Typography
        variant="h3"
        style={{ textAlign: "center", marginTop: "20px", color: "black" }}
      >
        <ViewKanbanIcon fontSize="large" /> Simple Kanban
      </Typography>
      
      {/* Renderiza el componente KanbanBoard */}
      <KanbanBoard />
    </div>
  );
};

export default App;

