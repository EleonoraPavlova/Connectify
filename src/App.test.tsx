import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import dataState from "./state/dataState"

test('renders learn react link', () => {
  render(<App dialogsData={dataState.dialogsPage.dialogsData} messagesData={dataState.dialogsPage.messagesData} postsData={dataState.profilePage.postsData} friendsData={dataState.friendsPage.friendsData} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
