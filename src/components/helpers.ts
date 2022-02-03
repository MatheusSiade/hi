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

export const setValues = (itemArr: CheckItemType[], pathToFollow: number[], check: IndeterminateCheckbox): { newArr: CheckItemType[], childrenState: IndeterminateCheckbox } => {
  let newData = {
    newArr: itemArr[pathToFollow[0]]?.children,
    childrenState: itemArr[pathToFollow[0]].check
  };
  if (pathToFollow.length > 1 && itemArr[pathToFollow[0]].children.length !== 0) {
    newData = setValues(itemArr[pathToFollow[0]].children, pathToFollow.slice(1), check)
  }
  const checkedChildren = newData.newArr?.reduce((prev, item) => item.check === "true" ? prev + 1 : item.check === "indeterminate" ? prev + 0.5 : prev, 0)
  const arr: CheckItemType[] = [
    ...itemArr.slice(0, pathToFollow[0]),
    {
      ...itemArr[pathToFollow[0]],
      check: pathToFollow.length === 1 ? check : (checkedChildren === itemArr[pathToFollow[0]].children.length ? "true" : (checkedChildren > 0 ? "indeterminate" : "false")),
      children: pathToFollow.length === 1 ? toggleValues(itemArr[pathToFollow[0]].children, check) : newData.newArr
    },
    ...itemArr.slice(pathToFollow[0] + 1),
  ]
  return {
    newArr: arr,
    childrenState: itemArr.length > 0 ? (checkedChildren === itemArr.length ? "true" : (checkedChildren > 0 ? "indeterminate" : "false")) : "false"
  }
}