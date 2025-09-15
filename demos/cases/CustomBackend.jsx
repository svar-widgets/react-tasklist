import { useRef, useState } from 'react';
import { Tasklist } from '../../src/index';
import { getData } from '../data';
import './CustomBackend.css';

function CustomBackend() {
  const [message, setMessage] = useState('');

  const dataRef = useRef();
  if (dataRef.current === undefined) {
    const prev = localStorage.getItem('--tasklist-demo-data');
    dataRef.current = prev ? JSON.parse(prev) : getData().data;
  }

  function callback(action, obj) {
    switch (action) {
      case 'add': {
        setMessage(`The task "${obj.task.content}" was successfully added`);
        break;
      }
      case 'delete': {
        setMessage(`The task was successfully deleted`);
        break;
      }
      case 'update': {
        setMessage(`The task was successfully updated`);
        break;
      }
      default:
        break;
    }
    localStorage.setItem('--tasklist-demo-data', JSON.stringify(obj.value));
  }

  return (
    <>
      <div className="wx-5iqQQpfC message">{message}</div>
      <div>
        <div className="wx-5iqQQpfC tasks">
          <Tasklist
            value={dataRef.current}
            onChange={(e) => callback(e.action, e)}
          />
        </div>
      </div>
    </>
  );
}

export default CustomBackend;
