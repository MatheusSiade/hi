export interface CheckItemType {
  id: string;
  name: string;
  children: CheckItemType[];
  level: number;
  check: IndeterminateCheckbox;
}

export interface CheckItemData {
  id: string;
  name: string;
  children: Object;
  level: number;
}

export type IndeterminateCheckbox = "false" | "indeterminate" | "true"

export const convertObjectToArray = (obj: any): CheckItemType[] => {
  return Object.entries(obj).map(([key, value]) => {
      if (Object.entries((value as CheckItemData).children).length === 0) return {
        ...value as CheckItemData,
        children: [],
        check: "false"
      } as CheckItemType
      else return {
        ...value as CheckItemData,
        children: convertObjectToArray((value as CheckItemData).children),
        check: "false"
      } as CheckItemType
    }
  )
};

export const generateNewItems = (itemArr: CheckItemType[], pathToFollow: CheckItemType): { newArr: CheckItemType[], childrenState: IndeterminateCheckbox } => {
  let checkedChildren = 0
  const arr = itemArr.map((value) => {
      if ((pathToFollow.children).length === 0 && pathToFollow.id === value.id) {
        if (pathToFollow.check === "true") {
          checkedChildren++
        }
        return {
          ...value as CheckItemType,
          check: pathToFollow.check,
          children: toggleValues(value.children, pathToFollow.check),
        }
      } else {
        const newData = pathToFollow.id === value.id ? generateNewItems((value as CheckItemType).children, pathToFollow.children[0]) : {
          newArr: value.children,
          childrenState: value.check
        }
        if (newData.childrenState === "true") checkedChildren++; else if (newData.childrenState === "indeterminate") checkedChildren += 0.5
        return {
          ...value as CheckItemType,
          check: newData.childrenState,
          children: newData.newArr
        }
      }
    }
  )
  return {
    newArr: arr,
    childrenState: itemArr.length > 0 ? (checkedChildren === itemArr.length ? "true" : (checkedChildren > 0 ? "indeterminate" : "false")) : "false"
  }
}


export const toggleValues = (itemArr: CheckItemType[], check: IndeterminateCheckbox): CheckItemType[] => {
  return itemArr.map((value) => {
      if (Object.entries((value).children).length === 0) return {
        ...value,
        check: check
      }
      else return {
        ...value,
        children: toggleValues((value).children, check),
        check: check,
      }
    }
  )
}

const generateNew = (itemArr: CheckItemType[], pathToFollow: number[], check: IndeterminateCheckbox): { newArr: CheckItemType[], childrenState: IndeterminateCheckbox } => {
  let checkedChildren = 0;
  let newData = {
    newArr: itemArr[pathToFollow[0]].children,
    childrenState: pathToFollow.length === 1 ? check : itemArr[pathToFollow[0]].check
  };
  if (itemArr[pathToFollow[0]].children.length !== 0) {
    newData = generateNew(itemArr[pathToFollow[0]].children, pathToFollow.slice(1), check)
  }

  if (newData.childrenState === "true") checkedChildren++; else if (newData.childrenState === "indeterminate") checkedChildren += 0.5

  const arr: CheckItemType[] = [
    ...itemArr,
    {
      ...itemArr[pathToFollow[0]],
      children: pathToFollow.length === 1 ? toggleValues(itemArr[pathToFollow[0]].children, check) : newData.newArr
    }
  ]
  return {
    newArr: arr,
    childrenState: itemArr.length > 0 ? (checkedChildren === itemArr.length ? "true" : (checkedChildren > 0 ? "indeterminate" : "false")) : "false"
  }
}