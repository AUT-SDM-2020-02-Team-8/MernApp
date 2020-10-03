import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

test ('reders homepage',() =>{
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
}
)
