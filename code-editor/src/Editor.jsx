import React, { useRef, useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(value);

  // Editor configuration options
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    theme: 'vs-dark',
    language: 'javascript',  // Default language for JavaScript
    fontSize: 18,
  };

  // Handle editor changes
  const onEditorChange = (newValue, e) => {
    setEditorValue(newValue);
    onChange(newValue); // Pass the change to the parent component
  };

  // Set up autocompletion
  useEffect(() => {
    // Register custom completion items for JavaScript
    monaco.languages.registerCompletionItemProvider('javascript', {
      triggerCharacters: ['.', ' ', '(', ')'], // Autocomplete triggers on specific characters
      provideCompletionItems: () => {
        return {
          suggestions: [
            {
              label: 'console.log()',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'console.log()',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: 'Log to the console',
              documentation: 'Used for logging values in the console',
            },
            {
              label: 'useState()',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'useState()',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: 'React useState Hook',
              documentation: 'Used for managing state in React components',
            },
            {
              label: 'function()',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'function() { \n\t$1\n}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: 'Function Definition',
              documentation: 'Define a new function in JavaScript',
            },
          ],
        };
      },
    });

    // Setup JSX for React (Optional: If you want JSX highlighting and functionality)
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
    });

    // Register React-related autocompletions
    monaco.languages.registerCompletionItemProvider('javascript', {
      triggerCharacters: ['<', '/'],
      provideCompletionItems: () => {
        return {
          suggestions: [
            {
              label: 'div',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '<div></div>',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: 'HTML div element',
              documentation: 'Represents a division or section in a document',
            },
            {
              label: 'Button',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: '<Button />',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: 'React Button Component',
              documentation: 'A custom React Button component',
            },
          ],
        };
      },
    });

  }, []);

  return (
    <div style={{ height: '100vh' , width:'100vh'}}>
      <MonacoEditor
        ref={editorRef}
        width="100%"
        height="100%"
        language="javascript"
        value={editorValue}
        options={options}
        onChange={onEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
