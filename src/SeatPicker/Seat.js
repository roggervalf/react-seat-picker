import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Seat extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    isReserved: PropTypes.bool,
    isEnabled: PropTypes.bool,
    orientation: PropTypes.oneOf(['north', 'south', 'east', 'west' ]),
    seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectSeat: PropTypes.func.isRequired
  }

  static defaultProps = {
    isSelected: false
  }

  handleClick = () => {
    !this.props.isReserved && this.props.selectSeat()
  }

  render () {
    const { isSelected, isEnabled, isReserved, orientation } = this.props
    const className = 'Seat' +
        (isSelected ? ' Seat--selected' : '') +
        (!isSelected && isEnabled && !isReserved ? ' Seat--enabled' : '') +
        (isReserved ? ' Seat--reserved' : '') +
        (` Seat--${orientation ? orientation : 'north'}`)
    return (
      <div className={className} onClick={this.handleClick}>
        <span className='SeatNumber'>{this.props.seatNumber}</span>
      </div>
    )
  }
}
