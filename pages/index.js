import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { SketchPicker } from "react-color";
import { proxy, useSnapshot } from "valtio";

import {
  Bounds,
  useGLTF,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";

const state = proxy({
  current: null,
  items: {
    body: "#ffffff",
    wheels: "#ffffff",
    glass: "#ffffff",
    rubber: "#ffffff",
    numbers: "#ffffff",
    lights: "#ffffff",
    // lighting: 0.5,
    // zooming: true,
  },
});

const Car = ({ ...props }) => {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.005;
  });

  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF("/car6.glb");
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      onClick={() => (state.current = null)}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[34.56, 137.34, 11.04]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[0.04, -0.07, 16.3]} rotation={[0, 0, -1.92]} />
          </group>
          <group
            position={[54.77, -2.07, -284.31]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[0.01, 0.08, 199.33]} />
          </group>
        </group>
      </group>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[40.51, 74.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[-43.61, 22.63, 55.69]}>
              <mesh
                geometry={nodes.car_body_body_0001_1.geometry}
                material={materials["body.001"]}
                material-color={snap.items.body}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_2.geometry}
                material={materials["glass.001"]}
                material-color={snap.items.glass}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_3.geometry}
                material={materials["rubber.001"]}
                material-color={snap.items.rubber}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_4.geometry}
                material={materials["chest.001"]}
                // material-color={"green"}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_5.geometry}
                material={materials["interior.001"]}
                // material-color={"green"}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_6.geometry}
                material={materials["chrome.001"]}
                // material-color={"green"}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_7.geometry}
                material={materials["lights.001"]}
                material-color={snap.items.lights}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_8.geometry}
                material={materials["number.001"]}
                material-color={snap.items.numbers}
                receiveShadow
                castShadow
              />
              <mesh
                geometry={nodes.car_body_body_0001_9.geometry}
                material={materials["wheels.001"]}
                material-color={snap.items.wheels}
                receiveShadow
                castShadow
              />
            </group>
          </group>
          <group
            position={[34.56, 137.34, 11.04]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[0.04, -0.07, 16.3]} rotation={[0, 0, -1.92]} />
          </group>
          <group
            position={[54.77, -2.07, -284.31]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <group position={[0.01, 0.08, 199.33]}>
              <group position={[0.24, -7.28, 149.23]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

function Picker() {
  const snap = useSnapshot(state);
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1111",
        top: "50px",
        left: "50px",
        display: state.current ? "flex" : "none",
      }}
    >
      <SketchPicker
        color={snap.items[snap.current]}
        onChange={(color) => {
          state.items[snap.current] = color.hex;
        }}
      />
      <h1 style={{ marginLeft: "15px" }}>{snap.current}</h1>
    </div>
  );
}

export default function App() {
  const parts = ["body", "wheels", "lights", "numbers", "rubber", "glass"];

  return (
    <>
      <div className="con-error">
        <img src="/error.png" alt="" />
        <h3>Something went wrong.</h3>
        <p className="sorry">
          sorry,this site can only be open in the large screens
        </p>
      </div>

      <div className="con-canvas">
        {/* <h3 className="intro_header">change the color of car</h3> */}

        <p className="copyright">Developed by ibrahem magdy</p>

        <div className="controls">
          <h3>change the colors of car </h3>
          <div className="colors">
            {parts.map((e) => {
              return (
                <div
                  key={Math.random()}
                  onClick={() => {
                    state.current = e;
                  }}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>

        <div onClick={() => (state.current = null)}>
          <Canvas
            style={{ width: "100%", height: "100vh" }}
            camera={{
              position: [0, 500, 1000],
              rotation: [0, (4 / 180) * Math.PI, 0],
              fov: 50,
            }}
            dpr={[1, 2]}
            shadows
          >
            <ambientLight intensity={0.7} />
            <spotLight
              intensity={0.5}
              angle={0.1}
              penumbra={1}
              position={[10, 15, 10]}
              castShadow
            />
            <directionalLight intensity={0.5} />
            <Suspense fallback={null}>
              {/* <CameraControls /> */}

              <Bounds fit clip margin={1.2}>
                <Car rotation={[0, 0, 0]} />
                <ContactShadows
                  rotation-x={Math.PI / 2}
                  position={[0, -0.8, 0]}
                  opacity={0.25}
                  width={10}
                  height={10}
                  blur={1.5}
                  far={0.8}
                />
              </Bounds>
            </Suspense>
            <OrbitControls
              makeDefault
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              enableZoom={false}
            />
          </Canvas>
        </div>
        <Picker />
      </div>
    </>
  );
}
