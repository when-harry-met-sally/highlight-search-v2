import React from "react";
import * as _ from "lodash";

export const elastic = (
  filter: string,
  list: any[],
  searchCriteria: string[][],
) => {
  let rebuilt: any = [];
  const getDeepField: any = (father: any, object: any, fields: string[]) => {
    if (!object) {
      object = father;
    }
    fields = _.cloneDeep(fields);
    if (fields.length > 1) {
      const field: any = fields.shift();
      const deeper: any = getDeepField(father, object[field], fields);
      if (deeper) {
        return deeper;
      }
    }
    const test = scanDeepField(object[fields[0]]);
    if (test) {
      object[fields[0]] = test;
      rebuilt.push(father);
    }
    return object[fields[0]];
  };
  const scanDeepField: any = (object: any) => {
    let searchMatch = false;
    let searchString = object;
    if (!searchString) {
      return;
    }
    const filterLength = filter.length;
    let newField = [];
    for (let c = 0; c < searchString.length; c++) {
      const comparison = searchString.slice(c, c + filterLength);
      if (comparison.toLowerCase() === filter.toLowerCase()) {
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
  list = _.cloneDeep(list);
  filter.trim();
  if (!filter || filter === "") {
    return list;
  }
  list.forEach(item => {
    searchCriteria.forEach(criteria => {
      getDeepField(item, null, criteria);
    });
  });
  return rebuilt;
};
