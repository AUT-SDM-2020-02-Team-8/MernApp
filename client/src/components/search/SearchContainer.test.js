import React from 'react';
import { shallow } from 'enzyme';
import SearchContainer from './SearchContainer';

test('renders homepage', () => {
  const wrapper = shallow(<SearchContainer />);
  expect(wrapper).toMatchSnapshot();
});
