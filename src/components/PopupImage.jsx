import React, { Component, PropTypes } from 'react'

//export class PopupImage extends Component {
  //constructor(props) {
    //super(props)
  //}

  //render() {
    //const { src, updatePopup, popupWidth } = this.props

    //const imgStyle = {
      //maxWidth: (popupWidth - 9.5) + 'px !important'
    //}

    //return (
      //<div className="info__image">
        //hi
        //<img ref="image" src={src} style={imgStyle} onLoad={() => {updatePopup()}}  />
      //</div>
    //)
  //}
//}

export default class PopupImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    popupWidth: PropTypes.number,
    updatePopup: PropTypes.func,
  }

  componentDidUpdate() {
    // need to manually set graph image style property
    //   see: https://github.com/facebook/react/issues/1881
    // TLDR; !important is not important to React devs
    const width = this.props.popupWidth - 9.5 - 9.5 - 9.5 - 9.5

    this.refs.image.style.setProperty('max-width', `${width}px`, 'important')
    this.props.updatePopup()
  }

  render() {
    const { src, updatePopup, popupWidth } = this.props

    const imgStyle = {
      maxWidth: (popupWidth - 9.5) + 'px !important'
    }

    return (
      <div className="info__image">
        <img ref="image" src={src} style={imgStyle} onLoad={() => {updatePopup()}}  />
      </div>
    )
  }
}

