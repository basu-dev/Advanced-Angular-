export type IMatchMedia = {
    [P in keyof typeof breakPoints]?: any
};


export const breakPoints = {
    xs: "(max-width:599px)",
    sm: "(min-width:600px) and (max-width:768px)",
    md: "(min-width:769px) and (max-width:991px)",
    lg: "(min-width:992px) and (max-width:1200px)",
    xl: "(min-width:1200px)",
    hoverable: "(hover:hover)",
    nonHoverable: "(hover:none)",
    landscape: "(orientation: landscape)",
    portrait: "(orientation: portrait)",
};