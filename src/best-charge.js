const loadAllItems = require('../src/items');
const loadPromotions = require('../src/promotions');

function bestCharge(selectedItems) {
    return /*TODO*/;
}

const allItems = () => {
  let items = {}
  loadAllItems().forEach(item => {
    items[item.id] = item;
  })
  return items;
}

const isValid = (id) => {
    let flag = false;
    for(let item in allItems()) {
      if (id === item){
        flag = true;
      }
    }
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

const calculateTotalPriceOfFullReduction = (selectItemsAndAmount) => {
  let TotalPrice = 0;
  let discountPrice = 0;
  for (let itemAndAmount in selectItemsAndAmount){
    TotalPrice += selectItemsAndAmount[itemAndAmount] * allItems()[itemAndAmount].price;
  }
  if (TotalPrice > 30){
    discountPrice = 6;
  }
  return {'discountType': '满30减6元','discountPrice': discountPrice,'totalPricePayable': TotalPrice - discountPrice}
}

const Discount = (selectItemsAndAmount) => {
}
module.exports = {
  isValid,
  calculateAmountOfSelectItem,
  calculateTotalPriceOfFullReduction
}
