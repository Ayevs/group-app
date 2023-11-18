//Redux imports
import { itemStore } from './stores/store'
import { Provider } from 'react-redux';

import Screen from './components/Screen';

export default function App() {
  return (
      <Provider store = {itemStore}>
        <Screen />
      </Provider>
  );
}