import React from 'react';
import renderer from 'react-test-renderer';
import Login from './Login';

db = app.firestore()

describe('testing login page' () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<Login page="https://petbookapp.com/login">PetBookApp</Login>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})

console.error = jest.fn()
