import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Row from './Row'
import { Map, Set } from 'immutable'
import Seat from './Seat'
import Blank from './Blank'

export class SeatPicker extends Component {
  static propTypes = {
    addSeatCallback: PropTypes.func,
    alpha: PropTypes.bool,
    visible: PropTypes.bool,
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
    ).isRequired,
    seatWidth: PropTypes.number
  }

  static defaultProps = {
    addSeatCallback: (row, number, id) => {
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
    },
    removeSeatCallback: (row, number, id) => {
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
    },
    seatWidth: 30,
    maxReservableSeats: 0
  }

  getAlreadySelectedSeats = () => {
    let selectedSeats = Map()
    let size = 0
    const {
      maxReservableSeats,
      alpha
    } = this.props
    this.props.rows.forEach((row, index) => {
      const rowNumber = alpha
        ? String.fromCharCode('A'.charCodeAt(0) + index)
        : (index + 1).toString()
      row.forEach((seat) => {
        if (seat && seat.isSelected) {
          const seatAlreadySelected = selectedSeats.get(rowNumber, Set()).includes(seat.number)
          if (size < maxReservableSeats && !seatAlreadySelected) {
            selectedSeats = selectedSeats.mergeDeep({[rowNumber]: Set([seat.number])})
            size = size + 1
          }
        }
      })
    })
    return {selectedSeats, size}
  }

  constructor (props) {
    super(props)
    const { rows, seatWidth, visible } = props
    const {selectedSeats, size} = this.getAlreadySelectedSeats()
    this.state = {
      selectedSeats: selectedSeats,
      size: size,
      width:
        seatWidth *
        ((visible ? 1 : 0) + Math.max.apply(null, rows.map(row => row.length)))
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.selectedSeats !== this.state.selectedSeats
  }

  selectSeat = (row, number, id) => {
    const { selectedSeats, size } = this.state
    const {
      maxReservableSeats,
      addSeatCallback,
      removeSeatCallback
    } = this.props
    const seatAlreadySelected = selectedSeats.get(row, Set()).includes(number)

    if (size < maxReservableSeats && !seatAlreadySelected) {
      this.setState(
        {
          selectedSeats: selectedSeats.mergeDeep({ [row]: Set([number]) }),
          size: size + 1
        },
        () => addSeatCallback(row, number, id)
      )
    } else if (selectedSeats.has(row) && seatAlreadySelected) {
      this.setState(
        {
          selectedSeats: selectedSeats.update(row, seats =>
            seats.delete(number)
          ),
          size: size - 1
        },
        () => removeSeatCallback(row, number, id)
      )
    }
  }

  render () {
    const { width } = this.state
    return <div className='SeatPicker' style={{ width }}>{this.renderRows()}</div>
  }

  renderRows () {
    const { selectedSeats: seats } = this.state
    const { alpha, visible } = this.props
    return this.props.rows.map((row, index) => {
      const rowNumber = alpha
        ? String.fromCharCode('A'.charCodeAt(0) + index)
        : (index + 1).toString()
      const isSelected = !seats.get(rowNumber, Set()).isEmpty()
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
        <Row {...props}>{this.renderSeats(row, rowNumber, isSelected)}</Row>
      )
    })
  }

  renderSeats (seats, rowNumber, isRowSelected) {
    const { selectedSeats, size } = this.state
    const { maxReservableSeats } = this.props
    return seats.map((seat, index) => {
      if (seat === null) return <Blank key={index} />
      const isSelected =
        isRowSelected && selectedSeats.get(rowNumber).includes(seat.number)
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
  }
}
