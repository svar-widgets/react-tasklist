import { useState } from 'react';
import { Locale, Segmented } from '@svar-ui/react-core';
import { Tasklist } from '../../src/index';
import { getData } from '../data';

import { de, cn } from '@svar-ui/tasklist-locales';
import { de as deCore, cn as cnCore } from '@svar-ui/core-locales';

import './Locales.css';

const { data } = getData();

const langs = [
  { id: 'en', label: 'EN' },
  { id: 'de', label: 'DE' },
  { id: 'cn', label: 'CN' },
];

function Locales() {
  const [lang, setLang] = useState('en');

  return (
    <>
      <div className="wx-if7s3NaI toolbar">
        <Segmented
          options={langs}
          value={lang}
          onChange={({ value }) => setLang(value)}
        />
      </div>
      <div style={{ margin: 'auto', maxWidth: '700px', marginTop: '40px' }}>
        {lang === 'de' ? (
          <Locale words={{ ...de, deCore }}>
            <Tasklist value={data} />
          </Locale>
        ) : lang === 'cn' ? (
          <Locale words={{ ...cn, cnCore }}>
            <Tasklist value={data} />
          </Locale>
        ) : (
          <Tasklist value={data} />
        )}
      </div>
    </>
  );
}

export default Locales;
