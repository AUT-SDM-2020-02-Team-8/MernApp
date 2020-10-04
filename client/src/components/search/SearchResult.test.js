import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from './SearchResult';

test('renders homepage', () => {
  const evidences = [
    {
      _id: '1',
      title: 'title 1',
      author: 'author 1',
      year: '2020',
      recordType: 'reference paper',
      journal: 'IEEE',
      publisher: 'IEEE',
      sePractice: 'TDD',
      claims: ["code quality", "team confidence", "product quality"]
    }
  ];
  const wrapper = shallow(<SearchResult evidences={evidences} />);
  expect(wrapper).toMatchSnapshot();
});
