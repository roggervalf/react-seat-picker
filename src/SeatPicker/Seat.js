import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
//import '../styles/index.scss'
//import '../styles/index.scss'
//import styles from '../styles/components/SeatPicker/Seat.scss'

export default class Seat extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    isReserved: PropTypes.bool,
    orientation: PropTypes.string,
    seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
    // const className = cx(
    //   styles.Seat,//'Seat',
    //   { [styles['Seat--selected']]: isSelected },//{ 'Seat--selected': isSelected },
    //   { [styles['Seat--enabled']]: !isSelected && isEnabled && !isReserved },//{ 'Seat--enabled': !isSelected && isEnabled && !isReserved },
    //   { [styles['Seat--reserved']]: isReserved },//{ 'Seat--reserved': isReserved },
    //   { [styles[`Seat--${orientation ? orientation : 'north'}`]]: true }//{ [`Seat--${orientation ? orientation : 'north'}`]: true }
    // )
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
