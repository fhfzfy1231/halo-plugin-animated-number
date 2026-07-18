import { definePlugin } from '@halo-dev/ui-shared'

export default definePlugin({
  components: {},
  routes: [],
  extensionPoints: {
    'default:editor:extension:create': async () => {
      const { default: AnimatedNumberExtension } = await import('./editor/animated-number-extension')
      return [AnimatedNumberExtension]
    },
  },
})
