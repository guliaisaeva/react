import React, { Suspense } from 'react';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Performance App Application</h1>
      <Suspense fallback={<div>Loading data...</div>}>
        <h1>Hello3</h1>
      </Suspense>
    </div>
  );
};

export default App;
