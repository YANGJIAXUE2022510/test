import * as THREE from '../../libs/three.weapp.js'
import { OrbitControls } from '../../jsm/controls/OrbitControls'
import getRGBLoader from '../../jsm/loaders/RGBELoader.js';
Page({
  data: {
    canvasId: null
  },
  onLoad: function () {
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        let canvasId = res[0].node._canvasId
        const canvas = THREE.global.registerCanvas(canvasId, res[0].node)
        let { RGBELoader } = getRGBLoader(THREE)
        this.setData({ canvasId })

        const camera = new THREE.PerspectiveCamera(70, canvas.width / canvas.height,   0.1,
        1000);
        camera.position.z =0.1;
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xAAAAAA);
        const renderer = new THREE.WebGLRenderer();
      
        const controls = new OrbitControls(camera, renderer.domElement);
 
        
       // 添加球
const geometry = new THREE.SphereGeometry(5, 32, 32);
const loader = new RGBELoader();
loader.load("./house03.hdr", (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.geometry.scale(1, 1, -1); // 反转过来  本来是图片包裹在球上的
  scene.add(sphere);
});

 
 
  const contros = new OrbitControls(camera, renderer.domElement);
  contros.enableDamping = true;
 
  function render() {
    canvas.requestAnimationFrame(render);
    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }

  render()
      })
  },
  onUnload: function () {
    THREE.global.unregisterCanvas(this.data.canvasId)
  },
  touchStart(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
  },
 
})
