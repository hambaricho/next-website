"use client";
import "./Spotlight.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Spotlight = () => {
  const spotlightRef = useRef(null);

  useGSAP(
    () => {
      const scrollTriggerInstances: ScrollTrigger[] = [];

      const initSpotlight = () => {
        new SplitType(".marquee-text-item h1", { types: "chars" });

        document
          .querySelectorAll(".marquee-container")
          .forEach((container, index) => {
            const marquee = container.querySelector(".marquee");

            const marqueeTrigger = gsap.to(marquee, {
              x: index % 2 === 0 ? "5%" : "-15%",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "150% top",
                scrub: true,
              },
              force3D: true,
            });

            if (marqueeTrigger.scrollTrigger) {
              scrollTriggerInstances.push(marqueeTrigger.scrollTrigger);
            }
          });

        ScrollTrigger.refresh();
      };

      const waitForOtherTriggers = () => {
        const existingTriggers = ScrollTrigger.getAll();
        const hasPinnedTrigger = existingTriggers.some(
          (trigger) => trigger.vars && trigger.vars.pin
        );

        if (hasPinnedTrigger || existingTriggers.length > 0) {
          setTimeout(initSpotlight, 300);
        } else {
          initSpotlight();
        }
      };

      setTimeout(waitForOtherTriggers, 100);

      return () => {
        scrollTriggerInstances.forEach((trigger) => trigger.kill());
      };
    },
    { scope: spotlightRef }
  );

  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="marquees">
        <div className="marquee-container" id="marquee-1">
          <div className="marquee">
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/1.jpeg" alt="" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Quality</h1>
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/2.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/3.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/4.jpeg" alt="" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-2">
          <div className="marquee">
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/5.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/6.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/7.jpeg" alt="" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Premium</h1>
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/8.jpeg" alt="" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-3">
          <div className="marquee">
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/9.jpeg" alt="" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Heritage</h1>
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/10.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/11.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/12.jpeg" alt="" />
            </div>
          </div>
        </div>

        <div className="marquee-container" id="marquee-4">
          <div className="marquee">
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/13.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/1.jpeg" alt="" />
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/3.jpeg" alt="" />
            </div>
            <div className="marquee-img-item marquee-text-item">
              <h1>Identity</h1>
            </div>
            <div className="marquee-img-item">
              <Image width={200} height={100} src="/images/gallery/5.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
