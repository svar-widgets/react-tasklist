import { useMemo } from 'react';
import { Tasklist } from '../../src/index';
import { getData } from '../data';
import './BasicInit.css';

export default function BasicInit() {
  const { data } = useMemo(() => getData(), []);

  return (
    <div>
      <div className="wx-DPrj7ciY wrapper">
        <Tasklist value={data} />
      </div>
    </div>
  );
}
