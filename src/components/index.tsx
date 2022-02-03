import React, {useEffect, useState} from "react";
import importData from "../data/data.json";
import {CheckItemType, convertObjectToArray, IndeterminateCheckbox, setValues} from "./helpers";
import CheckboxTree from "./checkboxTree";

interface CheckboxFormProps {
  disableCache?: boolean
}
const CheckboxForm: React.FC<CheckboxFormProps> = ({disableCache}) => {
  let data: CheckItemType[];
  const [items, setItems] = useState<CheckItemType[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("checkboxData")
    if (storedData !== null && !disableCache) {
      data = JSON.parse(storedData);
    } else data = convertObjectToArray(importData);
    setItems(data);
  }, [])

  useEffect(() => {
    localStorage.setItem("checkboxData", JSON.stringify(items))
  }, [items])

  const handleSetChildrenNew = (pathToFollow: number[], check: IndeterminateCheckbox) => {
    setItems(setValues(items, pathToFollow, check).newArr)
  }

  return <div>
    <form>
      <CheckboxTree items={items} setChildren={handleSetChildrenNew} deps={[]}/>
    </form>
  </div>

}
export default CheckboxForm;