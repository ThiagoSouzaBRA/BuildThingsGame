class Plane extends ObjectPrototype {
    constructor(x = 0, y = 0, z = 0, sX = 1, sY = 1, sZ = 1, rX = 0, rY = 0, rZ = 0) {

        const color = 0x808080;
        const planeGeometry = new THREE.PlaneGeometry(x, y);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color().setStyle(color) });
        const object = new THREE.Mesh(planeGeometry, planeMaterial);
        object.customID = "Plane"
        
        super(object, x, y, z, rX, rY, rZ, color)       

    }
    
}