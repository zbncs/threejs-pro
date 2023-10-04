import { 
  Scene, 
  PerspectiveCamera, 
  BoxGeometry, 
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  Color,
} from 'three'

// 引入控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


/**
 * 
 * 利用顶点绘制几何体（绘制threejs中不存在的几何体，有现成的可以使用）
 * 
 */


// 创建一个场景
const scene = new Scene()

// 创建相机
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight)
camera.position.set(10, 10, 10)

scene.add(camera)

/**
 * 三角形
 */

for (let i = 0; i < 50; i++) {
  // 创建===几何体===
  const geometry = new BufferGeometry()
  const vertices = new Float32Array(9)

  // 每一个顶点是三个值，三个顶点需要9个
  for (let j = 0; j < 9; j++) {
    // 顶点
    vertices[j] = Math.random() * 10 - 5
    
    
  }
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  // 物体的材质
  const color = new Color(Math.random(), Math.random(), Math.random())
  const material = new MeshBasicMaterial({color, opacity: Math.random(), transparent: true})
  // 物体
  const cube = new Mesh(geometry, material)

  // 物体添加到场景中
  scene.add(cube)

}


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

