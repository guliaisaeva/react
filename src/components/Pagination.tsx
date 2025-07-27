import React from 'react';

const buttonStyle = {
  padding: '8px 16px',
  margin: '0 4px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  color: '#333',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.2s ease',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#134441',
  color: 'white',
  fontWeight: 'bold',
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#eee',
  color: '#999',
  cursor: 'not-allowed',
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={currentPage === page ? activeButtonStyle : buttonStyle}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
