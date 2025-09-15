import { useMemo, useState } from 'react';
import { Tasklist } from '../../src/index';
import { Segmented } from '@svar-ui/react-core';
import { RestURL } from '@svar-ui/lib-data-provider';
import './BackendResolve.css';

export default function BackendResolve() {
  const url = useMemo(
    () => new RestURL('https://master--svar-tasklist-go--dev.webix.io/tasks'),
    [],
  );

  const [id, setId] = useState(1);

  const options = useMemo(
    () => [
      { id: 1, label: 'Work' },
      { id: 2, label: 'Rest' },
    ],
    [],
  );

  return (
    <div>
      <div className="wx-KFeUXzJX toolbar">
        <Segmented
          value={id}
          options={options}
          onChange={({ value }) => setId(value)}
        />
      </div>
      <div className="wx-KFeUXzJX tasks">
        <Tasklist
          url={url}
          value={id}
          onData={() => url.get(id)}
          onChange={({ action, task, id, originalValue: v }) =>
            url.path(v).save(action, task, id)
          }
        />
      </div>
    </div>
  );
}
