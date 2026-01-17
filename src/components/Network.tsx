import { service_records } from '../data/service_records';
import { SKILLS_REGISTRY } from '../data/skills';
import { useState, useMemo, useRef, useLayoutEffect } from 'react';

export const Network = () => {
    const [hoveredService, setHoveredService] = useState<string | null>(null);

    const { cloud, devops, database } = useMemo(() => {
        const skills = Object.values(SKILLS_REGISTRY);
        return {
            cloud: skills.filter(s => s.group === 'CLOUD'),
            devops: skills.filter(s => s.group === 'DEVOPS'),
            database: skills.filter(s => s.group === 'DATABASE')
        };
    }, []);

    const activeSkills = useMemo(() => {
        if (!hoveredService) return new Set<string>();
        const service = service_records.find(s => s.id === hoveredService);
        return new Set(service?.skillsUsed || []);
    }, [hoveredService]);

    const skillsRef = useRef<HTMLDivElement>(null);
    const serviceRecordsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const updatePosition = () => {
            if (!skillsRef.current) return;

            if (window.innerWidth < 768 && window.innerHeight > 568) {
                const viewportHeight = window.innerHeight;
                const skillsHeight = skillsRef.current.offsetHeight;
                const HeaderHeight = 6 * 16; // 4rem approximation
                const footerHeight = 4 * 16; // 4rem approximation

                // Calculate top position to pin to bottom
                const topPosition = viewportHeight - skillsHeight - HeaderHeight - footerHeight;
                skillsRef.current.style.top = `${topPosition}px`;

                // Update service records padding-bottom
                if (serviceRecordsRef.current) {
                    const serviceRecordsPaddingBottom = skillsHeight;
                    serviceRecordsRef.current.style.paddingBottom = `${serviceRecordsPaddingBottom}px`;
                }
            } else {
                // Reset for desktop

                skillsRef.current.style.top = '';

                if (serviceRecordsRef.current) {
                    serviceRecordsRef.current.style.paddingBottom = '';
                }
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, []);

    const renderSkill = (skill: any) => {
        const isActive = activeSkills.has(skill.id);
        return (
            <span
                key={skill.id}
                className={`px-3 py-1 rounded-full border transition-all duration-300 font-mono text-[10px] md:text-xs ${isActive
                    ? 'border-primary dark:border-dark-primary bg-primary/20 dark:bg-dark-primary/20 text-primary dark:text-dark-primary shadow-[0_0_10px_rgba(0,114,245,0.3)] scale-105 z-10'
                    : 'border-white/20 bg-white/5 text-muted dark:text-dark-muted group-hover:border-primary/40 dark:group-hover:border-dark-primary/40 group-hover:text-primary/70 dark:group-hover:text-dark-primary/70'
                    }`}
            >
                <span className="md:hidden">
                    {skill.shortName || skill.name.toUpperCase()}
                </span>
                <span className="hidden md:inline">
                    {skill.name.toUpperCase()}
                </span>
            </span>
        );
    };

    return (
        <div id="network-section" className="flex flex-col w-full relative">
            <div className="relative z-10 flex flex-col w-full">
                <main className="flex-1 flex flex-col px-4 md:px-12 z-10 pt-24 md:pt-20 pb-16 md:pb-20">
                    <div className="w-full h-full border-l border-t border-transparent dark:border-dark-transparent flex flex-col md:flex-row shadow-2xl relative min-h-screen">
                        {/* Decorative Corners */}
                        {/* <div className="absolute -top-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                        <div className="absolute -top-[6px] -right-[4px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                        <div className="absolute -bottom-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                        <div className="absolute -bottom-[6px] -right-[4px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div> */}

                        {/* Left Panel: Service Records - Expanded to full height */}
                        <section
                            id="service-records-panel"
                            ref={serviceRecordsRef}
                            className="w-full md:w-[60%] border-t border-x border-grid-line dark:border-dark-grid-line flex flex-col relative h-fit min-h-screen">
                            <div className="p-3 md:p-4 border-b border-grid-line dark:border-dark-grid-line bg-background/50 backdrop-blur-sm flex items-center justify-between sticky top-0 z-30">
                                <h2 className="font-mono text-[10px] md:text-xs text-primary/80 dark:text-dark-primary/80 tracking-widest">[ SERVICE_RECORDS ]</h2>
                                <span className="material-symbols-outlined text-xs text-muted dark:text-dark-muted">terminal</span>
                            </div>
                            <div className="flex-1 flex flex-col">
                                {service_records.map((item) => (
                                    <article
                                        key={item.id}
                                        onMouseEnter={() => setHoveredService(item.id)}
                                        onMouseLeave={() => setHoveredService(null)}
                                        className={`w-full border-b border-grid-line dark:border-dark-grid-line p-3 md:p-5 hover:bg-primary/5 dark:hover:bg-dark-primary/5 group relative transition-all duration-300 flex flex-col gap-1 md:gap-2 cursor-crosshair ${hoveredService === item.id ? 'bg-primary/10' : ''
                                            }`}
                                    >
                                        <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-300 ${hoveredService === item.id ? 'bg-primary dark:bg-dark-primary' : 'bg-transparent'
                                            }`}></div>
                                        <div className="flex justify-between items-center w-full">
                                            <h3 className={`font-semibold text-xs md:text-sm font-display tracking-tight transition-colors duration-300 ${hoveredService === item.id ? 'text-primary dark:text-dark-primary' : 'text-white'
                                                }`}>{item.title}</h3>
                                            <span className={`font-mono text-[10px] px-2 py-0.5 rounded border transition-all duration-300 ${hoveredService === item.id
                                                ? 'bg-primary/10 border-primary/40 text-primary dark:text-dark-primary'
                                                : 'bg-white/5 text-muted dark:text-dark-muted border-white/10'
                                                }`}>
                                                {item.date}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <div className="flex items-center gap-2 text-muted dark:text-dark-muted">
                                                <span className="font-mono text-[9px] md:text-[10px] uppercase opacity-50 min-w-[70px] md:min-w-[80px]">Scope</span>
                                                <span className="text-[11px] md:text-sm text-gray-300">{item.scope}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted dark:text-dark-muted">
                                                <span className="font-mono text-[9px] md:text-[10px] uppercase opacity-50 min-w-[70px] md:min-w-[80px]">Achievement</span>
                                                <span className={`font-mono text-[10px] md:text-[11px] transition-colors duration-300 ${hoveredService === item.id ? 'text-primary/90 dark:text-dark-primary/90' : 'text-white/60'
                                                    }`}>
                                                    {item.achievement}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {/* Right Panel: Skills - Controlled by GSAP in App.tsx */}
                        <section
                            id="skills-panel"
                            ref={skillsRef}
                            className="w-full md:w-[40%] flex flex-col md:flex-none overflow-y-auto custom-scrollbar border-y border-r border-l md:border-l-0 md:border-r border-grid-line dark:border-dark-grid-line bg-[#050505]/80 backdrop-blur-md absolute h-min max-h-[55vh] sh:max-h-fit sh:overflow-y-hidden sh:relative z-40 md:sticky md:top-20 md:h-[calc(100vh-10rem)] md:max-h-none"
                        >
                            {/* Cloud Section */}
                            <div className="md:flex-1 flex-shrink-0 border-b border-grid-line dark:border-dark-grid-line p-3 md:p-6 relative group hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors">
                                <div className="absolute -top-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <h3 className="font-mono text-[10px] md:text-xs text-muted dark:text-dark-muted tracking-widest">[ CLOUD ]</h3>
                                    <span className="material-symbols-outlined text-grid-line dark:text-dark-grid-line group-hover:text-primary/50 dark:group-hover:text-dark-primary/50 text-xs md:text-sm">cloud</span>
                                </div>
                                <div className="flex flex-wrap gap-2 content-start">
                                    {cloud.map(renderSkill)}
                                </div>
                            </div>

                            {/* DevOps Section */}
                            <div className="md:flex-1 flex-shrink-0 border-b border-grid-line dark:border-dark-grid-line p-3 md:p-6 relative group hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors">
                                <div className="absolute -top-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <h3 className="font-mono text-[10px] md:text-xs text-muted dark:text-dark-muted tracking-widest">[ DEVOPS ]</h3>
                                    <span className="material-symbols-outlined text-grid-line dark:text-dark-grid-line group-hover:text-primary/50 dark:group-hover:text-dark-primary/50 text-xs md:text-sm">terminal</span>
                                </div>
                                <div className="flex flex-wrap gap-2 content-start">
                                    {devops.map(renderSkill)}
                                </div>
                            </div>

                            {/* Database Section */}
                            <div className="md:flex-1 flex-shrink-0 border-b border-grid-line dark:border-dark-grid-line p-3 md:p-6 relative group hover:bg-primary/5 dark:hover:bg-dark-primary/5 transition-colors">
                                <div className="absolute -top-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <h3 className="font-mono text-[10px] md:text-xs text-muted dark:text-dark-muted tracking-widest">[ DATABASE ]</h3>
                                    <span className="material-symbols-outlined text-grid-line dark:text-dark-grid-line group-hover:text-primary/50 dark:group-hover:text-dark-primary/50 text-xs md:text-sm">database</span>
                                </div>
                                <div className="flex flex-wrap gap-2 content-start">
                                    {database.map(renderSkill)}
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};
