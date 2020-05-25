import React from 'react'
import PropTypes from 'prop-types'
import style from './button.module.scss'

function NextBtn (props) {
  return (
    <div className={style.nextBtnContainer} id='next-btn-container'>
      <span className={style.leftText}>{props.text}</span>
    </div>
  )
}

NextBtn.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  wrapperStyle: PropTypes.shape(),
  style: PropTypes.shape(),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node
  ])
}

NextBtn.defaultProps = {
  type: 'mobile',
  disabled: false,
  onClick: () => {},
  wrapperStyle: {},
  style: {},
  text: 'Button',
  size: ''
}

export default NextBtn
