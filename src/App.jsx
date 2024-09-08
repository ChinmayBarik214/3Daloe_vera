import { Vector3, HemisphericLight, MeshBuilder, ArcRotateCamera, SceneLoader, CubeTexture, Color3, StandardMaterial, Texture } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import "@babylonjs/loaders/glTF"
import './App.css'

const onSceneReady = scene => {
  const canvas = scene.getEngine().getRenderingCanvas();
  const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  camera.position = new Vector3(5, 5, 5);

  // skybox
  var skybox = MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture("https://raw.githubusercontent.com/ChinmayBarik214/MeshesLibrary/main/skybox/skybox", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  const light = new HemisphericLight("light", new Vector3(0, 12, 0), scene);
  light.intensity = 2;

  SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/ChinmayBarik214/MeshesLibrary/main/", "aloe_vera.glb", scene, function (newMeshes) {
    newMeshes[1].position.y = -0.25; // aloe
    newMeshes[2].position.y = -0.25; // vase
  });  
}

// Will run on every frame render.
const onRender = scene => {
  return scene
}

function App() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='aloe_vera' />
  )
}

export default App;