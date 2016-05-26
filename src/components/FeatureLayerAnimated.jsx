import React, { PropTypes } from 'react'
import { Checkbox, Spinner } from 'react-mdl'

import FeatureLayer from './FeatureLayer'

export default class FeatureLayerAnimated extends FeatureLayer {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.array,
    icon: PropTypes.string,
    legend: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.string,
    text: PropTypes.string,
  }

  statusIndicatorFromProps({ active, status }) {
    let indicator
    if (active && status !== 'ready') {
      indicator = <Spinner />
    }
    else {
      indicator = <Checkbox checked={active} readOnly />
    }
    return indicator
  }

}
