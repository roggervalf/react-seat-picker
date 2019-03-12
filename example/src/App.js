import React, { Component } from 'react'
//import styles from './styles/index.scss'
//import './index.scss'

import 
//ExampleComponent,
{SeatPicker} from 'react-seat-picker'
//import './index.scss'

export default class App extends Component {
  render () {
    //console.log("styles",styles)
    const rows = [
      [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6, isReserved: true}]
  ];
    return (
      <div>
        <SeatPicker
         className="SeatPicker" 
         rows={rows} maxReservableSeats={3} alpha  />
        {/* <ExampleComponent text='Modern React component module' /> */}
      </div>
    )
  }
}
