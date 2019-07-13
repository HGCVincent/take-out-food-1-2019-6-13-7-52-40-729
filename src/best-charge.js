const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

function bestCharge(selectedItems) {
    return /*TODO*/;
}

const isValid = (id) => {
    let flag = false;
    let allItems = loadAllItems();
    allItems.forEach(item => {
      if (id === item.id){
        flag = true;
      }
    });
    return flag;
}

const calculateAmountOfSelectItem = (selectItems) =>{
  let selectItemsAndAmount = {};
  selectItems.forEach(item => {
    let index = item.indexOf('x');
    let id = item.substring(0,index - 1);
    let amount = item.substring(index + 2);
    selectItemsAndAmount[id] = amount;
  });
  return selectItemsAndAmount;
}

module.exports = {
  isValid,
  calculateAmountOfSelectItem
}
