import React, { useState } from 'react';
import Modal from './components/Modal';
import HookForm from './components/HookForm';
import UncontrolledForm from './components/UncontrolledForm';

const App: React.FC = () => {
  const [openHookForm, setOpenHookForm] = useState(false);
  const [openUncontrolled, setOpenUncontrolled] = useState(false);

  return (
    <div>
      <h1>React Forms Application</h1>

      <button onClick={() => setOpenHookForm(true)}>Open Hook Form</button>
      <button onClick={() => setOpenUncontrolled(true)}>
        Open Uncontrolled Form
      </button>

      <Modal open={openHookForm} onClose={() => setOpenHookForm(false)}>
        <HookForm onSuccess={() => setOpenHookForm(false)} />
      </Modal>

      <Modal open={openUncontrolled} onClose={() => setOpenUncontrolled(false)}>
        <UncontrolledForm onSuccess={() => setOpenUncontrolled(false)} />
      </Modal>
    </div>
  );
};

export default App;
