import React, { Component } from 'react'

import ExampleComponent,{SeatPicker} from 'react-seat-picker'

//import Seat from 'react-seat-picker/SeatPicker/SeatPicker'

export default class App extends Component {
  render () {
    const rows = [
      [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6, isReserved: true}]
  ];
    return (
      <div>
        <SeatPicker rows={rows} maxReservableSeats={3} alpha />
        <ExampleComponent text='Modern React component module' />
      </div>
    )
  }
}
