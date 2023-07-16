import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import dataState from "./dataState"

test('renders learn react link', () => {
  render(<App dialogsData={dataState.dialogsPage.dialogsData} messagesData={dataState.dialogsPage.messagesData} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
