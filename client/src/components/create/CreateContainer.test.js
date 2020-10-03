import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import CreateContainer from './CreateContainer';

test('renders create container', () => {
  const wrapper = shallow(<CreateContainer />);
  expect(wrapper).toMatchSnapshot();
});
