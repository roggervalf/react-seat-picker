import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RowNumber extends Component {
  static propTypes = {
    rowNumber: PropTypes.string,
    visible: PropTypes.bool,
  };

  render() {
    return this.props.visible ? (
      <div className="seat-picker__row__number">{this.props.rowNumber}</div>
    ) : null;
  }
}
