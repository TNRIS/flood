import React, { PropTypes } from 'react'
import { Menu, MenuItem } from 'react-mdl'
import classnames from 'classnames'

import CustomPropTypes from '../CustomPropTypes'

const BaseLayerMenu = ({ baseLayers, activeBaseId, onLayerClick, target }) => (
  <Menu target={target}>
    {baseLayers.map(layer => (
      <MenuItem
        key={layer.id}
        className={classnames({'active': activeBaseId === layer.id})}
        onClick={() => onLayerClick(layer.id)}>
        {layer.text}
      </MenuItem>
    ))}
  </Menu>
)

BaseLayerMenu.propTypes = {
  baseLayers: PropTypes.arrayOf(CustomPropTypes.baseLayer).isRequired,
  activeBaseId: PropTypes.string.isRequired,
  onLayerClick: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired
}

export default BaseLayerMenu
