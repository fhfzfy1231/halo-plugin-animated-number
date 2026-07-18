<script setup lang="ts">
import { NodeViewWrapper, nodeViewProps } from '@halo-dev/richtext-editor'
import { computed } from 'vue'

const props = defineProps(nodeViewProps)

const previewStyle = computed(() => ({
  color: props.node.attrs.color,
  fontSize: `${props.node.attrs.fontSize}px`,
  fontWeight: String(props.node.attrs.fontWeight),
  textAlign: props.node.attrs.align,
  width: props.node.attrs.width,
}))

function update(name: string, value: string | number) {
  props.updateAttributes({ [name]: value })
}
</script>

<template>
  <node-view-wrapper class="animated-number-editor" :class="{ selected }">
    <div class="animated-number-preview" :style="previewStyle">{{ node.attrs.content }}</div>
    <div v-if="selected" class="animated-number-controls" contenteditable="false">
      <label class="wide">内容<input :value="node.attrs.content" @input="update('content', ($event.target as HTMLInputElement).value)" /></label>
      <label>字号<input type="number" min="12" max="200" :value="node.attrs.fontSize" @input="update('fontSize', Number(($event.target as HTMLInputElement).value))" /></label>
      <label>颜色<input type="color" :value="node.attrs.color" @input="update('color', ($event.target as HTMLInputElement).value)" /></label>
      <label>字重<select :value="node.attrs.fontWeight" @change="update('fontWeight', Number(($event.target as HTMLSelectElement).value))"><option value="400">常规</option><option value="500">中等</option><option value="600">半粗</option><option value="700">粗体</option><option value="900">特粗</option></select></label>
      <label>对齐<select :value="node.attrs.align" @change="update('align', ($event.target as HTMLSelectElement).value)"><option value="left">左</option><option value="center">居中</option><option value="right">右</option></select></label>
      <label>宽度<input :value="node.attrs.width" placeholder="100% / 480px / auto" @input="update('width', ($event.target as HTMLInputElement).value)" /></label>
      <label>动画(ms)<input type="number" min="200" max="10000" step="100" :value="node.attrs.duration" @input="update('duration', Number(($event.target as HTMLInputElement).value))" /></label>
    </div>
  </node-view-wrapper>
</template>

<style scoped>
.animated-number-editor{box-sizing:border-box;margin:.75rem 0;max-width:100%;border:1px solid transparent;border-radius:10px;padding:10px}.animated-number-editor.selected{border-color:#16a34a;background:#f8fff9}.animated-number-preview{box-sizing:border-box;max-width:100%;overflow:hidden;line-height:1.2;white-space:nowrap}.animated-number-controls{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:12px;padding:12px;border-radius:8px;background:#fff;box-shadow:0 2px 10px #00000012}.animated-number-controls label{display:flex;flex-direction:column;gap:4px;color:#52606d;font-size:12px}.animated-number-controls .wide{grid-column:1/-1}.animated-number-controls input,.animated-number-controls select{box-sizing:border-box;width:100%;height:34px;border:1px solid #d8dee4;border-radius:6px;padding:0 8px;background:#fff;color:#17212b}
</style>
