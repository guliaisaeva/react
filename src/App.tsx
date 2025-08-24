import React, { useState } from 'react';
import Modal from './components/Modal';
import HookForm from './components/HookForm';
import UncontrolledForm from './components/UncontrolledForm';
import SubmittedForms from './components/SubmittedForms';

const App: React.FC = () => {
  const [openHookForm, setOpenHookForm] = useState(false);
  const [openUncontrolled, setOpenUncontrolled] = useState(false);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Forms Application</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          margin: '20px 0',
        }}
      >
        <button
          onClick={() => setOpenHookForm(true)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Open Hook Form
        </button>
        <button
          onClick={() => setOpenUncontrolled(true)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Open Uncontrolled Form
        </button>
      </div>

      <Modal open={openHookForm} onClose={() => setOpenHookForm(false)}>
        <HookForm onSuccess={() => setOpenHookForm(false)} />
      </Modal>

      <Modal open={openUncontrolled} onClose={() => setOpenUncontrolled(false)}>
        <UncontrolledForm onSuccess={() => setOpenUncontrolled(false)} />
      </Modal>

      <hr style={{ margin: '40px 0' }} />

      <h2>Submitted Data:</h2>
      <SubmittedForms />
    </div>
  );
};

export default App;
