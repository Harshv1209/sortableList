import React, { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import styled from "styled-components"

const ItemType = "SORTABLE_ITEM"

const ItemContainer = styled.div`
  padding: 16px;
  margin-bottom: 8px;
  border: 2px solid
    ${(props) => (props.isDragging ? "lightgreen" : "lightgray")};
  border-radius: 4px;
  background-color: ${(props) => (props.isDragging ? "#f0fff0" : "white")};
  box-shadow: ${(props) =>
    props.isDragging ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none"};
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  cursor: move;
  display: flex;
  align-items: center;
`

const ItemText = styled.span`
  font-size: 16px;
  color: #333;
`

const SortableItem = ({ id, text, index, moveItem }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <ItemContainer ref={ref} isDragging={isDragging}>
      <ItemText>{text}</ItemText>
    </ItemContainer>
  )
}

export default SortableItem
