const formatListByKey = (
  list: any[],
  key: string,
  delimiter: string
): string => {
  return list.map((item: any) => item[key]).join(delimiter);
};

//dynamic looseObject giving error
const mapSelectiveKeyName = (
  list: object[] | null,
  keyNames: string[]
): any[] => {
  if (!list) return [];
  return list.map((listItem) => {
    const obj = {};
    keyNames.forEach((keyName) => {
      obj[keyName as keyof object] = listItem[keyName as keyof object];
    });
    return obj;
  });
};

const debounce = (fn: Function, ms: number = 300): Function => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const isEmpty = (obj: any): boolean => {
  if (obj === undefined || obj === null) return true;
  if (typeof obj === "string") return obj.trim().length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (obj instanceof Set) return obj.size === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
};

const isNotEmpty = (obj: any): boolean => !isEmpty(obj);

export { formatListByKey, mapSelectiveKeyName, debounce, isEmpty, isNotEmpty };
