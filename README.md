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

## Usage

```jsx
import React, { Component } from 'react'

import SeatPicker from 'react-seat-picker'

class Example extends Component {
  render () {
    const rows = [
      [{ number: 1 }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2, isReserved: true}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3, isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1 }, {number: 2}, {number: 3}, null, {number: '4'}, {number: 5}, {number: 6}],
      [{ number: 1, isReserved: true }, {number: 2}, {number: '3', isReserved: true}, null, {number: '4'}, {number: 5}, {number: 6, isReserved: true}]
  ];
    return (
        <SeatPicker rows={rows} maxReservableSeats={3} alpha />
    )
  }
}
```

## License

MIT © [Rogger794](https://github.com/Rogger794)
