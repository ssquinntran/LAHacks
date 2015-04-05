// some global variables
var camera, scene, renderer;
var elements = [];
 
// some default values
var bulletSize = 10;
var offset = 300;
var defPos = 800;
 
// Initialize the scene and threadpool
function init() {
 
    // create a queuepool with 6 queues
    queuepool = new Pool(3);
    queuepool.init();
 
    // create a scene and a camera
    scene = new THREE.Scene();
 
    //Three.PerspectiveCamera()
    camera = new THREE.PerspectiveCamera( 55, 1,  0.1, 10000, -2000, 10000 );
    // position the camera
    camera.position.y = defPos+200;
    camera.position.z = defPos;
    camera.position.x = defPos;
 
    // and add to the scene
    scene.add(camera);
 
    // setup the renderer and attach to canvas
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( 600, 600 );
 
    $("#webglcontainer").append(renderer.domElement);
 
    animate();
}
// the animation loop. This rotates the camera around the central point.
function animate() {
    var timer = Date.now() * 0.0008;
    camera.position.x = (Math.cos( timer ) * defPos);
    camera.position.z = (Math.sin( timer ) * defPos) ;
    camera.lookAt( scene.position );
 
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
}
// add a cube to the grid. The cube is positioned base on the x,y values. The color
// is used to define the material, and the luminance is used for the height of the element.
function addElement(x,y, color, lumin) {
    var voxelPosition2 = voxelPosition = new THREE.Vector3();
    voxelPosition2.x = bulletSize*x -offset ;
    voxelPosition2.z = bulletSize*y -offset ;
    voxelPosition2.y = 200 + ((lumin/(255))*200)/2;
 
    var geometry = new THREE.CubeGeometry( bulletSize, (lumin/(255))*200, bulletSize );
    var mat = new THREE.MeshBasicMaterial( { color: color, shading: THREE.NoShading, wireframe: false, transparent: false })
 
    var cube = new THREE.Mesh(geometry,mat);
    cube.position=voxelPosition2;
 
    // add to elements list and to scene
    elements.push(cube);
    scene.add(cube);
}
function callback(event) {
 
    var wp = event.data;
 
    // get the colors
    var colors = wp.result;
 
    var color = "0x" +
        ("0" + parseInt(colors[0][0],10).toString(16)).slice(-2) +
        ("0" + parseInt(colors[0][1],10).toString(16)).slice(-2) +
        ("0" + parseInt(colors[0][2],10).toString(16)).slice(-2);
 
 
     var lumin = colors[0][0] * .3 + colors[0][1] * .59 + colors[0][2] * .11;
 
     addElement(wp.x,wp.y, color, lumin);
}