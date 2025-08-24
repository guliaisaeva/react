import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const SubmittedForms: React.FC = () => {
  const forms = useSelector((state: RootState) => state.forms);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (forms.length === 0) return;
    const lastIndex = forms.length - 1;
    setHighlightedIndex(lastIndex);
  }, [forms]);

  if (forms.length === 0) return <p>No submissions yet.</p>;

  return (
    <div>
      {forms.map((f, index) => {
        const isHighlighted = index === highlightedIndex;
        return (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              marginBottom: 12,
              padding: 8,
              backgroundColor: isHighlighted ? '#11ce2aff' : '#fff',
              transition: 'background-color 0.3s ease',
            }}
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
        );
      })}
    </div>
  );
};

export default SubmittedForms;
