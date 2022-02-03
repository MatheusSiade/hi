import React, {useEffect} from "react";
import {IndeterminateCheckbox} from "./helpers";

interface CheckboxProps {
  name: string
  check: IndeterminateCheckbox
  setCheck: any
}

const Checkbox: React.FC<CheckboxProps> = ({name, check, setCheck}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.indeterminate = check === "indeterminate"
    }
  }, [check])


  return <input
    className={"checkbox"}
    style={{cursor: "pointer", color: "#0052ba"}}
    ref={ref}
    onChange={(e) => setCheck(e.target.checked ? "true" : "false")}
    name={name}
    type="checkbox"
    checked={check === "true"}
  />
}

export default Checkbox