import React from 'react';
import { shallow } from 'enzyme';
import EnhancedTableToolbar from './EnhancedTableToolbar';

test('renders homepage', () => {
  const evidence = {
    title: 'title 1',
    author: 'author 1',
    year: '2020',
    recordType: 'reference paper',
    journal: 'IEEE',
    publisher: 'IEEE',
    sePractice: 'TDD',
    claims: ["code quality", "team confidence", "product quality"]
  }
  const wrapper = shallow(<EnhancedTableToolbar evidence={evidence} />);
  expect(wrapper).toMatchSnapshot();
});
