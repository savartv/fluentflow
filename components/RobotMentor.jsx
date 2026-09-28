'use client';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

function RobotModel() {
  const { scene } = useGLTF('/robot.glb');
  const ref = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const targetY = pointer.x * 0.55;
    const targetX = -pointer.y * 0.3;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
    ref.current.position.y = -2 + Math.sin(t * 1.4) * 0.08;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.03;
  });

  return (
    <group position={[0, 0, 0]}>
      <primitive
        ref={ref}
        object={scene}
        position={[0, -4, 0]}
        scale={30}
      />
    </group>
  );
}

function ChatBubbles({ onFullVisible }) {
  const messages = [
    { text: "Hey! Ready to practice?", delay: 800 },
    { text: 'Try saying: "What\'s up?"', delay: 3200 },
    { text: 'Perfect! 🎉 You sound native!', delay: 6200 },
    { text: 'Want another phrase?', delay: 9200 },
  ];
  const [visible, setVisible] = useState([]);
  const lastWasVisible = useRef(false);

  useEffect(() => {
    let timers = [];
    const start = () => {
      setVisible([]);
      timers = messages.map((m, i) =>
        setTimeout(() => setVisible((p) => [...p, i]), m.delay)
      );
    };
    start();
    const loop = setInterval(start, 16000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, []);

  useEffect(() => {
    const lastVisible = visible.includes(messages.length - 1);
    if (lastVisible !== lastWasVisible.current) {
      lastWasVisible.current = lastVisible;
      onFullVisible(lastVisible);
    }
  }, [visible, onFullVisible]);

  return (
    <div className="chat-bubbles">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`chat-bubble-mini ${visible.includes(i) ? 'show' : ''}`}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}

function StreakBar() {
  return (
    <div className="streak-bar">
      <span className="streak-fire">🔥</span>
      <span className="streak-label">Your streak: <b>7 days</b></span>
    </div>
  );
}

export default function RobotMentor() {
  const [mounted, setMounted] = useState(false);
  const [hideRobot, setHideRobot] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="robot-wrap"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 1.4s ease, transform 1.4s ease',
      }}
    >
      <div
        className="robot-stage"
        style={{
          opacity: hideRobot ? 0 : 1,
          transform: hideRobot ? 'scale(0.85)' : 'scale(1)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        <div className="robot-glow"></div>
        <Canvas
          camera={{ position: [0, 0.3, 5.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 5, 4]} intensity={1.2} />
            <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#88ccff" />
            <pointLight position={[0, 2, 3]} intensity={1.5} color="#88ccff" />
            <RobotModel />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <ChatBubbles onFullVisible={setHideRobot} />
      <StreakBar />
    </div>
  );
}