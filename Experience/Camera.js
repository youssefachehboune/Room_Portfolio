import * as THREE from "three";
import Experience from "./Experience.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        
        // set position of camera
        
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    
        //console.log(this.scene); 
    }
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -10,
            10
        );
        this.scene.add(this.orthographicCamera);

        // CameraHelper
        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        this.scene.add(this.helper );

        // GridHelper
        const size = 20;
        const divisions = 20;

        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper );

        // AxesHelper
        const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
    }
    
    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        //this.controls.enableRotate = true;
    }

    resize(){
        // Updating prespectiveCamera on Resize

        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        
        // Updating orthgraphicCamera on Resize
        
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();

    }

    update(){
        //console.log(this.perspectiveCamera.position)
        this.controls.update();

        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
}