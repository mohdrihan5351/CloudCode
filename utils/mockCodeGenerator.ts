export const generateMockCode = (fileName: string): string => {
  const lowerCaseName = fileName.toLowerCase();

  if (lowerCaseName.includes('app.tsx')) {
    return `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your New App</h1>
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>
      </header>
    </div>
  );
}

export default App;`;
  }

  if (lowerCaseName.includes('button.tsx')) {
    return `import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;`;
  }

  if (lowerCaseName.includes('.css')) {
    return `/* Basic styles for ${fileName} */
.container {
  padding: 20px;
  font-family: sans-serif;
}`;
  }
  
  if (lowerCaseName.includes('index.tsx')) {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
  }
  
  if (lowerCaseName.includes('package.json')) {
      return JSON.stringify({
          name: "new-react-app",
          version: "0.1.0",
          private: true,
          dependencies: {
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "typescript": "^4.9.5"
          }
      }, null, 2);
  }

  return `// Placeholder for ${fileName}
// AI-generated code will appear here.
console.log('Hello from ${fileName}');
`;
};
