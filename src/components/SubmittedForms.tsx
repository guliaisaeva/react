import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const SubmittedForms: React.FC = () => {
  const forms = useSelector((state: RootState) => state.forms);

  if (forms.length === 0) return <p>No submissions yet.</p>;

  return (
    <div>
      {forms.map((f, index) => (
        <div
          key={index}
          style={{ border: '1px solid #ccc', marginBottom: 12, padding: 8 }}
        >
          <p>
            <strong>Name:</strong> {f.name}
          </p>
          <p>
            <strong>Age:</strong> {f.age}
          </p>
          <p>
            <strong>Email:</strong> {f.email}
          </p>
          <p>
            <strong>Gender:</strong> {f.gender}
          </p>
          <p>
            <strong>Country:</strong> {f.country}
          </p>
          {f.imageBase64 && (
            <img
              src={f.imageBase64}
              alt="Uploaded"
              style={{ maxWidth: 100, marginTop: 8 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmittedForms;
