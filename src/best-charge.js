const loadAllItems = require('../src/items');
const Promotions = require('../src/promotions');

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

const calculateTotalPriceOfFullReductionPromotion = (selectItemsAndAmount) => {
  let TotalPrice = 0;
  let discountPrice = 0;
  for (let itemId in selectItemsAndAmount){
    TotalPrice += selectItemsAndAmount[itemId] * allItems()[itemId].price;
  }
  if (TotalPrice > 30){
    discountPrice = 6;
  }
  return {'discountType': '满30减6元','discountPrice': discountPrice,'totalPricePayable': TotalPrice - discountPrice}
}

const calculateTotalPriceOfHalfPricePromotion = (selectItemsAndAmount) => {
  let TotalPrice = 0;
  let discountPrice = 0;
  let discountItem = [];
  let halfPricePromotion = Promotions()[1];
  for (let itemId in selectItemsAndAmount){
    for (let i = 0 ; i <halfPricePromotion.items.length; i++) {
      if (itemId == halfPricePromotion.items[i]){
        discountPrice += selectItemsAndAmount[itemId] * allItems()[itemId].price / 2;
        discountItem.push(allItems()[itemId].name);
      }
    }
    TotalPrice += selectItemsAndAmount[itemId] * allItems()[itemId].price;
  }
  return {'discountType': '指定菜品半价','discountPrice': discountPrice,'totalPricePayable': TotalPrice - discountPrice,'discountItem': discountItem};
}

const Discount = (selectItemsAndAmount) => {
}
module.exports = {
  isValid,
  calculateAmountOfSelectItem,
  calculateTotalPriceOfFullReductionPromotion,
  calculateTotalPriceOfHalfPricePromotion
}
