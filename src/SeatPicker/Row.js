import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Seat from './Seat'
//import Blank from './Blank'
import RowNumber from './RowNumber'
import cx from 'classnames'
//import '../styles/index.scss'
import styles from '../styles/components/SeatPicker/Row.css'

export default class Row extends Component {
  static propTypes = {
    rowNumber: PropTypes.string //.isRequired
  }

  state = {
    over: false
  }

  handleMouseMove = over => {
    this.setState({ over })
  }

  render () {
    const { over } = this.state
    const { visible, rowNumber, isSelected } = this.props
    const bold = over || isSelected
    const className = cx(
      styles.Row,//'Row',
      { [styles['Row--enabled']]: !isSelected },//{ 'Row--enabled': !isSelected },
      { [styles['Row--selected']]: isSelected }//{ 'Row--selected': isSelected }
    )
      //console.log("hola",className)
      //import styles from "./capsule.css";

      // let className = cx(styles.base, {
      //   [styles.clickable]: this.props.clickable,
      //   [styles.withIcon]: !!this.props.icon
      // });
//return <div classNames={[styles.base, styles.clickable, styles.withIcon].join(' ')} />
    return (
      <div
        className={className}
        onMouseOut={this.handleMouseMove.bind(this, false)}
        onMouseOver={this.handleMouseMove.bind(this, true)}
      >
        <RowNumber rowNumber={rowNumber} bold={bold} visible={visible} />
        {this.props.children}
      </div>
    )
  }
}

// Row.propTypes = {
//   rowNumber: PropTypes.string //.isRequired
// }

// const R = Row

// export default R
