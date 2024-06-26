import React, { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import SortableItem from "./components/SortableItem"
import update from "immutability-helper"

const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4"]

function App() {
  const [items, setItems] = useState(initialItems)

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = items[dragIndex]
    setItems(
      update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedItem],
        ],
      })
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {items.map((item, index) => (
          <SortableItem
            key={item}
            index={index}
            id={item}
            text={item}
            moveItem={moveItem}
          />
        ))}
      </div>
    </DndProvider>
  )
}

export default App
