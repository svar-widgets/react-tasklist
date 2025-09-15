import { useMemo, useCallback } from 'react';
import { Tasklist } from '../../src/index';
import { RestURL } from '@svar-ui/lib-data-provider';
import './BackendUrl.css';

function BackendUrl() {
  const url = useMemo(
    () => new RestURL('https://master--svar-tasklist-go--dev.webix.io/tasks/1'),
    [],
  );
  const value = useMemo(() => url.get(), [url]);

  const handleChange = useCallback(
    ({ action, task, id }) => {
      return url.save(action, task, id);
    },
    [url],
  );

  return (
    <div>
      <div className="wx-P5KDKBPT tasks">
        <Tasklist value={value} onChange={handleChange} />
      </div>
    </div>
  );
}

export default BackendUrl;
