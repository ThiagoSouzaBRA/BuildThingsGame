class ObjectPrototype {
    constructor(object = new THREE.Object3D(), x = 0, y = 0, z = 0, rX = 0, rY = 0, rZ = 0, color = 0xffffff) {
        this.pos = { x: x, y: y, z: z };
        this.rotation = { x: rX, y: rY, z: rZ }
        this.color = color
        this.object = object
        this.scale = { x: 1, y: 1, z: 1 }

        this.object.castShadow = true;
        this.object.castShadow = true; // Permite que projete sombra
        this.object.receiveShadow = true; // Permite que receba sombra


        this.object.position.x = this.pos.x;
        this.object.position.y = this.pos.y;
        this.object.position.z = this.pos.z;

        this.object.rotation.x = this.rotation.x;
        this.object.rotation.y = this.rotation.y;
        this.object.rotation.z = this.rotation.z;
        
    }

    getMesh() {
        return this.object;
    }

    setPosition(x, y, z) {
        this.object.position.x = x ?? this.object.position.x;
        this.object.position.y = y ?? this.object.position.y;
        this.object.position.z = z ?? this.object.position.z;
        return this;
    }

    setRotation(x, y, z) {
        this.object.rotation.x = x ?? this.object.rotation.x;
        this.object.rotation.y = y ?? this.object.rotation.y;
        this.object.rotation.z = z ?? this.object.rotation.z;
        return this;
    }

    setColor(color){
        if(!color) return
        this.color = color;
        this.getMesh().material.color.set(color)
        return this;
    }

    setSize(x, y, z){
        this.scale.x = x ?? this.scale.x;
        this.scale.y = y ?? this.scale.y;
        this.scale.z = z ?? this.scale.z;
        this.object.scale.set(this.scale.x, this.scale.y, this.scale.z)
        return this;
    }
    
    getPositionVector3(){
        return new THREE.Vector3(
            this.object.position.x,
             this.object.position.y, 
             this.object.position.z
            )
    }

    addForce(x, y, z){
        let velForce = 1
        this.object.position.x += x ?? 0
        this.object.position.y += y ?? 0
        this.object.position.z += z ?? 0
    }

}