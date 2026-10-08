export const defaultViewports = [
    {
        id: "phone-375",
        name: "Phone SE",
        width: 375,
        height: 667,
        kind: "phone",
    },
    { id: "phone-390", name: "Phone", width: 390, height: 844, kind: "phone" },
    {
        id: "tablet-768",
        name: "Tablet",
        width: 768,
        height: 1024,
        kind: "tablet",
    },
    {
        id: "laptop-1280",
        name: "Laptop",
        width: 1280,
        height: 800,
        kind: "laptop",
    },
    {
        id: "desktop-1440",
        name: "Desktop",
        width: 1440,
        height: 900,
        kind: "desktop",
    },
];

export const customViewportStorageKey = "breakframe-custom-viewports";
export const customViewportLimit = 8;

export const breakpointGuides = [
    { id: "small", label: "Phone", width: 480, range: "320 to 479 px" },
    { id: "medium", label: "Tablet", width: 768, range: "480 to 767 px" },
    { id: "large", label: "Laptop", width: 1024, range: "768 to 1023 px" },
    { id: "wide", label: "Desktop", width: 1280, range: "1024 px and up" },
];

export const getBreakpointForWidth = (width) =>
    breakpointGuides.find((breakpoint) => width < breakpoint.width) ??
    breakpointGuides[breakpointGuides.length - 1];

export const readCustomViewports = () => {
    try {
        const stored = JSON.parse(
            localStorage.getItem(customViewportStorageKey),
        );

        if (!Array.isArray(stored)) {
            return [];
        }

        return stored
            .filter(
                (item) =>
                    item &&
                    typeof item.id === "string" &&
                    typeof item.name === "string" &&
                    Number.isInteger(item.width) &&
                    item.width >= 320 &&
                    item.width <= 2560 &&
                    Number.isInteger(item.height) &&
                    item.height >= 360 &&
                    item.height <= 1920,
            )
            .slice(0, customViewportLimit)
            .map((item) => ({ ...item, kind: "custom" }));
    } catch {
        return [];
    }
};
