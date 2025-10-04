"use client";

import Matter, {
    Bodies,
    Engine,
    Events,
    Mouse,
    MouseConstraint,
    Render,
    Runner,
    World,
} from "matter-js";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const CapsulePhysics = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    useEffect(() => {
        if (!sceneRef.current) return;

        const engine = Engine.create();
        const world = engine.world;
        world.gravity.y = 1;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Renderer
        const render = Render.create({
            element: sceneRef.current,
            engine,
            options: {
                width,
                height,
                wireframes: false,
                background: theme === "dark" ? "#232321" : "#077551",
            },
        });

        // Boundaries with extra thickness to prevent escape
        const thickness = 100;
        const wallOptions = { 
            isStatic: true, 
            restitution: 0.8,
            friction: 0.1
        };
        
        World.add(world, [
            Bodies.rectangle(width / 2, height + thickness / 2, width + 200, thickness, wallOptions),
            Bodies.rectangle(width / 2, -thickness / 2, width + 200, thickness, wallOptions),
            Bodies.rectangle(-thickness / 2, height / 2, thickness, height + 200, wallOptions),
            Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + 200, wallOptions),
        ]);

        // 🔹 Helper function to create SVG data URL from Lucide icon
        const createIconSVG = (iconPath: string, color: string = "#ffffff") => {
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`;
            return `data:image/svg+xml;base64,${btoa(svg)}`;
        };

        // 🔹 Social icons with Lucide icons
        const socials = [
            { 
                icon: createIconSVG('<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'),
                url: "https://instagram.com",
                label: "Instagram"
            },
            { 
                icon: createIconSVG('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>'),
                url: "https://linkedin.com",
                label: "LinkedIn"
            },
            { 
                icon: createIconSVG('<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'),
                url: "https://youtube.com",
                label: "YouTube"
            },
            { 
                icon: createIconSVG('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
                url: "https://facebook.com",
                label: "Facebook"
            },
            {
                icon: createIconSVG('<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 8.5V15a3.5 3.5 0 1 1-3.5-3.5"/><path d="M16 8.5c-1.38 0-2.5-1.12-2.5-2.5V4"/>'),
                url: "https://tiktok.com",
                label: "TikTok"
            },
        ];

        type SocialBody = Matter.Body & { url: string };

        let socialBodies: SocialBody[] = [];
        if (window.innerWidth > 600) {
            socialBodies = socials.map((s, i) => {
            const body = Bodies.circle(200 + i * 250, 50, 60, {
                restitution: 0.6,
                friction: 0.05,
                frictionAir: 0.01,
                density: 0.04,
                render: {
                sprite: { texture: s.icon, xScale: 1, yScale: 1 },
                },
            }) as SocialBody;
            body.url = s.url;
            return body;
            });
        }

        World.add(world, socialBodies);

        // 🔹 Beans (doubled to 40)
        const beans: Matter.Body[] = [];
        for (let i = 0; i < 40; i++) {
            const bean = Bodies.circle(
                Math.random() * width, 
                Math.random() * (height * 0.6), 
                30, 
                {
                    restitution: 0.7,
                    friction: 0.05,
                    frictionAir: 0.01,
                    density: 0.02,
                    render: {
                        sprite: {
                            texture: "/images/greenBean.svg",
                            xScale: 1,
                            yScale: 1
                        },
                    },
                }
            );
            beans.push(bean);
        }
        World.add(world, beans);

        // Mouse
        const mouse = Mouse.create(render.canvas);

        (mouse.element as HTMLElement).removeEventListener("wheel", (mouse as Matter.Mouse & { mousewheel?: EventListener }).mousewheel as EventListener);
        (mouse.element as HTMLElement).removeEventListener("touchmove", (mouse as Matter.Mouse & { touchmove?: EventListener }).touchmove as EventListener);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: { 
                stiffness: 0.2, 
                render: { visible: false } 
            },
        });
        World.add(world, mouseConstraint);

        // ✅ Track mouse position and hover state
        let mousePosition = { x: width / 2, y: height / 2 };
        let hovering = false;
        
        const handleMouseMove = (e: MouseEvent) => {
            const rect = render.canvas.getBoundingClientRect();
            mousePosition = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            
            // Check if hovering over social icons
            const clicked = Matter.Query.point(socialBodies, mousePosition);
            hovering = clicked.length > 0;
            render.canvas.style.cursor = hovering ? "pointer" : "default";
        };
        
        render.canvas.addEventListener("mousemove", handleMouseMove);

        // ✅ Apply forces on each tick based on mouse proximity
        Events.on(engine, "beforeUpdate", () => {
            const allBodies = [...socialBodies, ...beans];
            
            allBodies.forEach((body) => {
                // Keep bodies within bounds
                if (body.position.x < -50 || body.position.x > width + 50 || 
                    body.position.y < -50 || body.position.y > height + 50) {
                    Matter.Body.setPosition(body, {
                        x: Math.max(100, Math.min(width - 100, body.position.x)),
                        y: Math.max(100, Math.min(height - 100, body.position.y))
                    });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });
                }

                // Apply repulsion force based on mouse proximity
                const dx = body.position.x - mousePosition.x;
                const dy = body.position.y - mousePosition.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200 && dist > 0) {
                    const forceMagnitude = (200 - dist) / 200 * 0.0008;
                    Matter.Body.applyForce(body, body.position, {
                        x: (dx / dist) * forceMagnitude,
                        y: (dy / dist) * forceMagnitude,
                    });
                }
            });
        });

        // ✅ Click opens link
        Events.on(mouseConstraint, "mouseup", (event) => {
            const mousePos = event.mouse.position;
            const clicked = Matter.Query.point(socialBodies, mousePos);
            if (clicked.length > 0) {
                const body = clicked[0] as SocialBody;
                if (body.url) {
                    window.open(body.url, "_blank");
                }
            }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // ✅ Optimized render loop with cached images
        const imageCache = new Map<string, HTMLImageElement>();
        
        const loadImage = (src: string): HTMLImageElement => {
            if (!imageCache.has(src)) {
                const img = new Image();
                img.src = src;
                imageCache.set(src, img);
            }
            return imageCache.get(src)!;
        };

        const ctx = render.context;
        let animationId: number;
        
        const renderLoop = () => {
            const bodies = Matter.Composite.allBodies(world);
            animationId = requestAnimationFrame(renderLoop);

            ctx.clearRect(0, 0, width, height);

            for (const body of bodies) {
                if (body.render.sprite && body.render.sprite.texture) {
                    const img = loadImage(body.render.sprite.texture);

                    if (img.complete) {
                        ctx.save();
                        ctx.translate(body.position.x, body.position.y);
                        ctx.rotate(body.angle);

                        let w: number, h: number;
                        if (body.circleRadius) {
                            w = h = body.circleRadius * 2;
                        } else {
                            const bounds = body.bounds;
                            w = bounds.max.x - bounds.min.x;
                            h = bounds.max.y - bounds.min.y;
                        }

                        ctx.drawImage(img, -w / 2, -h / 2, w, h);
                        ctx.restore();
                    }
                }
            }
        };
        
        renderLoop();

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            render.canvas.removeEventListener("mousemove", handleMouseMove);
            Render.stop(render);
            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
            imageCache.clear();
        };
    }, [theme]);

    return <div ref={sceneRef} id="contact" className={`w-full h-screen ${theme === 'dark' ? 'bg-secondary' : 'bg-greenSecondary'}`} />;
};

export default CapsulePhysics;
