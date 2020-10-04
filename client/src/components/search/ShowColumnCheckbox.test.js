import React from 'react';
import { shallow } from 'enzyme';
import ShowColumnCheckbox from './ShowColumnCheckbox';

test('renders homepage', () => {
  const wrapper = shallow(<ShowColumnCheckbox
    name='title' label='Title' chosenColumns={['title']}
  />);
  expect(wrapper).toMatchSnapshot();
});
