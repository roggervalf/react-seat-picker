import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "./Row";
import Seat from "./Seat";
import Blank from "./Blank";

export class SeatPicker extends Component {
  static defaultProps = {
    addSeatCallback: ({ row, number, id }, addCb) => {
      console.log(`Added seat ${number}, row ${row}, id ${id}`);
      addCb(row, number, id);
    },
    removeSeatCallback: ({ row, number, id }, removeCb) => {
      console.log(`Removed seat ${number}, row ${row}, id ${id}`);
      removeCb(row, number);
    },
    maxReservableSeats: 0,
  };

  constructor(props) {
    super(props);
    const { rows } = props;
    const { selectedSeats, size } = this.getAlreadySelectedSeats();
    this.state = {
      tooltipOverrides: {},
      selectedSeats: selectedSeats,
      size: size,
      rowLength: Math.max.apply(
        null,
        rows.map(row => row.length)
      ),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.maxReservableSeats < state.size) {
      let sum = 0;
      const selectedSeats = {};
      for (const array in state.selectedSeats) {
        if (
          sum + state.selectedSeats[array].length <
          props.maxReservableSeats
        ) {
          selectedSeats[array] = state.selectedSeats[array].slice(0);
        } else {
          const dif = props.maxReservableSeats - sum;
          selectedSeats[array] = state.selectedSeats[array].slice(0, dif);
          return {
            selectedSeats: selectedSeats,
            size: props.maxReservableSeats,
          };
        }
        sum = sum + state.selectedSeats[array].length;
      }
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.selectedSeats !== this.state.selectedSeats ||
      this.props.loading !== nextProps.loading
    );
  }

  getAlreadySelectedSeats = () => {
    let selectedSeats = {};
    let size = 0;
    const { maxReservableSeats, alpha, selectedByDefault } = this.props;
    if (selectedByDefault) {
      this.props.rows.forEach((row, index) => {
        const rowNumber = alpha
          ? String.fromCharCode("A".charCodeAt(0) + index)
          : (index + 1).toString();
        row.forEach((seat, index) => {
          if (seat && seat.isSelected) {
            const seatAlreadySelected = this.includeSeat(
              selectedSeats,
              rowNumber,
              seat.number
            );
            if (size < maxReservableSeats && !seatAlreadySelected) {
              selectedSeats = this.addSeat(
                selectedSeats,
                rowNumber,
                seat.number,
                seat.id
              );
              size = size + 1;
            }
          }
        });
      });
    }
    return { selectedSeats, size };
  };

  includeSeat = (selectedSeats, row, number) => {
    if (selectedSeats[row]) {
      return !!selectedSeats[row][number];
    }
    return false;
  };

  addSeat = (selectedSeats, row, number, id) => {
    if (selectedSeats[row]) {
      if (!selectedSeats[row][number]) {
        selectedSeats[row][number] = id;
      }
    } else {
      selectedSeats[row] = {};
      selectedSeats[row][number] = id;
    }
    return { ...selectedSeats };
  };

  deleteSeat = (row, number) => {
    const { selectedSeats } = this.state;
    if (selectedSeats[row]) {
      delete selectedSeats[row][number];
      if (!Object.keys(selectedSeats[row]).length > 0) {
        delete selectedSeats[row];
      }
    }
    return { ...selectedSeats };
  };

  addTooltip = (tooltipOverrides, row, number, tooltip) => {
    if (!tooltipOverrides[row]) {
      tooltipOverrides[row] = {};
    }
    tooltipOverrides[row][number] = tooltip;
    return { ...tooltipOverrides };
  };

  acceptSelection = (row, number, id, tooltip) => {
    const { selectedSeats, tooltipOverrides, size } = this.state;
    const { maxReservableSeats } = this.props;
    if (size < maxReservableSeats) {
      this.setState({
        tooltipOverrides: this.addTooltip(
          tooltipOverrides,
          row,
          number,
          tooltip
        ),
        selectedSeats: this.addSeat(selectedSeats, row, number, id),
        size: size + 1,
      });
    }
  };

  acceptDeselection = (row, number, tooltip) => {
    const { size, tooltipOverrides } = this.state;
    this.setState({
      tooltipOverrides: this.addTooltip(tooltipOverrides, row, number, tooltip),
      selectedSeats: this.deleteSeat(row, number),
      size: size - 1,
    });
  };

  selectSeat = (row, number, id) => {
    const { selectedSeats } = this.state;
    const size = this.state.size;
    const {
      maxReservableSeats,
      addSeatCallback,
      removeSeatCallback,
      continuous,
    } = this.props;
    const seatAlreadySelected = this.includeSeat(selectedSeats, row, number);

    if (seatAlreadySelected) {
      removeSeatCallback({ row, number, id }, this.acceptDeselection);
    } else {
      if (size < maxReservableSeats) {
        addSeatCallback({ row, number, id }, this.acceptSelection);
      } else if (continuous) {
        const auxRow = Object.keys(selectedSeats)[0];
        const auxNumber = Object.keys(selectedSeats[auxRow])[0];
        addSeatCallback(
          { row, number, id },
          this.acceptSelection,
          {
            row: auxRow,
            number: auxNumber,
            id: selectedSeats[auxRow][auxNumber],
          },
          this.acceptDeselection
        );
      }
    }
  };

  render() {
    return (
      <div className="seat-content">
        <div className={this.props.loading ? "loader" : null} />
        <div className="seat-picker">{this.renderRows()}</div>
      </div>
    );
  }

  renderRows() {
    const { selectedSeats: seats } = this.state;
    const { alpha, visible } = this.props;
    return this.props.rows.map((row, index) => {
      const rowNumber = alpha
        ? String.fromCharCode("A".charCodeAt(0) + index)
        : (index + 1).toString();
      const isSelected = !!seats[rowNumber];
      const props = {
        visible,
        rowNumber,
        isSelected,
        selectedSeat: null,
        seats: row,
        // key: `Row${rowNumber}`,
        selectSeat: this.selectSeat,
      };

      return (
        <Row key={index} {...props}>
          {this.renderSeats(row, rowNumber, isSelected)}{" "}
        </Row>
      );
    });
  }

  renderSeats(seats, rowNumber, isRowSelected) {
    const { selectedSeats, size, rowLength, tooltipOverrides } = this.state;
    const { maxReservableSeats, continuous } = this.props;
    const blanks = new Array(
      rowLength - seats.length > 0 ? rowLength - seats.length : 0
    ).fill(0);
    const row = seats.map((seat, index) => {
      if (seat === null) return <Blank key={index} />;
      const isSelected =
        isRowSelected &&
        this.includeSeat(selectedSeats, rowNumber, seat.number);
      let tooltip = seat.tooltip;
      if (
        tooltipOverrides[rowNumber] &&
        tooltipOverrides[rowNumber][seat.number] != null
      ) {
        tooltip = tooltipOverrides[rowNumber][seat.number];
      }
      const props = {
        isSelected,
        orientation: seat.orientation,
        isReserved: seat.isReserved,
        tooltip,
        isEnabled: size < maxReservableSeats || continuous,
        selectSeat: this.selectSeat.bind(this, rowNumber, seat.number, seat.id),
        seatNumber: seat.number,
        tooltipProps: this.props.tooltipProps,
      };
      return <Seat key={index} {...props} />;
    });
    if (blanks.length > 0) {
      blanks.forEach((blank, index) => {
        row.push(<Blank key={row.length + index + 1} />);
      });
    }
    return row;
  }
}

SeatPicker.propTypes = {
  addSeatCallback: PropTypes.func,
  alpha: PropTypes.bool,
  visible: PropTypes.bool,
  continuous: PropTypes.bool,
  selectedByDefault: PropTypes.bool,
  removeSeatCallback: PropTypes.func,
  maxReservableSeats: PropTypes.number,
  rows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isReserved: PropTypes.bool,
        tooltip: PropTypes.string,
        isSelected: PropTypes.bool,
      })
    )
  ).isRequired,
  tooltipProps: PropTypes.object,
  loading: PropTypes.bool,
};
