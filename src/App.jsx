import React, { useState, useEffect } from 'react';
import DisplayButton from './components/display-button';
import KanbanBoard from './components/kanban-board';

const App = () => {
  const getStoredFilter = () => {
    const savedFilter = localStorage.getItem('filter');
    return savedFilter ? JSON.parse(savedFilter) : { groupBy: 'status', orderBy: 'priority' };
  };

  const [filter, setFilter] = useState(getStoredFilter);
  

  useEffect(() => {
    localStorage.setItem('filter', JSON.stringify(filter));
  }, [filter]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <DisplayButton filter={filter} setFilter={setFilter} />
      <KanbanBoard filter={filter}  />
    </div>
  );
};

export default App;
