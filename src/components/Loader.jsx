import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

// Register the plugin only once
if (!gsap.core.globals().SplitText) {
    gsap.registerPlugin(SplitText);
}

export const Loader = () => {
    const loaderRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(() => {
        // Split title into characters
        const titleSplit = new SplitText(titleRef.current, { type: "chars" });

        // Create timeline for smoother control
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Animate text characters
        tl.fromTo(
            titleSplit.chars,
            { yPercent: 100, opacity: 0 },
            {
                yPercent: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.5,
                stagger: 0.05,
                ease: "expo.out",
            }
        );

        // Fade out loader after delay
        tl.to(
            loaderRef.current,
            {
                opacity: 0,
                duration: 1,
                delay: 1.2,
                onComplete: () => {
                    // Hide completely after fade
                    loaderRef.current.style.display = "none";
                },
            },
            "-=0.3"
        );

        // Cleanup SplitText instance when unmounted
        return () => titleSplit.revert();
    }, []);

    return (
        <div
            ref={loaderRef}
            id="loader"
            className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden 
                 bg-green-200 dark:bg-black pointer-events-none"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                className="h-40 w-40 logo-loader"
            >
                <path d="M479.8 576L384.7 576L276.5 421.5L276.5 512.6L190.1 576L92.4 576L92.4 93.8L132.9 64L240.9 64L364.6 240.1L364.6 127.4L451 64L548.7 64L548.7 525.5L479.8 576zM103.2 99.3L103.2 560L175.2 507.1L175.2 258L390.7 565.6L475.5 565.6L527.9 527.4L449.6 527.4L133.5 76.9L103.3 99.2zM185.7 565.9L265.7 507.1L265.7 406.1L185.9 291.7L185.9 512.6L113.3 565.9L185.6 565.9L185.6 565.9zM145 74.8L455.6 517.4L538 517.4L538 74.8L458.2 74.8L458.2 392.4L235.3 74.8L145 74.8zM375.4 255.6L447.4 358.4L447.4 79.9L375.4 132.9L375.4 255.6z" />
            </svg>

            <div className="h-10 overflow-hidden mt-2">
                <div
                    ref={titleRef}
                    id="title"
                    className="font-orbit text-2xl uppercase font-semibold tracking-widest 
                     text-green-950 dark:text-green-100"
                >
                    neotask
                </div>
            </div>
        </div>
    );
};
