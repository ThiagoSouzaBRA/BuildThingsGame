class Light extends ObjectPrototype {
    constructor(x = 0, y = 0, z = 0, rX = 0, rY = 0, rZ = 0) {

        const color = 0xffffff
        const intensity = 1;
        const object = new THREE.DirectionalLight(color, intensity)
        super(object, x, y, z, rX, rY, rZ, color)

        this.object.position.set(this.pos.x, this.pos.y, this.pos.z).normalize();

    }

}