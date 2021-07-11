import { GLTFLoader } from './vendor/GLTFLoader.js';
    import { OrbitControls } from './vendor/OrbitControls.js';
    let scene, camera, renderer, controls, model, hemiLight;

    function init () {
      scene = new THREE.Scene();
    //   scene.background = new THREE.Color(0xffffff);
      camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1,20000);
      camera.position.set(0,0,20);

      hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820,4);
      scene.add(hemiLight);

    //   scene.add(new THREE.AxesHelper(500));

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setClearColor( 0x000000, 0 ); // the default
      renderer.setSize(window.innerWidth-20,window.innerHeight-20);
      renderer.toneMapping = THREE.ReinhardToneMapping;

      controls = new OrbitControls(camera,renderer.domElement);
      controls.noPan = true;
      controls.maxDistance = controls.minDistance = 20;  
      controls.noKeys = true;
      controls.noRotate = true;
      controls.noZoom = true;
      
      var canvas = renderer.domElement;
      document.body.appendChild(canvas);

      new GLTFLoader().load('img/xbox.gltf', result => {
        model = result.scene;
        scene.add(model);
        animate();
      })

      var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      var pointOfIntersection = new THREE.Vector3();
      canvas.addEventListener("mousemove", onMouseMove, false);
      
      function onMouseMove(event){
        mouse.x = (( (event.clientX+450) / window.innerWidth ) - 0.5) * 4;
        mouse.y = - (( (event.clientY+150) / window.innerHeight ) - 0.5) * 4;
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, pointOfIntersection);
        model.lookAt(pointOfIntersection);
      }
  
      renderer.setAnimationLoop(() => {
        if (resize(renderer)) {
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
      });
  
      function resize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      animate();
    }

    function animate(){
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    init();


 