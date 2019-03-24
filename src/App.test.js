import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './pages/home';
import { Result } from './pages/result';
import { Dropdown } from './components/DropDown';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

Enzyme.configure({ adapter: new Adapter() });

it('Home renders without crashing', () => {
  const getDataMock = jest.fn();
  const component = shallow(<Home getData={getDataMock} />);
  expect(component).toMatchSnapshot();
});

it('Result renders without crashing', () => {
  const component = shallow(<Result />);
  expect(component).toMatchSnapshot();
});

it('Header renders without crashing', () => {
  const component = shallow(<Header />);
  expect(component).toMatchSnapshot();
});

it('Footer renders without crashing', () => {
  const component = shallow(<Footer />);
  expect(component).toMatchSnapshot();
});
