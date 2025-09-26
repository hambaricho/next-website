"use client";
import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }: React.PropsWithChildren<object>) {
  return (
    <ReactLenis root options={{ duration: 2 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;