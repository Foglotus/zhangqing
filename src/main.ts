import { createApp } from 'vue'
import './style.css'
import App from './App.vue'



const app = createApp(App)

app.directive('drag', function (el) {
    const oDiv = el // 当前元素
    document.onselectstart = () => {
      return false
    }
    oDiv.onmousedown = e => { // 鼠标按下时的鼠标所在的X，Y坐标
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft
      const disY = e.clientY - oDiv.offsetTop
      document.onmousemove = e => {
        // 通过事件委托，计算移动的距离
        // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = e => { // 鼠标抬起，清空之前所在的位置，新拖拽的位置已生成并赋值
        document.onmousemove = null
        document.onmouseup = null
      }
      // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
      return false
    }
  }
)

app.mount('#app')

