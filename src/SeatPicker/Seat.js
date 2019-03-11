import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
//import '../styles/index.scss'

export default class Seat extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    isReserved: PropTypes.bool
    //seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    //   selectSeat: PropTypes.func.isRequired
  }

  static defaultProps = {
    isSelected: false
  }

  handleClick = () => {
    !this.props.isReserved && this.props.selectSeat()
  }

  render () {
    const { isSelected, isEnabled, isReserved, orientation } = this.props
    const className = cx(
      'Seat',
      { 'Seat--selected': isSelected },
      { 'Seat--enabled': !isSelected && isEnabled && !isReserved },
      { 'Seat--reserved': isReserved },
      { [`Seat--${orientation ? orientation : 'north'}`]: true }
    )
    return (
      <div className={className} onClick={this.handleClick}>
        <span className='SeatNumber'>{this.props.seatNumber}</span>
      </div>
    )
  }
}

// Seat.propTypes = {
//   isSelected: PropTypes.bool,
//   isReserved: PropTypes.bool
//   //seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   //   selectSeat: PropTypes.func.isRequired
// }

// const S = Seat

// export default S
