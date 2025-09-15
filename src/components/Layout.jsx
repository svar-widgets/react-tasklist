import { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { Button } from '@svar-ui/react-core';
import { delegateClick } from '@svar-ui/lib-dom';
import { tempID } from '@svar-ui/lib-state';
import { context } from '@svar-ui/react-core';
import { useWritableProp } from '@svar-ui/lib-react';
import Task from './Task.jsx';
import './Layout.css';

export default function Layout(props) {
  const { readonly = false, onChange } = props;

  const [data, setData] = useWritableProp(props.data || []);

  const [edit, setEdit] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const i18n = useContext(context.i18n);
  const _ = useMemo(() => i18n.getGroup('tasklist'), [i18n]);

  function openEditor() {
    setEdit(-1);
    setEditTask({ id: -1, content: '', state: false });
  }

  function add(content) {
    const task = {
      id: tempID(),
      content,
      state: false,
    };

    const next = [...data, task];
    setData(next);
    if (onChange) {
      const res = onChange({ value: next, task, action: 'add' });
      if (res && typeof res === 'object') {
        if (res.then) {
          res.then((data) => {
            updateAfter(task.id, data);
          });
        } else {
          updateAfter(task.id, res);
        }
      }
    }
  }

  function updateAfter(id, data) {
    setData((prev) => {
      const index = prev.findIndex((d) => d.id === id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy[index] = { ...prev[index], ...data };
      return copy;
    });
  }

  function remove(id) {
    if (edit === id) setEdit(null);

    const next = data.filter((d) => d.id !== id);
    setData(next);
    if (id !== -1) {
      onChange && onChange({ value: next, id, action: 'delete' });
    }
  }

  function update(id, content, status) {
    let task;
    const next = data.map((d) => {
      if (d.id === id) {
        task = { ...d, content, status };
        return task;
      } else return d;
    });
    setData(next);
    setEdit(null);

    onChange && onChange({ value: next, id, action: 'update', task });
  }

  function onRemove(id) {
    remove(id);
  }

  function onUpdate({ task, content, status, next }) {
    if (task.id === -1) {
      setEdit(null);
      if (content) {
        add(content);
        if (next) {
          openEditor();
        }
      } else {
        remove(task.id);
      }
    } else {
      if (content) update(task.id, content, status);
      else remove(task.id);
      setEdit(null);
    }
  }

  const handlers = useRef({});
  handlers.current.dblclick = (id) => {
    if (!props.readonly) setEdit(id);
  };

  const listRef = useRef(null);
  useEffect(() => {
    delegateClick(listRef.current, {
      dblclick: (id) => handlers.current.dblclick(id),
    });
  }, []);

  return (
    <div className="wx-kro6Nsfl wx-tasks-list">
      <div className="wx-kro6Nsfl wx-list" ref={listRef}>
        {data.map((task) => (
          <Task
            key={task.id}
            task={task}
            edit={edit}
            onUpdate={onUpdate}
            onRemove={onRemove}
            readonly={readonly}
          />
        ))}
        {edit === -1 ? (
          <Task
            key={edit}
            task={editTask}
            edit={edit}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ) : null}
      </div>
      {!readonly && edit !== -1 ? (
        <div className="wx-kro6Nsfl wx-button">
          <Button onClick={openEditor}>{_('Add task')}</Button>
        </div>
      ) : null}
    </div>
  );
}
