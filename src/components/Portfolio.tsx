
import { useState } from 'react';
import { projects } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import { useMouseCoordinates } from '../hooks/useMouseCoordinates';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackgroundGrid } from './BackgroundGrid';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../types/project';

const FillerCard = ({ className }: { className: string }) => (
    <article className={`relative border-r border-b border-grid-line dark:border-dark-grid-line p-2 md:p-6 flex flex-col items-center justify-center group bg-background dark:bg-dark-background ${className}`}>
        <div className="absolute -bottom-[6px] -right-[4px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-10">+</div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,theme(colors.grid-line),theme(colors.grid-line)_10px,transparent_10px,transparent_20px)] dark:bg-[repeating-linear-gradient(45deg,theme(colors.dark.grid-line),theme(colors.dark.grid-line)_10px,transparent_10px,transparent_20px)] opacity-20"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 text-center">
            <div className="relative">
                <svg className="w-10 h-10 md:w-16 md:h-16 text-muted/40 dark:text-dark-muted/40 group-hover:text-primary/60 dark:group-hover:text-dark-primary/60 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary dark:bg-dark-primary rounded-full animate-pulse shadow-[0_0_8px_theme(colors.primary)] dark:shadow-[0_0_8px_theme(colors.dark.primary)]"></div>
            </div>
            <div>
                <h3 className="font-mono text-[10px] md:text-xs text-muted dark:text-dark-muted tracking-widest mb-0.5 md:mb-1 group-hover:text-primary dark:group-hover:text-dark-primary transition-colors">SYS.BUILDING</h3>
                <p className="font-display text-[8px] md:text-[10px] text-muted/60 dark:text-dark-muted/60 uppercase">Working on new ideas</p>
            </div>
        </div>
    </article>
);

export const Portfolio = () => {
    const { title, subtitle, activeIndex } = siteConfig.sections.portfolio;
    const coords = useMouseCoordinates(5.0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="flex flex-col h-screen w-full relative overflow-hidden bg-background dark:bg-dark-background">
            <BackgroundGrid opacityGrid={50} opacityCross={40} />

            <div className="relative z-10 flex flex-col h-full w-full">
                <Header title={title} subtitle={subtitle} activeIndex={activeIndex} coords={coords} />

                <main className={`flex-1 flex flex-col px-4 md:px-12 overflow-y-auto ${siteConfig.scrollbar.classes} z-10 pb-4`}>
                    <div className="w-full border-l border-t border-grid-line dark:border-dark-grid-line grid grid-cols-2 lg:grid-cols-3 bg-background dark:bg-dark-background shadow-2xl">
                        {projects.map((proj) => (
                            <article
                                key={proj.id}
                                onClick={() => setSelectedProject(proj)}
                                className="relative border-r border-b border-grid-line dark:border-dark-grid-line group overflow-hidden cursor-pointer h-full min-h-[220px] md:min-h-[350px] flex flex-col bg-background dark:bg-dark-background transition-all duration-500 shadow-2xl"
                            >
                                {/* Top and Middle Area (Image Background) */}
                                <div className="relative flex-1 flex flex-col overflow-hidden pt-4 px-4 pb-0">
                                    <div className="absolute top-4 left-4 right-4 bottom-0 z-0 overflow-hidden border-x border-t border-grid-line/30 dark:border-dark-grid-line/30">
                                        <img
                                            src={`/${proj.icon}`}
                                            alt={proj.title}
                                            className="w-full h-full object-fill opacity-60 group-hover:opacity-100 transition-all duration-700"
                                        />
                                        {/* Blue filter overlay: active by default, fades on hover */}
                                        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/5 mix-blend-color group-hover:bg-transparent transition-all duration-700 z-10"></div>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary/5%)_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_center,theme(colors.dark.primary/5%)_0%,transparent_100%)] group-hover:opacity-0 transition-opacity duration-700 z-10"></div>
                                        {/* Darkening gradient for text readability - intensifies on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20 dark:from-dark-background/60 dark:via-transparent dark:to-dark-background/20 group-hover:from-background group-hover:via-background/20 dark:group-hover:from-dark-background dark:group-hover:via-dark-background/20 transition-all duration-700 z-20"></div>

                                        {/* Bottom 35% shadow for title readability - intensifies on hover */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-background/40 to-transparent dark:from-dark-background/40  group-hover:from-background/80 group-hover:via-background/80 dark:group-hover:from-dark-background dark:group-hover:via-dark-background/80 transition-all duration-500 z-21"></div>
                                    </div>

                                    {/* Content inside Image Area (ID to Title) */}
                                    <div className="relative z-30 flex flex-col h-full p-3 md:p-6 md:pb-4">
                                        <div className="flex justify-between items-start mb-auto">
                                            <span className="font-mono text-[8px] md:text-[10px] text-primary dark:text-dark-primary tracking-[0.2em] bg-background/70 dark:bg-dark-background/70 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 border border-primary/40 dark:border-dark-primary/40 shadow-[0_0_3px_theme(colors.primary/60%)] dark:shadow-[0_0_3px_theme(colors.dark.primary/60%)] group-hover:opacity-0 transition-opacity duration-700 ease-in-out">
                                                [{proj.id}]
                                            </span>
                                            <span className="material-symbols-outlined text-xs md:text-sm text-grid-line dark:text-dark-grid-line group-hover:text-primary dark:group-hover:text-dark-primary transition-all group-hover:rotate-45 text-secondary dark:text-dark-secondary">
                                                arrow_outward
                                            </span>
                                        </div>

                                        <div className="mt-auto">
                                            <h3 className="font-display font-bold text-secondary dark:text-dark-secondary text-base md:text-xl lg:text-2xl leading-[1.1] group-hover:text-primary dark:group-hover:text-dark-primary transition-colors drop-shadow-[2px_2px_10px_theme(colors.background/90%)] dark:drop-shadow-[2px_2px_10px_theme(colors.dark.background/90%)]">
                                                {proj.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags Area (Outside Image/Bottom) */}
                                <div className="relative z-20 p-3 md:p-6 md:pt-2 bg-background dark:bg-dark-background border-t border-grid-line/30 dark:border-dark-grid-line/30">
                                    <div className="h-[1px] w-full bg-grid-line dark:bg-dark-grid-line relative overflow-hidden mb-1 md:mb-3">
                                        <div className="absolute inset-0 bg-primary dark:bg-dark-primary w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                                    </div>
                                    <p className="font-mono text-[9px] md:text-[10px] text-muted dark:text-dark-muted uppercase tracking-[0.1em] line-clamp-2">
                                        {proj.tags.join(' // ')}
                                    </p>
                                </div>

                                {/* Corner Crosshairs */}
                                <div className="absolute -top-[6px] -right-[4px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-30">+</div>
                                <div className="absolute -bottom-[6px] -left-[5px] text-grid-line dark:text-dark-grid-line font-mono text-xs pointer-events-none z-30">+</div>
                            </article>
                        ))}

                        {/* Filler Cards to complete the grid */}
                        <FillerCard
                            className={`${projects.length % 2 !== 0 ? 'flex' : 'hidden'} ${projects.length % 3 !== 0 ? 'lg:flex' : 'lg:hidden'}`}
                        />
                        <FillerCard
                            className={`hidden ${projects.length % 3 === 1 ? 'lg:flex' : 'lg:hidden'}`}
                        />
                    </div>
                </main>

                <Footer version='2026' />
            </div>

            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
};
