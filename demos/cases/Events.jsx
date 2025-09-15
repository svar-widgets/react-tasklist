import { useMemo, useState, useCallback } from 'react';
import { Tasklist } from '../../src/index';
import { getData } from '../data';
import './Events.css';

function Events() {
  const { data } = useMemo(() => getData(), []);
  const [message, setMessage] = useState('');

  const onChange = useCallback(({ action, task, id }) => {
    switch (action) {
      case 'add':
        setMessage(`New task: "${task.content}" was added `);
        break;
      case 'update':
        setMessage(`Task with id: ${task.id} was updated `);
        break;
      case 'delete':
        setMessage(`Task with id: ${id} was deleted `);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <div className="wx-yvDpgIBC message">{message}</div>
      <div>
        <div className="wx-yvDpgIBC wrapper">
          <Tasklist value={data} onChange={onChange} />
        </div>
      </div>
    </>
  );
}

export default Events;
