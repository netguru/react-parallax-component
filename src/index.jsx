import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import './styles.css';
import styles from './styles.css.json';

export default class ParallaxComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = throttle(this.handleScroll.bind(this), 10);
    this.parallaxElement = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getTop() {
    const { top } = this.props;

    return top.indexOf('%') > -1
      ? window.innerHeight * (top.replace('%', '') / 100)
      : parseInt(top, 10);
  }

  handleScroll() {
    const { speed } = this.props;

    const top = this.getTop();

    // Top positons
    const pageTop = window.pageYOffset;
    const newTop = (top - (pageTop * speed));

    // Set new top position
    this.parallaxElement.style.top = `${newTop}px`;
  }

  render() {
    return (
      <div
        className={styles.container}
        ref={(ref) => { this.parallaxElement = ref; }}
        style={Object.assign({}, this.props)}
      >
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

ParallaxComponent.propTypes = {
  children: PropTypes.element,
  speed: PropTypes.number,

  // Style
  width: PropTypes.string,
  height: PropTypes.string,
  top: PropTypes.string,
  left: PropTypes.number,
  right: PropTypes.string,
};

ParallaxComponent.defaultProps = {
  children: null,
  width: 'auto',
  height: 'auto',
  top: 0,
  left: 'inherit',
  right: 'inherit',
  speed: -0.03,
};
