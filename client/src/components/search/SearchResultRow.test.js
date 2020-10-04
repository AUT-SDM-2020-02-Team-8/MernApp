import React from 'react';
import { shallow } from 'enzyme';
import SearchResultRow from './SearchResultRow';

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
  const wrapper = shallow(<SearchResultRow evidence={evidence} />);
  expect(wrapper).toMatchSnapshot();
});
