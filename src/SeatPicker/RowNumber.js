import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import '../styles/index.scss'

export default class RowNumber extends Component {
  static propTypes = {
    rowNumber: PropTypes.string,
    bold: PropTypes.bool  
  }
  render () {
    const style = { fontWeight: this.props.bold ? 600 : 'normal' }
    return this.props.visible ? (
      <div style={style} className='RowNumber'>
        {this.props.rowNumber}
      </div>
    ) : null
  }
}

// RowNumber.propTypes = {
//   rowNumber: PropTypes.string,
//   bold: PropTypes.bool
// }

// const R = RowNumber

// export default R
