import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'
import './styles/index.scss'

export default class App extends Component {
  render () {
    const rows = [
      [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6, isReserved: true}]
    ]
    return (
      <div>
        <h1>sad</h1>
        <SeatPicker className='SeatPicker' rows={rows} maxReservableSeats={3} alpha />
        {/* <ExampleComponent text='Modern React component module' /> */}
      </div>
    )
  }
}
