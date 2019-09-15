import React, {Component} from 'react'

import SeatPicker from 'react-seat-picker'

export default class App extends Component {
  state = {
    loading: false
  }
  addSeatCallback = (row, number, id, cb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      cb(row, number)
      this.setState({loading: false})
    })
  }

  render() {
    const rows = [
      [{id: 1, number: 1, isSelected: true, tooltip: 'testtooltip'}, {
        id: 2,
        number: 2,
        tooltip: 'asdasdlkj sdlkasdlök0sjad \n alsjkd alkdj kaldöj adslöj alsdkja'
      }, null, {id: 3, number: '3', isReserved: true, orientation: 'east'}, {
        id: 4,
        number: '4',
        orientation: 'west'
      }, null, {id: 5, number: 5}, {id: 6, number: 6}],
      [{id: 7, number: 1, isReserved: true}, {id: 8, number: 2, isReserved: true}, null, {
        id: 9,
        number: '3',
        isReserved: true,
        orientation: 'east',
        tooltip: 'asdfk'
      }, {id: 10, number: '4', orientation: 'west'}, null, {id: 11, number: 5}, {id: 12, number: 6}],
      [{id: 13, number: 1}, {id: 14, number: 2}, null, {
        id: 15,
        number: 3,
        isReserved: true,
        orientation: 'east'
      }, {id: 16, number: '4', orientation: 'west'}, null, {id: 17, number: 5}, {id: 18, number: 6}],
      [{id: 19, number: 1}, {id: 20, number: 2}, null, {id: 21, number: 3, orientation: 'east'}, {
        id: 22,
        number: '4',
        orientation: 'west'
      }, null, {id: 23, number: 5}, {id: 24, number: 6}],
      [{id: 25, number: 1, isReserved: true}, {id: 26, number: 2, orientation: 'east'}, null, {
        id: 27,
        number: '3',
        isReserved: true
      }, {id: 28, number: '4', orientation: 'west'}, null, {id: 29, number: 5, tooltip: 'asdf'}, {
        id: 30,
        number: 6,
        isReserved: true
      }]
    ]
    const {loading} = this.state
    return (
      <div>
        <h1>Seat Picker</h1>
        <div style={{marginTop: '200px'}}>
          <SeatPicker
            addSeatCallback={this.addSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{multiline: true}}
          />
        </div>
      </div>
    )
  }
}
