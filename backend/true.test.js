const {getAllSauce} = require("../backend/controllers/sauce") 

test('Find the sauce', () => {
  const sauces = getAllSauce();    
  expect(sauces.length !== 0 ).toBe(true);
    });