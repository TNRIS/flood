import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CustomPropTypes from '../CustomPropTypes'

const BaseLayerMenu = ({ baseLayers, activeBaseId, onLayerClick, target }) => (
  <ul className="vertical menu" target={target} valign="bottom" align="right">
    {baseLayers.map(layer => (
      <li key={layer.id}>
        <div
        className={classnames({'active': activeBaseId === layer.id})}
        onClick={() => onLayerClick(layer.id)}>
        {layer.text}
        </div>
      </li>
    ))}
  </ul>
)

BaseLayerMenu.propTypes = {
  baseLayers: PropTypes.arrayOf(CustomPropTypes.baseLayer).isRequired,
  activeBaseId: PropTypes.string.isRequired,
  onLayerClick: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired
}

export default BaseLayerMenu
