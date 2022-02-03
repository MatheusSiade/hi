import React from 'react';

import {render, screen} from '@testing-library/react';
import CheckboxForm from "../components";
import {CheckItemType, convertObjectToArray} from "../components/helpers";
import data from "../data/data.json";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

const recursiveTest = (arr: CheckItemType[]) => {
  arr.map((item, i) => {
    if (item.children.length !== 0) {
      recursiveTest(item.children ?? []);
    }
    expect(screen.getByTestId(item.id)).toBeInTheDocument()
  })
}
const recursiveCheck = (arr: CheckItemType[]) => {
  arr.map((item, i) => {
    if (item.children.length !== 0) {
      recursiveTest(item.children ?? []);
    }
    expect(screen.getByTestId(item.id)).toBeChecked()
  })
}

describe('Render CheckboxForm from array', () => {
  it('renders CheckboxForm component', () => {
    render(<CheckboxForm/>,);
    const itemArr = convertObjectToArray(data);
    recursiveTest(itemArr);
  });
});

describe('Mark every checkbox from clicking the tree roots', () => {
  it('Mark every checkbox from clicking the tree roots', async () => {
    render(<CheckboxForm disableCache/>,);
    const itemArr = convertObjectToArray(data);
    itemArr.map(async (item, i) => {
      await userEvent.click(screen.getByTestId(item.id))
    })
    recursiveCheck(itemArr)
  });
});

describe('Set parent checkbox from clicking all its the children', () => {
  it('Mark every checkbox from clicking its children', async () => {
    render(<CheckboxForm disableCache/>,);
    const itemArr = convertObjectToArray(data);
    itemArr.map(async (item, i) => {
      if (item.children.length !== 0) {
        item.children.map(async (innerItem, j) => {
          await userEvent.click(screen.getByTestId(innerItem.id))
        })
      } else await userEvent.click(screen.getByTestId(item.id))
    })
    recursiveCheck(itemArr)
  });
});


