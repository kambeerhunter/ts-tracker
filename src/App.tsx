import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import FallbackMap from './components/Fallback';

const MapBlock = lazy(() => import('./components/MapBlock'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="row">
          <div className="col-5 mt-3">
            <Dashboard />
          </div>
          <div className="col-7 mt-3 border">
            <Suspense fallback={<FallbackMap/>}>
              <MapBlock />
            </Suspense>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
