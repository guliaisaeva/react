import React, { useState } from 'react';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>React Forms Application</h1>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is a placeholder for your form.</p>
      </Modal>
    </div>
  );
};

export default App;
