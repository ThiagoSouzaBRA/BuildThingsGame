class Cube extends ObjectPrototype {
    constructor(x = 0, y = 0, z = 0, sX = 1, sY = 1, sZ = 1, rX = 0, rY = 0, rZ = 0) {

        const color = 0xffffff;
        const geometry = new THREE.BoxGeometry(sX, sY, sZ);
        const material = new THREE.MeshStandardMaterial({ color: new THREE.Color().setStyle(color) });
        const object = new THREE.Mesh(geometry, material);
        
        object.customID = "Cube"

        super(object, x, y, z, rX, rY, rZ, color)       

    }

}