var best_charge=require("../src/best-charge.js");


// test of function isValid
it('should be return true when item is ITEM0001', () => {
  //given
  const id = 'ITEM0001';
  //when
  const result = best_charge.isValid(id);
  //then
  expect(result).toEqual(true);
});

it('should be return falg when item is ITEM1111', () => {
  //given
  const id = 'ITEM1111';
  //when
  const result = best_charge.isValid(id);
  //then
  expect(result).toEqual(false);
});


//test of function calculateAmountOfSelectItem
it("should be return falg when item is ['ITEM0001 x 4','ITEM0013 x 3']", () => {
  //given
  const input = ['ITEM0001 x 4','ITEM0013 x 3'];
  //when
  const result = best_charge.calculateAmountOfSelectItem(input);
  //then
  expectResult = {'ITEM0001':'4','ITEM0013' : '3'};
  expect(result).toEqual(expectResult);
});

// test of function calculateTotalPriceOfFullReduction
it("should be return follow when invoke calculateTotalPriceOfFullReductionPromotion given {'ITEM0013' : '4', 'ITEM0022' : '1'}", () => {
  //given
  const input = {"ITEM0013" : "4", "ITEM0022" : "1"};
  //when
  const result = best_charge.calculateTotalPriceOfFullReductionPromotion(input);
  //then
  expectResult = {'discountType': '满30减6元','discountPrice': 6,'totalPricePayable': 26};
  expect(result).toEqual(expectResult);
});

// test of function calculateTotalPriceOfHalfPricePromotion
it("should be return follow when invoke calculateTotalPriceOfHalfPricePromotion given {'ITEM0001' : '1', 'ITEM0013' : '2','ITEM0022' : '1'}", () => {
  //given
  const input = {'ITEM0001' : '1', 'ITEM0013' : '2','ITEM0022' : '1'};
  //when
  const result = best_charge.calculateTotalPriceOfHalfPricePromotion(input);
  //then
  expectResult = {'discountType': '指定菜品半价','discountPrice': 13,'totalPricePayable': 25,'discountItem' :['黄焖鸡','凉皮']};
  expect(result).toEqual(expectResult);
});

// test of function Discount
it("should be return follow when invoke Discount given {'ITEM0013' : '4', 'ITEM0022' : '1'}", () => {
  //given
  const input = {"ITEM0013" : "4", "ITEM0022" : "1"};
  //when
  const result = best_charge.Discount(input);
  //then
  expectResult = {'discountType': '满30减6元','discountPrice': 6,'totalPricePayable': 26};
  expect(result).toEqual(expectResult);
});

it("should be return follow when invoke Discount given {'ITEM0013' : '4', 'ITEM0022' : '1'}", () => {
  //given
  const input = {"ITEM0013" : "4", "ITEM0022" : "1"};
  //when
  const result = best_charge.Discount(input);
  //then
  expectResult = {'discountType': '满30减6元','discountPrice': 6,'totalPricePayable': 26};
  expect(result).toEqual(expectResult);
});

