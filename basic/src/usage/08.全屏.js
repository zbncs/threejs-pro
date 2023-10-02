import { 
  Scene, 
  PerspectiveCamera, 
  BoxGeometry, 
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  AxesHelper,
} from 'three'

// 引入控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

// 创建一个场景
const scene = new Scene()

// 创建相机
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.set(10, 10, 10)

scene.add(camera)

// 创建物体
const geometry = new BoxGeometry(1, 1, 1)

// 物体的材质
const material = new MeshBasicMaterial({color: 0xff00ff})
// 物体
const cube = new Mesh(geometry, material)

// 位置移动==================================================
// cube.position.set(5, 2, 2)

// 缩放==========================================================================
cube.scale.set(0.5, 1, 2)

// 旋转=================================================
// cube.rotation.set(1/2 * Math.PI, 0, 0)
cube.rotation.set(0, 1/2 * Math.PI, 0)
// cube.rotation.set(0, 0, 1/2 * Math.PI)

// 物体添加到场景中
scene.add(cube)

// 创建渲染器
const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webGL的canvas添加到body
document.body.appendChild(renderer.domElement)


// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 设置阻尼
/**
 * 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。  
 * 请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
 */
controls.enableDamping = true

// 添加坐标系: 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.(逆时针)
const axesHelper = new AxesHelper(10)
scene.add(axesHelper)

// gsap ===================================================
gsap.to(cube.position, {
  x: 8, duration: 6, ease: 'power1.inOut',
  repeat: -1,
  yoyo: true,
  onComplete: () => {
    console.log('complete');
  }, onStart: () => {
    console.log('start');
}})

gsap.to(cube.rotation, {x: 2 * Math.PI, duration: 6, ease: 'power1.inOut', repeat: -1, yoyo: true})

// 渲染函数
function render() {
  controls.update()
  // 渲染
  renderer.render(scene, camera)

  // 下一帧执行渲染
  requestAnimationFrame(render)
}

render()

// 监听画面大小变化
window.addEventListener('resize', () => {
  // 更新摄像机
  camera.aspect = window.innerWidth / window.innerHeight

  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix()

  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 更新设备的像素比
  renderer.setPixelRatio(window.devicePixelRatio)


})

window.addEventListener('dblclick', () => {
  const fullscreenEle = document.fullscreenElement

  if (fullscreenEle) {
    document.exitFullscreen()
  } else {
    renderer.domElement.requestFullscreen()
  }
  
})


