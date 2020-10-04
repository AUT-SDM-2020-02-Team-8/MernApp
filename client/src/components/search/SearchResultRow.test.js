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
  const headerMapping = {
    title: 'Title',
    author: 'Author',
    year: 'Year',
    recordType: 'Type',
    journal: 'Journal',
    publisher: 'Publisher',
    sePractice: 'SE Practice',
    claims: 'Claims'
  }
  const wrapper = shallow(<SearchResultRow
    evidence={evidence}
    allColumns={Object.keys(headerMapping)}
    chosenColumns={Object.keys(headerMapping)}
  />);
  expect(wrapper).toMatchSnapshot();
});
