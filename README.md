# react-seat-picker

> 

[![NPM](https://img.shields.io/npm/v/react-seat-picker.svg)](https://www.npmjs.com/package/react-seat-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

<!-- This is the [Demo Page](https://rogger794.github.io/react-seat-picker/). -->

[![Edit SeatPicker](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nwk09p7o34?fontsize=14)

## About

This is a fork of [react-seatmap](https://www.npmjs.com/package/react-seatmap) whithout dependencies and some extra properties.

## Install

```bash
npm install --save react-seat-picker
```

Or

```bash
yarn add react-seat-picker
```

## Usage

```jsx
import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'

class Example extends Component {
  state = {
    loading:false
  }
  addSeatCallback=(row, number, id, cb)=>{
    this.setState({
      loading:true
    },async()=>{
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      cb(row,number)
      this.setState({ loading: false })
    })
  }
  render () {
    const rows = [
      [{ id:1, number: 1, isSelected: true }, { id:2, number: 2}, null, { id:3, number: '3', isReserved: true, orientation: 'east'}, { id:4, number: '4', orientation: 'west'}, null, { id:5, number: 5}, { id:6, number: 6}],
      [{ id:7, number: 1, isReserved: true }, { id:8, number: 2, isReserved: true}, null, { id:9, number: '3', isReserved: true, orientation: 'east'}, { id:10, number: '4', orientation: 'west'}, null, { id:11, number: 5}, { id:12, number: 6}],
      [{ id:13, number: 1 }, { id:14, number: 2}, null, { id:15, number: 3, isReserved: true, orientation: 'east'}, { id:16, number: '4', orientation: 'west'}, null, { id:17, number: 5}, { id:18, number: 6}],
      [{ id:19, number: 1 }, { id:20, number: 2}, null, { id:21, number: 3, orientation: 'east'}, { id:22, number: '4', orientation: 'west'}, null, { id:23, number: 5}, { id:24, number: 6}],
      [{ id:25, number: 1, isReserved: true }, { id:26, number: 2, orientation: 'east'}, null, { id:27, number: '3', isReserved: true}, { id:28, number: '4', orientation: 'west'}, null, { id:29, number: 5}, { id:30, number: 6, isReserved: true}]
    ]
    const {loading}=this.state
    return (
      <div>
        <h1>Seat Picker</h1>
        <SeatPicker
          addSeatCallback={this.addSeatCallback}
          rows={rows}
          maxReservableSeats={3}
          alpha
          visible
          selectedByDefault
          loading={loading}
         />
      </div>
    )
  }
}
```

### Props

Name | Type | Default | Required|Description
---- | ----- | ------- | ------ | -----------
`alpha` | boolean | `false` | `false` | Enumerate your rows using letters (`true`), otherwise using numbers (`false`).
`visible` | boolean | `false` | `false` | Shows the row numbers (`true`), otherwise they are hidden (`false`).
`loading` | boolean | `false` | `false` | Shows a white mask on the seatpicker.
`selectedByDefault` | boolean | `false` | `false` | Allow to have already selected seats (`true`), otherwise (`false`) they aren´t going to be checked by their isSelected property.
`maxReservableSeats` | number | 0 | `false` | Limits the number of selectable seats.
`addSeatCallback` | function | (row, number, id, cb) => {console.log( `Added seat ${number}, row ${row}, id ${id}`); cb(row,number)} | `false` | Should be customized as you need. Remember to use cb(row,number) for accepting the selection, otherwise ommit it.
`removeSeatCallback` | function | (row, number, id, cb) => {console.log( `Removed seat ${number}, row ${row}, id ${id}`); cb(row,number)} | `false` | Should be customized as you need. Remember to use cb(row,number) for accepting the deselection, otherwise ommit it.
`rows` | array | - | `true` | Array of arrays of json. (See next section).

### Seats properties

Each json in rows prop could be `null` (empty seat) or has these properties.

Name | Type | Default | Required|Description
---- | ----- | ------- | ------ | -----------
`id` | number or string | undefined | `false` | It identify a seat.
`number` | number or string | undefined | `false` | It will be showed inside seat.
`isSelected` | boolean | `false` | `false` | It will be checked in case selectedByDefault is true.
`isReserved` | boolean | `false` | `false` | Disable the option of click it.
`orientation` | string | north | `false` | Define the position of an specific seat (north, south, east, west).

## License

MIT © [Rogger794](https://github.com/Rogger794)
