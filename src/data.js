
//filterData(data, condition)//
export const filterByType = (array,type) => { 
  let newArray = array.filter(item => item.type.includes(type));
  return newArray;
};

//sortData(data, sortBy, sortOrder)//
export const sortByName = (array,condition) => {
  let newArray = array.sort((a,b) => a.name > b.name ? 1:-1);
  if ( condition == "Z-A" ) {array.sort((a,b) => b.name > a.name ? 1:-1);}
  if ( condition == "Número inferior" ) {array.sort((a,b) => a.num - b.num);} 
  if ( condition == "Número superior" ) {array.sort((a,b) => b.num - a.num);}
  return newArray;
};

//filterData(data, condition)//
export const filterByName = (array,name) => {
  let newArray = array.filter(item => item.name === name);
  return newArray;
};

//computeStats(data)
export const computeByStats = (array) => {
  let newItem = array.slice(0,3).reduce((a,b) => parseInt(a) + parseInt(b));
  return newItem;
};
 
