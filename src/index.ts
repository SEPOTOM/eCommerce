import "./style.css";

function sum(a: number, b: number): number {
  return a + b;
}

it('sum function works', () => {
  expect(sum(1, 2)).toBe(3);
});
