import { useEffect, useState, useCallback } from 'react';
import Layout from './Layout.jsx';
import { Locale } from '@svar-ui/react-core';
import { en } from '@svar-ui/tasklist-locales';

function Tasklist(allProps) {
  const { onData, onChange, value, ...props } = allProps;
  let [finalData, setFinalData] = useState(null);

  useEffect(() => {
    if (onData && value) {
      Promise.resolve(onData(value)).then((x) => setFinalData(x));
    } else if (value && value.then) {
      value.then((x) => setFinalData(x));
    } else {
      setFinalData(value || []);
    }
  }, [onData, value]);

  const handleOnChange = useCallback(
    (e) => {
      e.originalValue = value;
      return onChange && onChange(e);
    },
    [onChange, value],
  );

  return (
    <Locale words={en} optional={true}>
      {finalData === null ? (
        <Layout
          data={[]}
          readonly={true}
          {...props}
          onChange={handleOnChange}
        />
      ) : (
        <Layout data={finalData} {...props} onChange={handleOnChange} />
      )}
    </Locale>
  );
}

export default Tasklist;
