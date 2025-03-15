import React from "react";
import { Droppable } from "react-beautiful-dnd"; // Import Droppable component
import TicketCard from "./ticket-card";
import TicketColumnHeading from "./ticket-column-heading";

const TicketColumn = ({ group, groupBy }) => {
  return (
    <Droppable droppableId={group.groupName}>
      {(provided) => (
        <div                                            
          ref={provided.innerRef}
          {...provided.droppableProps} 
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#f4f5f7",
            width: "18%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            color: "#5c5c5e",
          }}
        >
          <TicketColumnHeading
            groupName={group.groupName}
            ticketsLength={group.tickets.length}
            groupBy={groupBy}
          />
          {group.tickets.map((ticket, index) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              groupBy={groupBy}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TicketColumn;
