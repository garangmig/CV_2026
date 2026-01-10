interface BackgroundGridProps {
    opacityGrid?: number;
    opacityCross?: number;
}

export const BackgroundGrid = ({ opacityGrid = 20, opacityCross = 10 }: BackgroundGridProps) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div
                className="absolute inset-0 bg-tech-grid"
                style={{ opacity: opacityGrid / 100 }}
            ></div>
            <div
                className="absolute inset-0 crosshair-grid"
                style={{ opacity: opacityCross / 100 }}
            ></div>
        </div>
    );
};
