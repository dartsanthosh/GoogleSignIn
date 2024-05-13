import React from 'react';

import Navigator from './src/Navigator';
import AuthProvider from './src/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}

export default App;
