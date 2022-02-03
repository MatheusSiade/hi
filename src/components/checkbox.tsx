import React, {useEffect} from "react";
import {IndeterminateCheckbox} from "./helpers";

interface CheckboxProps {
  name: string
  check: IndeterminateCheckbox
  setCheck: any;
  testId: string
}

const Checkbox: React.FC<CheckboxProps> = ({name, check, setCheck, testId}) => {
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
    data-testid={testId}
    checked={check === "true"}
  />
}

export default Checkbox