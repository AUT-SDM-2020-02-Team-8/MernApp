import React from 'react';
import { shallow } from 'enzyme';
import CreateContainer from './CreateContainer';

test('renders create container', () => {
  const wrapper = shallow(<CreateContainer />);
  expect(wrapper).toMatchSnapshot();
});
