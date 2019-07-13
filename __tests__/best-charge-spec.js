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
  const items = ['ITEM0001 x 4','ITEM0013 x 3'];
  //when
  const result = best_charge.calculateAmountOfSelectItem(items);
  //then
  expectResult = {'ITEM0001':'4','ITEM0013' : '3'};
  expect(result).toEqual(expectResult);
});
