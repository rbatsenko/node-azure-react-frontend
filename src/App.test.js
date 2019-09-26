import React from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
// import PlanetsList from './components/PlanetsList';
import Text from './components/Text';
// import { API_URL } from './config';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('App component', () => {
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
});

describe('PlanetsList component', () => {
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
});

describe('Text component', () => {
  beforeEach(() => {
    act(() => {
      render(<Text />, container);
    });
  });

  test('Should load with initial "Text" value', () => {
    // Arrange
    const expectedTextOnLoad = container.querySelector('#text').textContent;

    // Assert
    expect(expectedTextOnLoad).toBe('Text');
  });

  test('Should add 1 to text on #btn click', () => {
    // Arrange
    const button = container.querySelector('#btn');

    // Act
    act(() => {
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const expectedTextAfterClick = container.querySelector('#text').textContent;

    // Assert
    expect(expectedTextAfterClick).toBe('Text+1');
  });
});
