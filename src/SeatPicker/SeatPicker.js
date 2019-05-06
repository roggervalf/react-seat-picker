import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './Row'
import Seat from './Seat'
import Blank from './Blank'

export class SeatPicker extends Component {
  static propTypes = {
    addSeatCallback: PropTypes.func,
    alpha: PropTypes.bool,
    visible: PropTypes.bool,
    selectedByDefault: PropTypes.bool,
    removeSeatCallback: PropTypes.func,
    maxReservableSeats: PropTypes.number,
    rows: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          isReserved: PropTypes.bool,
          isSelected: PropTypes.bool
        })
      )
    ).isRequired
  }

  static defaultProps = {
    addSeatCallback: (row, number, id) => {
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
    },
    removeSeatCallback: (row, number, id) => {
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
    },
    maxReservableSeats: 0
  }

  constructor (props) {
    super(props)
    const { rows } = props
    const {selectedSeats, size} = this.getAlreadySelectedSeats()
    this.state = {
      selectedSeats: selectedSeats,
      size: size,
      rowLength: (Math.max.apply(null, rows.map(row => row.length)))
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.maxReservableSeats < state.size) {
      let sum = 0
      let selectedSeats = {}
      for (let array in state.selectedSeats) {
        if (
          sum + state.selectedSeats[array].length <
          props.maxReservableSeats
        ) {
          selectedSeats[array] = state.selectedSeats[array].slice(0)
        } else {
          const dif = props.maxReservableSeats - sum
          selectedSeats[array] = state.selectedSeats[array].slice(0, dif)
          return {
            selectedSeats: selectedSeats,
            size: props.maxReservableSeats
          }
        }
        sum = sum + state.selectedSeats[array].length
      }
    }
    return null
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.selectedSeats !== this.state.selectedSeats
  }

  getAlreadySelectedSeats = () => {
    let selectedSeats = {}
    let size = 0
    const {
      maxReservableSeats,
      alpha,
      selectedByDefault
    } = this.props
    if (selectedByDefault) {
      this.props.rows.forEach((row, index) => {
        const rowNumber = alpha
          ? String.fromCharCode('A'.charCodeAt(0) + index)
          : (index + 1).toString()
        row.forEach((seat, index) => {
          if (seat && seat.isSelected) {
            const seatAlreadySelected = this.includeSeat(selectedSeats, rowNumber, seat.number)
            if (size < maxReservableSeats && !seatAlreadySelected) {
              selectedSeats = this.addSeat(selectedSeats, rowNumber, seat.number)
              size = size + 1
            }
          }
        })
      })
    }
    return {selectedSeats, size}
  }

  includeSeat=(selectedSeats, row, number) => {
    if (selectedSeats[row]) {
      return selectedSeats[row].includes(number)
    }
    return false
  }

  addSeat=(selectedSeats, row, number) => {
    if (selectedSeats[row]) {
      if (!selectedSeats[row].includes(number)) {
        selectedSeats[row].push(number)
      }
    } else {
      selectedSeats[row] = []
      selectedSeats[row].push(number)
    }
    return {...selectedSeats}
  }

  deleteSeat=(row, number) => {
    let { selectedSeats } = this.state
    if (selectedSeats[row]) {
      selectedSeats[row] = selectedSeats[row].filter((value) => {
        return value !== number
      })
      if (!selectedSeats[row].length > 0) {
        delete (selectedSeats[row])
      }
    }
    return {...selectedSeats}
  }

  selectSeat = (row, number, id) => {
    let { selectedSeats } = this.state
    const size = this.state.size
    const {
      maxReservableSeats,
      addSeatCallback,
      removeSeatCallback
    } = this.props
    const seatAlreadySelected = this.includeSeat(selectedSeats, row, number)

    if (size < maxReservableSeats && !seatAlreadySelected) {
      this.setState(
        {
          selectedSeats: this.addSeat(selectedSeats, row, number),
          size: size + 1
        },
        () => addSeatCallback(row, number, id)
      )
    } else if (selectedSeats[row] && seatAlreadySelected) {
      this.setState(
        {
          selectedSeats: this.deleteSeat(row, number),
          size: size - 1
        },
        () => removeSeatCallback(row, number, id)
      )
    }
  }

  render () {
    return <div className='seat-picker' >{this.renderRows()}</div>
  }

  renderRows () {
    const { selectedSeats: seats } = this.state
    const { alpha, visible } = this.props
    return this.props.rows.map((row, index) => {
      const rowNumber = alpha
        ? String.fromCharCode('A'.charCodeAt(0) + index)
        : (index + 1).toString()
      const isSelected = !!seats[rowNumber]
      const props = {
        visible,
        rowNumber,
        isSelected,
        selectedSeat: null,
        seats: row,
        key: `Row${rowNumber}`,
        selectSeat: this.selectSeat
      }

      return (
        <Row key={index} {...props}>{this.renderSeats(row, rowNumber, isSelected)} </Row>
      )
    })
  }

  renderSeats (seats, rowNumber, isRowSelected) {
    const { selectedSeats, size, rowLength } = this.state
    const { maxReservableSeats } = this.props
    const blanks = new Array((rowLength - seats.length) > 0 ? (rowLength - seats.length) : 0).fill(0)
    let row = seats.map((seat, index) => {
      if (seat === null) return <Blank key={index} />
      const isSelected =
        isRowSelected && this.includeSeat(selectedSeats, rowNumber, seat.number)
      const props = {
        isSelected,
        orientation: seat.orientation,
        isReserved: seat.isReserved,
        isEnabled: size < maxReservableSeats,
        selectSeat: this.selectSeat.bind(this, rowNumber, seat.number, seat.id),
        seatNumber: seat.number,
        key: index
      }
      return <Seat {...props} />
    })
    if (blanks.length > 0) {
      blanks.forEach((blank, index) => {
        row.push(<Blank key={row.length + index + 1} />)
      })
    }
    return row
  }
}
