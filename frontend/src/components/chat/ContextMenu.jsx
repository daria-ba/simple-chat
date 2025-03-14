import React, { useState } from "react";

const ContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event) => {
    event.preventDefault(); // Отменяем стандартное контекстное меню

    setPosition({ x: event.clientX, y: event.clientY }); // Устанавливаем позицию меню
    setMenuVisible(true);
  };

  const handleClickOutside = () => {
    setMenuVisible(false); // Закрываем меню при клике вне его
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
          <li style={{ padding: "5px", cursor: "pointer" }}>Опция 1</li>
          <li style={{ padding: "5px", cursor: "pointer" }}>Опция 2</li>
          <li style={{ padding: "5px", cursor: "pointer" }}>Опция 3</li>
        </ul>
      )}
    </div>
  );
};

export default ContextMenu;
