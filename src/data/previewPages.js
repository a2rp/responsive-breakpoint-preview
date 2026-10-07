export const previewPages = [
    {
        id: "open-tide",
        name: "Open Tide Retreat",
        image: "coast-forest.jpg",
        eyebrow: "COASTAL STAYS",
        title: "A slower kind of escape.",
        description:
            "Find your way to a quiet cabin, a long shoreline, and a little more room to breathe.",
        action: "Explore the cabins",
        cards: ["Wake near the water", "Trails start here", "Space to unplug"],
    },
    {
        id: "common-table",
        name: "Common Table Cafe",
        image: "cafe-table.jpg",
        eyebrow: "COFFEE AND COMPANY",
        title: "Stay for the second cup.",
        description:
            "A neighborhood cafe for careful coffee, warm bread, and unhurried conversations.",
        action: "See the menu",
        cards: ["Coffee, made slowly", "A seat for everyone", "Something fresh daily"],
    },
];

export const createPreviewHtml = (pageId, baseUrl) => {
    const page = previewPages.find((item) => item.id === pageId) ?? previewPages[0];
    const imageUrl = `${baseUrl}images/${page.image}`;
    const featureCards = page.cards
        .map(
            (card, index) => `
                <article class="feature-card">
                    <span class="feature-number">0${index + 1}</span>
                    <h2>${card}</h2>
                    <p>Thoughtful details make a good day feel easy.</p>
                </article>`,
        )
        .join("");

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.name}</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; color: #192d2a; font-family: Arial, Helvetica, sans-serif; }
      a { color: inherit; text-decoration: none; }
      .sample-page { min-height: 100vh; background: #f8f7f1; }
      .topbar { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 22px 6.5%; border-bottom: 1px solid #e4e6dd; }
      .brand { font-size: 15px; font-weight: 800; letter-spacing: .08em; white-space: nowrap; }
      .brand span { color: #6e8b7d; font-weight: 500; }
      .navigation { display: flex; gap: 25px; color: #53645c; font-size: 12px; }
      .top-action { border: 1px solid #385e50; border-radius: 6px; padding: 9px 13px; color: #26493e; font-size: 11px; font-weight: 700; white-space: nowrap; }
      .hero { display: grid; grid-template-columns: 1fr .92fr; align-items: center; gap: 5%; padding: 7.5% 6.5%; }
      .hero-copy { max-width: 470px; }
      .eyebrow { margin: 0 0 14px; color: #b65c42; font-size: 10px; font-weight: 800; letter-spacing: .14em; }
      h1 { max-width: 470px; margin: 0; font-family: Georgia, serif; font-size: clamp(38px, 5vw, 68px); font-weight: 400; letter-spacing: -.055em; line-height: 1.01; }
      .description { max-width: 390px; margin: 18px 0 23px; color: #62716a; font-size: 14px; line-height: 1.65; }
      .primary-action { display: inline-flex; min-height: 42px; align-items: center; border-radius: 6px; background: #294f42; padding: 0 16px; color: white; font-size: 12px; font-weight: 700; }
      .hero-image { width: 100%; height: auto; aspect-ratio: 1.1; border-radius: 8px; object-fit: cover; }
      .features { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 13px; padding: 0 6.5% 7%; }
      .feature-card { min-height: 132px; border-top: 1px solid #d9ded5; padding: 16px 14px; }
      .feature-number { color: #b65c42; font-size: 10px; font-weight: 800; }
      .feature-card h2 { margin: 16px 0 5px; font-family: Georgia, serif; font-size: 18px; font-weight: 400; }
      .feature-card p { margin: 0; color: #728078; font-size: 11px; }
      @media (max-width: 920px) {
        .topbar { padding-inline: 5%; }
        .navigation { gap: 15px; }
        .hero { grid-template-columns: 1fr 1fr; gap: 4%; padding-inline: 5%; }
        h1 { font-size: clamp(36px, 6vw, 54px); }
        .features { padding-inline: 5%; }
      }
      @media (max-width: 640px) {
        .topbar { gap: 12px; padding: 16px 5%; }
        .navigation { display: none; }
        .top-action { padding: 8px 10px; font-size: 10px; }
        .hero { grid-template-columns: 1fr; gap: 25px; padding: 34px 6% 28px; }
        h1 { max-width: 340px; font-size: 45px; }
        .description { margin: 13px 0 18px; font-size: 13px; }
        .hero-image { aspect-ratio: 1.45; }
        .features { grid-template-columns: 1fr; gap: 0; padding: 0 6% 34px; }
        .feature-card { min-height: auto; padding: 15px 4px; }
        .feature-card h2 { margin-top: 8px; }
      }
    </style>
  </head>
  <body>
    <div class="sample-page">
      <header class="topbar">
        <a class="brand" href="#">${page.name.toUpperCase()} <span> / JOURNAL</span></a>
        <nav class="navigation" aria-label="Sample page navigation">
          <a href="#stays">The stay</a><a href="#details">Our place</a><a href="#contact">Contact</a>
        </nav>
        <a class="top-action" href="#contact">Plan your visit</a>
      </header>
      <main>
        <section class="hero" id="stays">
          <div class="hero-copy">
            <p class="eyebrow">${page.eyebrow}</p>
            <h1>${page.title}</h1>
            <p class="description">${page.description}</p>
            <a class="primary-action" href="#details">${page.action}</a>
          </div>
          <img class="hero-image" src="${imageUrl}" alt="A quiet place framed by trees and open water" width="960" height="840">
        </section>
        <section class="features" id="details" aria-label="What to expect">
          ${featureCards}
        </section>
      </main>
    </div>
  </body>
</html>`;
};
