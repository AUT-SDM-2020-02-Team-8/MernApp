import React from 'react';
import { shallow } from 'enzyme';
import SearchCriteria from './SearchCriteria';

test('renders homepage', () => {
  const wrapper = shallow(<SearchCriteria />);
  expect(wrapper).toMatchSnapshot();
});
