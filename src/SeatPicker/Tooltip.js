import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Tooltip extends Component {
  static defaultProps = {
    place: "top",
    effect: "solid",
    multiline: false,
    delayHide: 0,
    delayShow: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      content: "",
      position: { top: 0, left: 0 },
    };
    this.tooltipRef = React.createRef();
    this.hideTimeout = null;
    this.showTimeout = null;
  }

  componentDidMount() {
    // Find elements with data-tip attribute and add event listeners
    this.updateDataTipElements();
  }

  componentWillUnmount() {
    // Clean up event listeners and timeouts
    this.removeAllEventListeners();
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    if (this.showTimeout) clearTimeout(this.showTimeout);
  }

  updateDataTipElements = () => {
    const elements = document.querySelectorAll("[data-tip]");
    elements.forEach((element) => {
      element.addEventListener("mouseenter", this.handleMouseEnter);
      element.addEventListener("mouseleave", this.handleMouseLeave);
    });
  };

  removeAllEventListeners = () => {
    const elements = document.querySelectorAll("[data-tip]");
    elements.forEach((element) => {
      element.removeEventListener("mouseenter", this.handleMouseEnter);
      element.removeEventListener("mouseleave", this.handleMouseLeave);
    });
  };

  handleMouseEnter = (event) => {
    const content = event.target.getAttribute("data-tip");
    if (!content) return;

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    this.showTimeout = setTimeout(() => {
      const position = this.calculatePosition(event.target);
      this.setState({
        isVisible: true,
        content,
        position,
      });
    }, this.props.delayShow);
  };

  handleMouseLeave = () => {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }

    this.hideTimeout = setTimeout(() => {
      this.setState({ isVisible: false });
    }, this.props.delayHide);
  };

  calculatePosition = (target) => {
    const rect = target.getBoundingClientRect();
    const { place } = this.props;
    const tooltipWidth = 200; // Approximate tooltip width
    const tooltipHeight = 30; // Approximate tooltip height
    
    let top, left;

    switch (place) {
      case "top":
        top = rect.top - tooltipHeight - 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case "bottom":
        top = rect.bottom + 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - 10;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + 10;
        break;
      default:
        top = rect.top - tooltipHeight - 10;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
    }

    // Keep tooltip within viewport bounds
    const padding = 10;
    const maxLeft = window.innerWidth - tooltipWidth - padding;
    const maxTop = window.innerHeight - tooltipHeight - padding;

    left = Math.max(padding, Math.min(left, maxLeft));
    top = Math.max(padding, Math.min(top, maxTop));

    return { top, left };
  };

  render() {
    const { isVisible, content, position } = this.state;
    const { multiline, className = "", effect } = this.props;

    if (!isVisible || !content) return null;

    const tooltipClasses = [
      "react-tooltip",
      effect === "solid" ? "react-tooltip-solid" : "react-tooltip-float",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const style = {
      position: "fixed",
      top: position.top,
      left: position.left,
      zIndex: 9999,
      ...this.props.style,
    };

    return (
      <div
        ref={this.tooltipRef}
        className={tooltipClasses}
        style={style}
      >
        {multiline ? (
          <div
            dangerouslySetInnerHTML={{
              __html: content.replace(/\n/g, "<br />"),
            }}
          />
        ) : (
          content
        )}
      </div>
    );
  }
}

Tooltip.propTypes = {
  place: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  effect: PropTypes.oneOf(["solid", "float"]),
  multiline: PropTypes.bool,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};