import React from 'react';
import { shallow } from 'enzyme';
import ShowColumnsFilter from './ShowColumnsFilter';

test('renders homepage', () => {
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
  const wrapper = shallow(<ShowColumnsFilter headerMapping={headerMapping} showColumns={Object.keys(headerMapping)}/>);
  expect(wrapper).toMatchSnapshot();
});
