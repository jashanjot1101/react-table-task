// src/components/TaskTable.js
import React, { useEffect, useRef } from 'react';
import 'tabulator-tables/dist/css/tabulator.min.css';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import axios from 'axios';

const TaskTable = ({ tasks, setTasks }) => {
  const tableRef = useRef(null);
  const tabulatorInstance = useRef(null);

  // Fetch data from the API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        const mappedTasks = response.data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: 'No Description', // Placeholder for description
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(mappedTasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [setTasks]);

  // Initialize Tabulator once the component mounts
  useEffect(() => {
    if (tableRef.current) {
      tabulatorInstance.current = new Tabulator(tableRef.current, {
        layout: 'fitColumns',
        columns: [
          { title: 'Task ID', field: 'id', width: 100, headerFilter: true },
          { title: 'Title', field: 'title', editor: 'input' },
          { title: 'Description', field: 'description', editor: 'input' },
          {
            title: 'Status',
            field: 'status',
            editor: 'select',
            editorParams: { values: ['To Do', 'In Progress', 'Done'] },
          },
          {
            formatter: 'buttonCross',
            width: 40,
            align: 'center',
            cellClick: (e, cell) => {
              cell.getRow().delete();
            },
          },
        ],
      });
    }
  }, []);

  // Update table data when tasks change
  useEffect(() => {
    if (tabulatorInstance.current && tasks.length > 0) {
      tabulatorInstance.current.setData(tasks);
    }
  }, [tasks]);

  return <div ref={tableRef} style={{ overflow: 'auto' }}></div>;
};

export default TaskTable;
