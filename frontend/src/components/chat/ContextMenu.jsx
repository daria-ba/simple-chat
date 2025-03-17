import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event) => {
    event.preventDefault();

    setPosition({ x: event.clientX, y: event.clientY });
    setMenuVisible(true);
  };

  const handleClickOutside = () => {
    setMenuVisible(false);
  };

  return (
    <div 
      onContextMenu={handleContextMenu} 
      onClick={handleClickOutside} 
      style={{ width: "100vw", height: "100vh", background: "#f0f0f0" }}
    >
      <h2>Правая кнопка мыши для вызова меню</h2>

      {menuVisible && (
        <ul 
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            background: "white",
            border: "1px solid gray",
            padding: "5px",
            listStyle: "none",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)"
          }}
        >
          <li style={{ padding: "5px", cursor: "pointer" }}>            <Button
            className='bg-transparent border-black text-xs p-1 text-black'
            onClick={() => handleRemoveMessage(message.id, userId)}
            >
              Удалить
            </Button></li>
          <li style={{ padding: "5px", cursor: "pointer" }}>Опция 2</li>
          <li style={{ padding: "5px", cursor: "pointer" }}>Опция 3</li>
        </ul>
      )}
    </div>
  );
};

export default ContextMenu;
