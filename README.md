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
  const rows = [
        [{ number: 1, isSelected: true }, {number: 2}, null, {number: '3', isReserved: true, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
        [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, null, {number: '3', isReserved: true, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
        [{ number: 1 }, {number: 2}, null, {number: 3, isReserved: true, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
        [{ number: 1 }, {number: 2}, null, {number: 3, orientation: 'east'}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6}],
        [{ number: 1, isReserved: true }, {number: 2, orientation: 'east'}, null, {number: '3', isReserved: true}, {number: '4', orientation: 'west'}, null, {number: 5}, {number: 6, isReserved: true}]
      ]
    return (
        <SeatPicker rows={rows} maxReservableSeats={3} alpha visible selectedByDefault />
    )
  }
}
```

### Props

Name | Type | Default | Required|Description
---- | ----- | ------- | ------ | -----------
`alpha` | boolean | `false` | `false` | Enumerate your rows using letters (`true`), otherwise using numbers (`false`).
`visible` | boolean | `false` | `false` | Shows the row numbers (`true`), otherwise they are hidden (`false`).
`selectedByDefault` | boolean | `false` | `false` | Allow to have already selected seats (`true`), otherwise (`false`) they aren´t going to be checked by their isSelected property.
`maxReservableSeats` | number | 0 | `false` | Limits the number of selectable seats.
`addSeatCallback` | function | (row, number, id) => {console.log( `Added seat ${number}, row ${row}, id ${id}`)} | `false` | Should be customized as you need.
`removeSeatCallback` | function | (row, number, id) => {console.log( `Removed seat ${number}, row ${row}, id ${id}`)} | `false` | Should be customized as you need.
`rows` | array | - | `true` | Array of arrays of json. (See next section).

### Seats properties

Each json in rows prop could be `null` (empty seat) or has these properties.

Name | Type | Default | Required|Description
---- | ----- | ------- | ------ | -----------
`number` | number or string | undefined | `false` | It will be showed inside seat.
`isSelected` | boolean | `false` | `false` | It will be checked in case selectedByDefault is true.
`isReserved` | boolean | `false` | `false` | Disable the option of click it.
`orientation` | string | north | `false` | Define the position of an specific seat.

## License

MIT © [Rogger794](https://github.com/Rogger794)
