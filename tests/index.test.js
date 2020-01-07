describe("My Test Suite", () => {
  it("My Test Case", () => {
    expect(true).toEqual(true);
  });
});
/* import React from "react";
import renderer from "react-test-renderer";
import { SeatPicker } from "../SeatPicker/SeatPicker";

const rows = [
  [
    { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
    { id: 2, number: 2, tooltip: "Cost: 15$" },
    null,
    {
      id: 3,
      number: "3",
      isReserved: true,
      orientation: "east",
      tooltip: "Reserved by Rogger",
    },
  ],
];

describe("SeatPicker", () => {
  test("snapshot renders", () => {
    const component = renderer.create(
      <SeatPicker
        rows={rows}
        maxReservableSeats={1}
        alpha
        visible
        selectedByDefault
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
*/
