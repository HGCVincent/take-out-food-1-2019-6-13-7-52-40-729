const loadAllItems = require('../src/items');
const Promotions = require('../src/promotions');

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

const calculateTotalPriceOfHalfPricePromotion  = (selectItemsAndAmount) => {
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
  let fullReductionPromotion = calculateTotalPriceOfFullReductionPromotion(selectItemsAndAmount);
  let halfPricePromotion = calculateTotalPriceOfHalfPricePromotion(selectItemsAndAmount);
  if(fullReductionPromotion.discountPrice === 0 && halfPricePromotion.discountPrice ===0){
    fullReductionPromotion.discountType = '无';
    return fullReductionPromotion;
  }
  else if (fullReductionPromotion.discountPrice > halfPricePromotion.discountPrice){
    return fullReductionPromotion;
  }
  else return halfPricePromotion;
}

function bestCharge(selectedItems) {
  let selectItemsAndAmount = calculateAmountOfSelectItem(selectedItems);
  let bestDiscount = Discount(selectItemsAndAmount);
  let result = '============= 订餐明细 =============\n';
  for (let id in selectItemsAndAmount){
    result += `${allItems()[id].name} x ${selectItemsAndAmount[id]} = ${allItems()[id].price * selectItemsAndAmount[id]}元\n`;
  }
  if(bestDiscount.discountType !== '无' && bestDiscount.discountType === '满30减6元'){
    result += `-----------------------------------\n使用优惠:\n`;
    result += `${bestDiscount.discountType}，省${bestDiscount.discountPrice}元\n`
  }
  if(bestDiscount.discountType !== '无' && bestDiscount.discountType === '指定菜品半价'){
    result += `-----------------------------------\n使用优惠:\n`;
    result += `${bestDiscount.discountType}(`;
    bestDiscount.discountItem.forEach(name => {
      result += `${name}，`;
    })
    result = result.substring(0,result.length - 1) + `)，省${bestDiscount.discountPrice}元\n`;
  }
  result += `-----------------------------------
总计：${bestDiscount.totalPricePayable}元
===================================`;
  return result;
}

module.exports = {
  isValid,
  calculateAmountOfSelectItem,
  calculateTotalPriceOfFullReductionPromotion,
  calculateTotalPriceOfHalfPricePromotion,
  Discount,
  bestCharge
}
