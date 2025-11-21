import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    lloydCrimson: ['#fce8e8', '#f7cfcf', '#f09d9d', '#e86868', '#e23d3d', '#d72924', '#d72924', '#c01e1a', '#ab1815', '#960f0f'],
    lloydBlue: ['#e6f0ff', '#cce0ff', '#99c2ff', '#66a3ff', '#3385ff', '#0066ff', '#005ce6', '#001B54', '#001B54', '#000d2b'],
    lloydSpindle: ['#f4f8fb', '#e8f0f7', '#d1e1f0', '#b6d2ea', '#9bc3e4', '#80b4de', '#66a5d8', '#4d96d2', '#3387cc', '#1a78c6'],
  },
  primaryColor: 'lloydBlue',
  fontFamily: 'Inter, sans-serif',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
