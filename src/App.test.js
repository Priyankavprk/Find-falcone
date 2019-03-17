import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Home from './Home';
import Result from './Result';
import Dropdown from './components/dropDown';
import Header from './components/header';
import Footer from './components/footer';

Enzyme.configure({ adapter: new Adapter() });

describe("Dropdown", () => {
  let props;
  let mountedDropDown;
  const dropDown = () => {
    if (!mountedDropDown) {
      mountedDropDown = mount(
        <Dropdown {...props} />
      );
    }
    return mountedDropDown;
  }

  beforeEach(() => {
    props = {
      options: undefined,
      handlePlanetSelected: undefined,
      destinationsSelected: undefined,
      usedVehicles: undefined,
    };
  });
  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = dropDown().find("div");
      const wrappingDiv = divs.first();
      // expect(wrappingDiv.children()).toEqual(dropDown().children());
    });
  });
})

it('Home renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Result renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Result />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Dropdown renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Header renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Footer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
