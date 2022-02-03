import React, {useEffect, useState} from "react";
import importData from "../data/data.json";
import {CheckItemType, convertObjectToArray, setValues, generateNewItems, IndeterminateCheckbox} from "./helpers";
import CheckboxTree from "./checkboxTree";


const CheckboxForm: React.FC = ({}) => {
  let data: CheckItemType[];
  const [items, setItems] = useState<CheckItemType[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("checkboxData")
    if (storedData !== null) {
      data = JSON.parse(storedData);
    } else data = convertObjectToArray(importData);
    setItems(data);
    console.log(data)
  }, [])

  useEffect(() => {
    localStorage.setItem("checkboxData", JSON.stringify(items))
  }, [items])

  const handleSetChildrenNew = (pathToFollow: number[], check: IndeterminateCheckbox) => {
    setItems(setValues(items, pathToFollow, check).newArr)
  }

  return <form>
      <CheckboxTree items={items} setChildren={handleSetChildrenNew} deps={[]} />
  </form>

}
export default CheckboxForm;