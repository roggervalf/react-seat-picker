# react-seat-picker

> 

[![NPM](https://img.shields.io/npm/v/react-seat-picker.svg)](https://www.npmjs.com/package/react-seat-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

This is the [Demo Page](https://rogger794.github.io/react-seat-picker/).

## About

This is a fork of [react-seatmap](https://www.npmjs.com/package/react-seatmap).

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
        <SeatPicker className='SeatPicker' rows={rows} maxReservableSeats={3} alpha visible selectedByDefault />
    )
  }
}
```

### Props

Name | Type |Default | Description
---- | ----- | ------- | -----------
`alpha` | boolean | false | Enumerate your rows using letters (`true`), otherwise using numbers (`false`).
`visible` | boolean | false | Shows the row numbers (`true`), otherwise they are hidden (`false`).
`maxReservableSeats` | number | 0 | Limits the number of selectable seats.
`seatWidth` | number | 30 | Should be customized as you need.

## License

MIT © [Rogger794](https://github.com/Rogger794)
