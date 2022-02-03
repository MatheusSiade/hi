import React, {useEffect, useState} from "react";
import importData from "../data/data.json";
import {CheckItemType, convertObjectToArray, generateNewItems} from "./helpers";
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

  const handleSetChildren = (test: any) => {
    console.log(test);
    setItems(generateNewItems(items, test).newArr)
  }

  return <form>
      <CheckboxTree items={items} setChildren={handleSetChildren}/>
  </form>

}
export default CheckboxForm;