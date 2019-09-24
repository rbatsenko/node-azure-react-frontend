import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Should render App component with "Waking up" state', () => {
  // Arrange
  act(() => {
    render(<App />, container);
  });

  // Act
  const wakingUp = container.querySelector('.waking-up');

  // Assert
  expect(wakingUp.textContent).toBe('Waking server up...');
});

test('Should fetch and render planets list', async () => {
  // Arrange
  const fakeResponse = [
    { name: 'Alderaan', terrain: 'grasslands, mountains' },
    { name: 'Yavin IV', terrain: 'jungle, rainforests' },
  ];

  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    })
  );

  // Act
  /* await act(async () => {
    render(<PlanetsList url={API_URL} />, container);
  });

  // Assert
  expect(container.querySelector('ul').textContent).toBe('');

  global.fetch.mockRestore(); */
});
