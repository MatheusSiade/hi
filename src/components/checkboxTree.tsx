import {CheckItemType} from "./helpers";
import React from 'react';
import Checkbox from "./checkbox";
import styles from "../../styles/Checkbox.module.css"

interface CheckboxTreeProps {
  items: CheckItemType[];

  setChildren?(children: any): void;
}

const CheckboxTree: React.FC<CheckboxTreeProps> = ({items, setChildren, }) => {

  return <React.Fragment>
    {items.map((item, i) => {
      const backgroundColor = i % 2 === 0 ? "#ede9f3" : "#d6d8e2";
      const [hover, setHover] = React.useState(false);
      const toggleBackgroundHover = (on: boolean) => {
        if (on) setHover(true)
        else setHover(false)
      }
      return <div className={styles.innerTreeDiv} style={{
        backgroundColor: hover ? "#b4b4ff" : backgroundColor,
      }} key={item.id} onMouseEnter={() => toggleBackgroundHover(true)}
                  onMouseLeave={() => toggleBackgroundHover(false)}>
        <div className={styles.checkboxDiv}>
          <div>
            <div className={styles.lineIndicator}/>
            {i === items.length - 1 && <div className={styles.lineIndicatorFix} style={{
              borderLeft: `1px ${hover ? "#b4b4ff" : backgroundColor} solid`,
            }}/>}
          </div>
          <label className={styles.container}>
            <Checkbox
              setCheck={(check: any) => {
                 setChildren ? setChildren({
                  ...item,
                  children: [],
                  check: check
                }) : null
              }}
              name={item.name}
              check={item.check}
            />
            <span className={styles.checkmark}/>
            {item.name}

          </label>
        </div>
        {item.children.length !== 0 &&
            <CheckboxTree items={item.children} setChildren={((i) => setChildren ? setChildren({
              ...item,
              children: [i]
            }) : undefined)} />}</div>
    })}
  </React.Fragment>
}
export default CheckboxTree;