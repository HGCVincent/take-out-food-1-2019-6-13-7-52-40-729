var best_charge=require("../src/best-charge.js");

it('should be return true when item is ITEM0001', function () {
  //given
  const id = 'ITEM0001';
  //when
  const result = best_charge.isValid(id);
  //then
  expect(result).toEqual(true);
});

it('should be return falg when item is ITEM1111', function () {
  //given
  const id = 'ITEM1111';
  //when
  const result = best_charge.isValid(id);
  //then
  expect(result).toEqual(false);
});
