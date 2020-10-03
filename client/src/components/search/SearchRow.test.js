import React from 'react';
import { shallow } from 'enzyme';
import SearchRow from './SearchRow';

test('renders homepage', () => {
  const wrapper = shallow(<SearchRow />);
  expect(wrapper).toMatchSnapshot();
});
