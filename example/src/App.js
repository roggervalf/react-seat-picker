import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'

export default class App extends Component {
  state = {
    // token: uuid(),
    loading:false
  }
  addSeatCallback=(row, number, id, cb)=>{
    this.setState({
      loading:true
    },async()=>{
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      if(row==="A")
        cb(row, number, id)
      this.setState({ loading: false })
    })
  }
  render () {
    const rows = [
      [{ number: 1, isSelected: true }, {number: 2}, null, {number: '3', isReserved: true, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, null, {number: '3', isReserved: true, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, null, {number: 3, isReserved: true, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, null, {number: 3, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, orientation: 'east'}, null, {number: '3', isReserved: true}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6, isReserved: true}]
    ]
    const {loading}=this.state
    console.log("loading", loading)
    return (
      <div>
        <h1>Seat Picker</h1>
        <SeatPicker addSeatCallback={this.addSeatCallback}
        rows={rows} maxReservableSeats={3} alpha visible selectedByDefault
         />
      </div>
    )
  }
}
