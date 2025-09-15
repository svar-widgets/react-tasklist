import BasicInit from './cases/BasicInit.jsx';
import BackendUrl from './cases/BackendUrl.jsx';
import CustomBackend from './cases/CustomBackend.jsx';
import BackendResolve from './cases/BackendResolve.jsx';
import Events from './cases/Events.jsx';
import Locales from './cases/Locales.jsx';

export const links = [
  ['/base/:skin', 'Tasklist basic', BasicInit, 'BasicInit'],
  ['/events/:skin', 'Events', Events, 'Events'],
  ['/locales/:skin', 'Locales', Locales, 'Locales'],
  ['/backend-url/:skin', 'Save to backend', BackendUrl, 'BackendUrl'],
  ['/backend-custom/:skin', 'Custom backend', CustomBackend, 'CustomBackend'],
  [
    '/data-resolve/:skin',
    'Resolve and fetch',
    BackendResolve,
    'BackendResolve',
  ],
];
