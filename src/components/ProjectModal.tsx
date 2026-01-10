
import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Project } from '../types/project';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    const [mediaList, setMediaList] = React.useState(project.media || []);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const techStackRef = React.useRef<HTMLDivElement>(null);
    const metricsRef = React.useRef<HTMLDivElement>(null);
    const [useMainScroll, setUseMainScroll] = React.useState(false);
    const [currentMobileIndex, setCurrentMobileIndex] = React.useState(0);

    React.useLayoutEffect(() => {
        const checkSpace = () => {
            if (containerRef.current) {
                const isMobile = window.innerWidth < 768;
                const containerHeight = containerRef.current.clientHeight;
                const techHeight = techStackRef.current?.offsetHeight || 0;
                const metricsHeight = metricsRef.current?.offsetHeight || 0;
                const gapHeight = 48; // gaps (gap-6 * 2 approx) + padding

                const availableForDescription = containerHeight - techHeight - metricsHeight - gapHeight;

                // Force main scroll on mobile, otherwise calculate based on space
                setUseMainScroll(isMobile || availableForDescription < 200);
            }
        };

        checkSpace();
        const observer = new ResizeObserver(checkSpace);
        if (containerRef.current) observer.observe(containerRef.current);
        if (techStackRef.current) observer.observe(techStackRef.current);
        if (metricsRef.current) observer.observe(metricsRef.current);

        return () => observer.disconnect();
    }, []);

    // Prevent click propagation from modal content to backdrop
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleSwap = (index: number) => {
        if (index >= mediaList.length) return;
        const newList = [...mediaList];
        const temp = newList[0];
        newList[0] = newList[index];
        newList[index] = temp;
        setMediaList(newList);
    };

    // Helper to get media safely
    const mainMedia = mediaList.length > 0 ? mediaList[0] : null;
    const secondaryMedia1 = mediaList.length > 1 ? mediaList[1] : null;
    const secondaryMedia2 = mediaList.length > 2 ? mediaList[2] : null;

    const mainImage = mainMedia?.url || project.icon;
    const mainTitle = mainMedia?.title || "MAIN_VIEW";
    const secondaryImage1 = secondaryMedia1?.url || null;
    const secondaryTitle1 = secondaryMedia1?.title || "EMPTY_SLOT";
    const secondaryImage2 = secondaryMedia2?.url || null;
    const secondaryTitle2 = secondaryMedia2?.title || "EMPTY_SLOT";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center md:p-2 lg:p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-background/95 dark:bg-dark-background/95 backdrop-blur-[2px]"></div>

            <div
                className="relative w-full h-full max-w-7xl border border-grid-line dark:border-dark-grid-line bg-background dark:bg-dark-background flex flex-col md:flex-row shadow-[0_0_100px_theme(colors.background/60%)] dark:shadow-[0_0_100px_theme(colors.dark.background/60%)] rounded-sm z-10 overflow-hidden"
                onClick={handleContentClick}
            >
                {/* Left Column (Visuals) - Hidden on mobile, visible on md+ */}
                <div className="hidden md:flex flex-col w-[55%] h-full border-r border-grid-line dark:border-dark-grid-line p-8 gap-6 bg-[linear-gradient(45deg,theme(colors.background/10%)_1px,transparent_1px)] dark:bg-[linear-gradient(45deg,theme(colors.dark.background/10%)_1px,transparent_1px)] bg-[length:32px_32px]">
                    {/* Main Viewport */}
                    <div className="flex-[3] w-full border border-grid-line dark:border-dark-grid-line relative bg-background dark:bg-dark-background p-1 group min-h-0">
                        {/* Decorative Left Scale */}
                        <div className="absolute -left-3 top-10 bottom-10 w-px bg-grid-line dark:bg-dark-grid-line flex flex-col justify-between items-center">
                            <div className="w-2 h-px bg-grid-line dark:bg-dark-grid-line"></div>
                            <div className="font-mono text-[8px] text-muted dark:text-dark-muted -rotate-90">VIEWPORT_Y</div>
                            <div className="w-2 h-px bg-grid-line dark:bg-dark-grid-line"></div>
                        </div>

                        {/* Corner Markers */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary dark:border-dark-primary"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary dark:border-dark-primary"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary dark:border-dark-primary"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary dark:border-dark-primary"></div>

                        {/* Image Container */}
                        <div className="w-full h-full bg-background dark:bg-dark-background flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-[repeat(10,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] opacity-30 pointer-events-none z-20">
                                <div className="col-start-3 row-start-3 col-span-6 row-span-6 border border-dashed border-primary/20 dark:border-dark-primary/20"></div>
                            </div>

                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt={project.title}
                                    className="max-w-full max-h-full object-contain z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            ) : (
                                <span className="material-symbols-outlined text-8xl text-grid-line/50 dark:text-dark-grid-line/50 font-thin group-hover:text-primary/20 dark:group-hover:text-dark-primary/20 transition-colors duration-500">ssid_chart</span>
                            )}

                            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-secondary dark:text-dark-secondary tracking-widest bg-background/50 dark:bg-dark-background/50 px-2 py-1 border border-primary/20 dark:border-dark-primary/20 z-30 uppercase">FIG_1.0 // {mainTitle}</div>
                        </div>
                    </div>

                    {/* Secondary Metrics / Images */}
                    <div className="flex-1 w-full flex gap-6 min-h-0">
                        <div
                            onClick={() => handleSwap(1)}
                            className={`flex-1 border border-grid-line dark:border-dark-grid-line relative bg-background dark:bg-dark-background p-1 group overflow-visible min-h-0 ${secondaryImage1 ? 'cursor-pointer' : ''}`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 bg-grid-line dark:bg-dark-grid-line z-20"></div>
                            <div className="w-full h-full bg-background dark:bg-dark-background flex items-center justify-center border border-dashed border-grid-line dark:border-dark-grid-line relative">
                                {secondaryImage1 ? (
                                    <img src={secondaryImage1} alt="Detail A" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-grid-line/50 dark:text-dark-grid-line/50 font-thin">code_blocks</span>
                                )}
                            </div>
                            <div className="absolute -bottom-4 left-0 font-mono text-[9px] text-muted dark:text-dark-muted uppercase">
                                {secondaryTitle1}
                            </div>
                        </div>
                        <div
                            onClick={() => handleSwap(2)}
                            className={`flex-1 border border-grid-line dark:border-dark-grid-line relative bg-background dark:bg-dark-background p-1 group overflow-visible min-h-0 ${secondaryImage2 ? 'cursor-pointer' : ''}`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 bg-grid-line dark:bg-dark-grid-line z-20"></div>
                            <div className="w-full h-full bg-background dark:bg-dark-background flex items-center justify-center border border-dashed border-grid-line dark:border-dark-grid-line relative">
                                {secondaryImage2 ? (
                                    <img src={secondaryImage2} alt="Detail B" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <span className="material-symbols-outlined text-4xl text-grid-line/50 dark:text-dark-grid-line/50 font-thin">data_array</span>
                                )}
                            </div>
                            <div className="absolute -bottom-4 left-0 font-mono text-[9px] text-muted dark:text-dark-muted uppercase">
                                {secondaryTitle2}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Info) */}
                <div className="flex-1 h-full flex flex-col relative bg-background dark:bg-dark-background">
                    {/* Header */}
                    <div className="flex justify-between items-start p-4 border-b border-grid-line/50 dark:border-dark-grid-line/50 relative">
                        <div className="absolute top-0 left-0 w-16 h-[2px] bg-primary dark:bg-dark-primary"></div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary dark:bg-dark-primary animate-pulse"></div>
                                <span className="font-mono text-[10px] text-primary dark:text-dark-primary tracking-[0.2em]">[{project.id}] SELECTED</span>
                            </div>
                            <h1 className="font-display text-3xl lg:text-5xl font-bold text-secondary dark:text-dark-secondary tracking-tight mt-2 break-words">
                                {project.title.split(' ').map((word: string, i: number) => (
                                    <React.Fragment key={i}>
                                        {word}<br className={i === 0 && project.title.split(' ').length > 1 ? "hidden lg:block" : "hidden"} />{' '}
                                    </React.Fragment>
                                ))}
                            </h1>
                        </div>
                        <button
                            onClick={onClose}
                            className="group flex flex-col items-end gap-1 text-muted dark:text-dark-muted hover:text-secondary dark:hover:text-dark-secondary transition-colors cursor-pointer z-50"
                        >
                            <span className="text-2xl font-mono leading-none group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">[X]</span>
                            <span className="font-mono text-[9px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">CLOSE_MODAL</span>
                        </button>
                    </div>

                    {/* Content Container */}
                    <div
                        ref={containerRef}
                        className={`flex-1 p-4 flex flex-col gap-6 min-h-0 ${useMainScroll ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"}`}
                    >
                        {/* Mobile Image Carousel */}
                        <div className="md:hidden w-full flex flex-col gap-2 mb-4">
                            <div className="w-full aspect-video bg-background dark:bg-dark-background border border-grid-line dark:border-dark-grid-line relative overflow-hidden group/carousel">
                                <div
                                    className="flex h-full transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentMobileIndex * 100}%)` }}
                                >
                                    {mediaList.length > 0 ? (
                                        mediaList.map((media, idx) => (
                                            <div key={idx} className="w-full h-full flex-shrink-0 relative flex items-center justify-center p-1">
                                                <img src={media.url} className="w-full h-full object-contain opacity-90" alt={media.alt} />
                                                <div className="absolute bottom-2 left-2 font-mono text-[8px] text-secondary dark:text-dark-secondary tracking-widest bg-background/50 dark:bg-dark-background/50 px-2 py-0.5 border border-primary/20 dark:border-dark-primary/20 z-30 uppercase">
                                                    FIG_{idx + 1}.0 // {media.title || "VIEW_DETAIL"}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full h-full flex-shrink-0 relative flex items-center justify-center p-1">
                                            {project.icon ? (
                                                <img src={project.icon} className="w-full h-full object-contain opacity-90" alt={project.title} />
                                            ) : (
                                                <span className="material-symbols-outlined text-6xl text-grid-line/50 dark:text-dark-grid-line/50 font-thin">ssid_chart</span>
                                            )}
                                            <div className="absolute bottom-2 left-2 font-mono text-[8px] text-secondary dark:text-dark-secondary tracking-widest bg-background/50 dark:bg-dark-background/50 px-2 py-0.5 border border-primary/20 dark:border-dark-primary/20 z-30 uppercase">
                                                FIG_1.0 // MAIN_ICON
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Navigation Arrows */}
                                {mediaList.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentMobileIndex(prev => (prev > 0 ? prev - 1 : mediaList.length - 1))}
                                            className="absolute left-1 top-1/2 -translate-y-1/2 z-40 bg-background/60 backdrop-blur-sm border border-grid-line dark:border-dark-grid-line p-1 hover:border-primary dark:hover:border-dark-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-secondary dark:text-dark-secondary">chevron_left</span>
                                        </button>
                                        <button
                                            onClick={() => setCurrentMobileIndex(prev => (prev < mediaList.length - 1 ? prev + 1 : 0))}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 z-40 bg-background/60 backdrop-blur-sm border border-grid-line dark:border-dark-grid-line p-1 hover:border-primary dark:hover:border-dark-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm text-secondary dark:text-dark-secondary">chevron_right</span>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Indicators */}
                            {mediaList.length > 1 && (
                                <div className="flex justify-between items-center px-1">
                                    <div className="flex gap-1">
                                        {mediaList.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`h-[1px] w-6 transition-all duration-300 ${idx === currentMobileIndex ? 'bg-primary dark:bg-dark-primary' : 'bg-grid-line/30 dark:bg-dark-grid-line/30'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-mono text-[8px] text-muted dark:text-dark-muted tracking-tighter">
                                        MEDIA_STEP_[0{currentMobileIndex + 1}/0{mediaList.length}]
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Tech Stack */}
                        <div ref={techStackRef} className="flex-shrink-0">
                            <div className="flex items-center justify-between mb-4 border-b border-grid-line dark:border-dark-grid-line pb-1">
                                <h3 className="font-mono text-xs text-muted dark:text-dark-muted tracking-widest uppercase">/// Tech_Stack</h3>
                                <span className="font-mono text-[9px] text-muted dark:text-dark-muted">LIB.V.2.4</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag: string) => (
                                    <span key={tag} className="px-2 py-1.5 border border-grid-line dark:border-dark-grid-line text-xs font-mono text-secondary dark:text-dark-secondary hover:border-primary dark:hover:border-dark-primary hover:text-primary dark:hover:text-dark-primary transition-colors cursor-crosshair">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className={`${useMainScroll ? "h-auto" : "flex-1 min-h-0"} flex flex-col`}>
                            <div className="flex items-center justify-between mb-4 border-b border-grid-line dark:border-dark-grid-line pb-1">
                                <h3 className="font-mono text-xs text-muted dark:text-dark-muted tracking-widest uppercase">/// System_Complexity</h3>
                                <span className="font-mono text-[9px] text-muted dark:text-dark-muted">DOC_REF_09</span>
                            </div>
                            <div className={`${useMainScroll ? "h-auto" : "flex-1 min-h-0"} relative`}>
                                {/* Scrollable area for description - Only scrollable when NOT in main scroll mode */}
                                <div className={`${useMainScroll ? "static" : "absolute inset-0 overflow-y-auto scrollbar-left blueprint-scrollbar custom-scrollbar"} border-l-2 border-grid-line dark:border-dark-grid-line`}>
                                    <div className="pl-4 font-mono text-xs md:text-sm text-muted dark:text-dark-muted leading-relaxed text-justify">
                                        <ReactMarkdown
                                            components={{
                                                p: ({ ...props }) => <p className="mb-4" {...props} />,
                                                ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                                                ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                                                li: ({ ...props }) => <li className="mb-1" {...props} />,
                                                strong: ({ ...props }) => <strong className="text-secondary dark:text-dark-secondary font-bold" {...props} />,
                                                h3: ({ ...props }) => <h3 className="text-primary dark:text-dark-primary font-bold mt-6 mb-2 uppercase tracking-wider" {...props} />,
                                            }}
                                        >
                                            {project.longDescription}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                            <div ref={metricsRef} className="flex-shrink-0">
                                <div className="flex items-center justify-between mb-4 border-b border-grid-line dark:border-dark-grid-line pb-1">
                                    <h3 className="font-mono text-xs text-muted dark:text-dark-muted tracking-widest uppercase">/// Metrics</h3>
                                    <span className="font-mono text-[9px] text-muted dark:text-dark-muted">LIVE_DATA</span>
                                </div>
                                <div className="grid grid-cols-2 bg-background dark:bg-dark-background">
                                    {project.metrics.map((metric: any, i: number) => (
                                        <div key={i} className="relative bg-background dark:bg-dark-background p-3 flex flex-col gap-1 transition-colors cursor-crosshair group border border-grid-line dark:border-dark-grid-line hover:border-primary dark:hover:border-dark-primary">
                                            <span className="font-mono text-[9px] text-muted dark:text-dark-muted uppercase group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">{metric.name}</span>
                                            <span className="font-mono text-base text-secondary dark:text-dark-secondary group-hover:text-primary dark:group-hover:text-dark-primary">{metric.value}</span>

                                            {/* Tooltip */}
                                            {metric.description && (
                                                <div className={`absolute bottom-full ${i % 2 === 0 ? 'left-0' : 'right-0'} w-[180%] mb-4 p-3 bg-background dark:bg-[#0a0a0a] border border-primary dark:border-dark-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none shadow-[10px_10px_20px_rgba(0,0,0,0.5)] transform translate-y-2 group-hover:translate-y-0`}>
                                                    <div className="flex items-center gap-2 mb-2 border-b border-grid-line dark:border-dark-grid-line pb-1">
                                                        <div className="w-1.5 h-1.5 bg-primary dark:bg-dark-primary animate-pulse"></div>
                                                        <span className="font-mono text-[8px] text-primary dark:text-dark-primary tracking-widest uppercase">DETAIL_ANALYTICS // {metric.name}</span>
                                                    </div>
                                                    <p className="font-mono text-[10px] text-muted dark:text-dark-muted leading-relaxed text-left">
                                                        {metric.description}
                                                    </p>
                                                    {/* Decorative corner */}
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 dark:border-dark-primary/40"></div>
                                                    {/* Arrow */}
                                                    <div className={`absolute -bottom-[5px] ${i % 2 === 0 ? 'left-8' : 'right-8'} w-2 h-2 bg-background dark:bg-[#0a0a0a] border-r border-b border-primary dark:border-dark-primary rotate-45`}></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    {(project.links?.demo || project.links?.docs || project.links?.github) && (
                        <div className="p-4 border-t border-grid-line/50 dark:border-dark-grid-line/50 mt-auto bg-background dark:bg-dark-background">
                            <a
                                href={project.links.demo || project.links.github || project.links.docs || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full flex items-center justify-between p-3 border border-grid-line dark:border-dark-grid-line hover:border-primary dark:hover:border-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary transition-all group relative overflow-hidden text-secondary dark:text-dark-secondary"
                            >
                                <div className="absolute inset-0 bg-primary/5 dark:bg-dark-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <div className="flex items-center gap-4 relative z-10">
                                    <span className="material-symbols-outlined text-xl text-muted dark:text-dark-muted group-hover:text-secondary dark:group-hover:text-dark-secondary">code</span>
                                    <span className="font-mono text-xs text-secondary dark:text-dark-secondary tracking-[0.2em]">
                                        {project.links.demo ? "OPEN_DEMO" : project.links.docs ? "OPEN_DOCS" : "LINK_TO_CODE"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="font-mono text-[9px] text-primary dark:text-dark-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        {project.links.demo ? "LIVE_VIEW" : project.links.docs ? "VIEW_DOCS" : "VIEW_CODE"}
                                    </span>
                                    <span className="material-symbols-outlined text-sm text-grid-line dark:text-dark-grid-line group-hover:text-primary dark:group-hover:text-dark-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
