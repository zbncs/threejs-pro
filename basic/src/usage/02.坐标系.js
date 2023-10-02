import { 
  Scene, 
  PerspectiveCamera, 
  BoxGeometry, 
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  AxesHelper
} from 'three'

// 引入控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// 创建一个场景
const scene = new Scene()

// 创建相机

/**
 * fov: 视野角度；视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，它的单位是角度(与弧度区分开)。
 * 
 * aspect: 宽高比；比如说，当你在一个宽屏电视上播放老电影时，可以看到图像仿佛是被压扁的。
 * 
 * near：近截面
 * 
 * far：远截面
 * 
 * 当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。
 * 或许现在你不用担心这个值的影响，但未来为了获得更好的渲染性能，你将可以在你的应用程序里去设置它。
 * 
 */
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight)

camera.position.set(0, 0, 10)

// 
scene.add(camera)

// 创建物体
const geometry = new BoxGeometry(1, 1, 1)

// 物体的材质
const material = new MeshBasicMaterial({color: 0xff00ff})
// 物体
const cube = new Mesh(geometry, material)

// 物体添加到场景中
scene.add(cube)

// 创建渲染器
const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webGL的canvas添加到body
document.body.appendChild(renderer.domElement)


// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标系: 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.(逆时针)
const axesHelper = new AxesHelper(10)
scene.add(axesHelper)

// 渲染函数
function render() {
  // 渲染
  renderer.render(scene, camera)

  // 下一帧执行渲染
  requestAnimationFrame(render)
}

render()
