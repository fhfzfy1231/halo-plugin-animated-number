import AnimatedNumberView from '@/components/AnimatedNumberView.vue'
import {
  Node,
  VueNodeViewRenderer,
  mergeAttributes,
  ToolboxItem,
  type ExtensionOptions,
  type Editor,
} from '@halo-dev/richtext-editor'
import { markRaw } from 'vue'
import MdiCounter from '~icons/mdi/counter'

const AnimatedNumberExtension = Node.create<ExtensionOptions>({
  name: 'animatedNumber',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      content: { default: 'XXXXXX' },
      fontSize: { default: 48 },
      color: { default: '#16a34a' },
      fontWeight: { default: 700 },
      align: { default: 'center' },
      duration: { default: 1500 },
      width: { default: '100%' },
    }
  },

  addOptions() {
    return {
      ...this.parent?.(),
      getCommandMenuItems() {
        return {
          priority: 120,
          icon: markRaw(MdiCounter),
          title: '滚动数字',
          keywords: ['数字', '滚动', '计数', '日期', 'number', 'counter'],
          command: ({ editor }: { editor: Editor }) => {
            editor.chain().focus().insertContent({ type: 'animatedNumber' }).run()
          },
        }
      },
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 120,
          component: markRaw(ToolboxItem),
          props: {
            editor,
            icon: markRaw(MdiCounter),
            title: '滚动数字',
            description: '数字、百分比、金额和日期滚动效果',
            action: () => {
              editor.chain().focus().insertContent({ type: 'animatedNumber' }).run()
            },
          },
        }
      },
      getDraggable() {
        return true
      },
    }
  },

  parseHTML() {
    return [{ tag: 'animated-number' }]
  },

  renderHTML({ HTMLAttributes }) {
    const style = [
      'box-sizing:border-box',
      'display:block',
      'max-width:100%',
      'overflow:hidden',
      'line-height:1.2',
      'white-space:nowrap',
      `font-size:${Number(HTMLAttributes.fontSize || 48)}px`,
      `color:${HTMLAttributes.color || '#16a34a'}`,
      `font-weight:${HTMLAttributes.fontWeight || 700}`,
      `text-align:${HTMLAttributes.align || 'center'}`,
      `width:${HTMLAttributes.width || '100%'}`,
    ].join(';')

    return [
      'animated-number',
      mergeAttributes(HTMLAttributes, { style }),
      String(HTMLAttributes.content || '0'),
    ]
  },

  addNodeView() {
    return VueNodeViewRenderer(AnimatedNumberView)
  },
})

export default AnimatedNumberExtension
