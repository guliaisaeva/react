import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About This Application</h1>
      <p className="mb-4">
        This Star Wars Films app was built by Gulia Isaeva. It demonstrates
        routing, hooks, pagination, and master-detail views.
      </p>
      <p className="mb-4">
        The app is part of the RS School React course, where students learn
        React fundamentals and best practices.
      </p>
      <a
        href="https://app.rs.school/course/schedule?course=react-2025-q3"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Visit the RS School React course
      </a>
    </div>
  );
};

export default AboutPage;
