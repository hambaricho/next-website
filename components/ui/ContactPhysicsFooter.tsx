"use client";

import { useEffect, useRef } from "react";
import Matter, {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    Mouse,
    MouseConstraint,
    Events,
} from "matter-js";
import { useTheme } from "../context/ThemeContext";

const CapsulePhysics = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const {theme} = useTheme();

    useEffect(() => {
        if (!sceneRef.current) return;

        const engine = Engine.create();
        const world = engine.world;

        const width = window.innerWidth;
        const height = window.innerHeight / 1.5;

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

        // Boundaries
        const thickness = 50;
        World.add(world, [
            Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
            Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
            Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
            Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
        ]);

        // 🔹 Social icons as images
        const socials = [
            { img: "/images/insta.svg", url: "https://instagram.com" },
            { img: "/images/linkedin.svg", url: "https://linkedin.com" },
            { img: "/images/yt.svg", url: "https://youtube.com" },
            { img: "/images/tt.svg", url: "https://tiktok.com" },
            { img: "/images/fb.svg", url: "https://facebook.com" },
        ];

        type SocialBody = Matter.Body & { url: string };

        let socialBodies: SocialBody[] = [];
        if (window.innerWidth > 600) {
            socialBodies = socials.map((s, i) => {
            const body = Bodies.circle(200 + i * 200, 150, 80, {
                render: {
                sprite: { texture: s.img, xScale: 1, yScale: 1 },
                },
            }) as SocialBody;
            body.url = s.url;
            return body;
            });
        }

        World.add(world, socialBodies);

        // 🔹 Beans (bigger)
        const beans: Matter.Body[] = [];
        for (let i = 0; i < 20; i++) {
            const bean = Bodies.circle(Math.random() * width, Math.random() * height, 30, {
                render: {
                    sprite: {
                        texture: "/images/greenBean.svg",
                        xScale: 1,
                        yScale: 1
                    },
                },
                restitution: 0.9,
            });
            beans.push(bean);
        }
        World.add(world, beans);

        // Mouse
        const mouse = Mouse.create(render.canvas);

        (mouse.element as HTMLElement).removeEventListener("wheel", (mouse as Matter.Mouse & { mousewheel?: EventListener }).mousewheel as EventListener);
        (mouse.element as HTMLElement).removeEventListener("touchmove", (mouse as Matter.Mouse & { touchmove?: EventListener }).touchmove as EventListener);

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, render: { visible: false } },
        });
        World.add(world, mouseConstraint);

        // ✅ Physics on hover
        Events.on(render, "afterRender", () => {
            const mousePos = mouse.position;
            let hovering = false;

            socialBodies.forEach((body) => {
                const dx = body.position.x - mousePos.x;
                const dy = body.position.y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    hovering = true;
                    Matter.Body.applyForce(body, body.position, {
                        x: (dx / dist) * 0.0005,
                        y: (dy / dist) * 0.0005,
                    });
                }
            });

            render.canvas.style.cursor = hovering ? "pointer" : "default";
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

        // ✅ Draw loop (images cover the full body)
        const ctx = render.context;
        (function renderLoop() {
            const bodies = Matter.Composite.allBodies(world);
            requestAnimationFrame(renderLoop);

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, width, height);

            ctx.beginPath();
            for (const body of bodies) {
                if (body.render.sprite && body.render.sprite.texture) {
                    const img = new Image();
                    img.src = body.render.sprite.texture;

                    ctx.save();
                    ctx.translate(body.position.x, body.position.y);
                    ctx.rotate(body.angle);

                    // ✅ Scale image to body bounds
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
                } else {
                    // fallback fill
                    const vertices = body.vertices;
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let j = 1; j < vertices.length; j++) {
                        ctx.lineTo(vertices[j].x, vertices[j].y);
                    }
                    ctx.closePath();
                    ctx.fillStyle = body.render.fillStyle || "#ccc";
                    ctx.fill();
                }
            }
        })();

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(world, false);
            Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return <div ref={sceneRef} className="w-full bg-greenSecondary dark:bg-secondary" />;
};

export default CapsulePhysics;
