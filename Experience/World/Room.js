import * as THREE from "three";
import Experience from "../Experience.js";


export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.setModel();
        this.setAnimation();
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.rotation.y =  Math.PI ;
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[27])
        this.swim.play();
    }
    resize(){}
    update(){
        this.mixer.update(this.time.delta * 0.0007)
    }
}