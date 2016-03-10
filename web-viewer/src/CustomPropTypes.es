
import { PropTypes } from 'react'

const CustomPropTypes = {
  baseLayer: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    tileUrl: PropTypes.string,
    attribution: PropTypes.string
  })
}

export default CustomPropTypes