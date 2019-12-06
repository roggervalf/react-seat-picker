import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

export default class Seat extends Component {
  static defaultProps = {
    isSelected: false,
  };

  handleClick = () => {
    !this.props.isReserved && this.props.selectSeat();
  };

  render() {
    const {
      isSelected,
      tooltip,
      isEnabled,
      isReserved,
      orientation,
    } = this.props;
    const className =
      "seat" +
      (isSelected ? " seat--selected" : "") +
      (!isSelected && isEnabled && !isReserved ? " seat--enabled" : "") +
      (isReserved ? " seat--reserved" : "") +
      ` seat--${!orientation ? "north" : orientation}`;
    return (
      <div data-tip={tooltip} className={className} onClick={this.handleClick}>
        {tooltip ? <ReactTooltip {...this.props.tooltipProps} /> : null}
        <span className="seat__number">{this.props.seatNumber}</span>
      </div>
    );
  }
}

Seat.propTypes = {
  isSelected: PropTypes.bool,
  isReserved: PropTypes.bool,
  tooltip: PropTypes.string,
  isEnabled: PropTypes.bool,
  orientation: PropTypes.oneOf(["north", "south", "east", "west"]),
  seatNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectSeat: PropTypes.func.isRequired,
  tooltipProps: PropTypes.object,
};
