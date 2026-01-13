import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HeaderProps {
    title: string;
    subtitle: string;
    activeIndex: number;
    coords?: string;
    onSectionClick?: (index: number) => void;
}

export const Header = ({ title, subtitle, activeIndex, coords, onSectionClick }: HeaderProps) => {
    const titleRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animation for title and subtitle update
        if (titleRef.current && subtitleRef.current) {
            const tl = gsap.timeline();

            // "Glitch" out old text
            tl.to([titleRef.current, subtitleRef.current], {
                skewX: 20,
                opacity: 0,
                x: -10,
                duration: 0.1,
                ease: "power4.in",
            })
                // Reset to new text state
                .set([titleRef.current, subtitleRef.current], {
                    skewX: -20,
                    x: 10,
                })
                // Glide in new text
                .to([titleRef.current, subtitleRef.current], {
                    opacity: 1,
                    x: 0,
                    skewX: 0,
                    duration: 0.3,
                    ease: "expo.out",
                    stagger: 0.03
                });

            // Flash effect for coordinates
            gsap.fromTo(".header-coord",
                { opacity: 1, color: "#fff" },
                { opacity: 0.8, color: "inherit", duration: 0.3 }
            );
        }
    }, [activeIndex]);

    const getBarColor = (index: number) => index === activeIndex
        ? "bg-primary shadow-[0_0_15px_theme(colors.primary/60%)] dark:bg-dark-primary dark:shadow-[0_0_15px_theme(colors.dark.primary/60%)] scale-y-125"
        : "bg-grid-line cursor-pointer hover:bg-primary/40 dark:bg-dark-grid-line dark:hover:bg-dark-primary/40 scale-y-100";

    return (
        <header className="w-full pt-6 md:pt-8 px-4 md:px-12 pb-4 flex-none z-20 relative">
            <div className="flex flex-col gap-2">
                {/* Title and Subtitle Area */}
                <div className="flex justify-between items-end font-mono text-xs tracking-wider text-muted dark:text-dark-muted order-1 md:order-2">
                    <div className="flex items-center gap-3">
                        <span
                            ref={titleRef}
                            className="text-secondary font-bold dark:text-dark-secondary text-base md:text-xs leading-tight"
                        >
                            {title}
                        </span>
                        <span className="hidden md:inline text-secondary dark:text-dark-secondary opacity-30">///</span>
                        <span
                            ref={subtitleRef}
                            className="hidden md:inline"
                        >
                            {subtitle}
                        </span>
                    </div>

                    {/* Subtitle on the right for mobile */}
                    <div className="md:hidden text-[10px] text-muted dark:text-dark-muted font-bold uppercase tracking-widest overflow-hidden">
                        <span className="inline-block animate-pulse">{subtitle}</span>
                    </div>

                    {/* Desktop Coordinates */}
                    <div className="hidden md:block font-mono tabular-nums opacity-80 header-coord">
                        {coords || "34.0522° N, 118.2437° W"}
                    </div>
                </div>

                {/* Navigation Bars */}
                <div className="flex flex-col gap-1 order-2 md:order-1">
                    <div ref={barsRef} className="flex w-full gap-2 h-1.5 items-center">
                        {[0, 1, 2, 3].map((idx) => (
                            <div
                                key={idx}
                                onClick={() => onSectionClick?.(idx)}
                                className={`flex-1 h-full transition-all duration-300 ease-out rounded-full ${getBarColor(idx)}`}
                                style={{ transformOrigin: 'center' }}
                            ></div>
                        ))}
                    </div>
                    {/* Mobile Coordinates below nav bar */}
                    <div className="md:hidden flex justify-end">
                        <span className="text-[8px] font-mono text-muted/40 dark:text-dark-muted/40 tracking-tighter uppercase">
                            {coords || "34.0522° N, 118.2437° W"}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};
