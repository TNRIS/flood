function noop() {
  return null
}
require.extensions['.css'] = noop
require.extensions['.mss'] = noop
require.extensions['.sql'] = noop
require.extensions['.png'] = noop
