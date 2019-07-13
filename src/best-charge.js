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

module.exports = {
  isValid,
}
