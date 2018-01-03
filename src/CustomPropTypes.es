import PropTypes from 'prop-types'

const CustomPropTypes = {
  baseLayer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.object
  })
}

export default CustomPropTypes
