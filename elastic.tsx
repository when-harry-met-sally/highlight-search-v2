import React from "react";
import * as _ from "lodash";

export const elastic = (
  filterString: string,
  list: any[],
  fieldPaths: string[][]
) => {
  let filteredList: object[] = [];
  const getDeepField: any = (
    originalObject: object,
    nestedObject: any,
    fields: string[],
    match: boolean
  ) => {
    if (!nestedObject) {
      nestedObject = originalObject;
    }
    fields = _.cloneDeep(fields);
    if (fields.length > 1) {
      const field: any = fields.shift();
      const deeper: any = getDeepField(originalObject, nestedObject[field], fields, match);
      if (deeper) {
        return deeper;
      }
    }
    const test = scanDeepField(nestedObject[fields[0]]);
    if (test) {
      nestedObject[fields[0]] = test;
      if (!match) {
        filteredList.push(originalObject);
      }
      return nestedObject[fields[0]];
    }
    return null;
  };
  const scanDeepField: any = (object: any) => {
    let searchMatch = false;
    let searchString = object;
    if (!searchString) {
      return null;
    }
    const filterLength = filterString.length;
    let newField = [];
    for (let c = 0; c < searchString.length; c++) {
      const comparison = searchString.slice(c, c + filterLength);
      if (comparison.toLowerCase() === filterString.toLowerCase()) {
        searchMatch = true;
        newField.push(
          <span key={c} className="hl">
            {comparison}
          </span>
        );
        c += comparison.length - 1;
      } else {
        newField.push(<span key={c}>{searchString[c]}</span>);
      }
    }
    object = newField;
    if (searchMatch) {
      return newField;
    }
    return null;
  };

  if (!filterString) {
    return list;
  }
  filterString = filterString.trim();
  if (!filterString) {
    return list;
  }

  list = _.cloneDeep(list);
  list.forEach(object => {
    let filterMatch = false;
    fieldPaths.forEach(criteria => {
      if (getDeepField(object, null, criteria, filterMatch)) {
        filterMatch = true;
      }
    });
  });
  return filteredList;
};
