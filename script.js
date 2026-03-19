const buildOutfitBtn = document.getElementById("buildOutfitBtn");
const promptInput = document.getElementById("outfitPrompt");
const resultSection = document.getElementById("result");
const summaryText = document.getElementById("summary");
const itemGrid = document.getElementById("itemGrid");
const itemTemplate = document.getElementById("itemCardTemplate");

const outfitRules = [
  {
    name: "date night",
    keywords: ["date", "dinner", "night out", "romantic"],
    items: [
      ["Fitted top", "Balances casual and dressed-up vibes."],
      ["Straight-leg jeans", "Clean silhouette that works in most settings."],
      ["Light jacket", "Adds style and comfort when it gets cool."],
      ["Minimal sneakers or boots", "Keeps the outfit polished."],
    ],
  },
  {
    name: "business casual",
    keywords: ["office", "business", "work", "professional"],
    items: [
      ["Oxford shirt or blouse", "Professional base layer."],
      ["Tailored trousers", "Sharp look with all-day comfort."],
      ["Structured blazer", "Makes the outfit look intentional."],
      ["Loafers", "Smart footwear for business settings."],
    ],
  },
  {
    name: "gym",
    keywords: ["gym", "workout", "training", "active"],
    items: [
      ["Moisture-wicking tee", "Breathable for intense movement."],
      ["Athletic shorts or joggers", "Flexible and practical."],
      ["Zip hoodie", "Great warm-up layer."],
      ["Running shoes", "Supportive and sport-ready."],
    ],
  },
];

const defaultItems = [
  ["Basic tee", "Easy everyday base piece."],
  ["Relaxed jeans", "Comfortable and versatile."],
  ["Layering jacket", "Adds structure and weather coverage."],
  ["Everyday sneakers", "Pairs with almost anything."],
];

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

function inferOutfit(prompt) {
  const lower = prompt.toLowerCase();
  const matched = outfitRules.find((rule) =>
    rule.keywords.some((keyword) => lower.includes(keyword))
  );

  const vibe = matched?.name || "casual";
  const items = matched?.items || defaultItems;

  const colorHint =
    ["black", "white", "neutral", "beige", "blue", "green", "red"].find((c) =>
      lower.includes(c)
    ) || "neutral";

  const weatherHint = lower.includes("winter")
    ? "cold weather"
    : lower.includes("summer")
    ? "warm weather"
    : "mild weather";

  return { vibe, items, colorHint, weatherHint };
}

function storeSearchLinks(itemName) {
  const query = encodeURIComponent(itemName);

  return {
    hollister: `https://www.hollisterco.com/shop/us/search?query=${query}`,
    hm: `https://www2.hm.com/en_us/search-results.html?q=${query}`,
  };
}

function renderOutfit(prompt) {
  const { vibe, items, colorHint, weatherHint } = inferOutfit(prompt);

  summaryText.textContent = `Built a ${vibe} outfit in ${colorHint} tones for ${weatherHint} based on your prompt.`;
  itemGrid.innerHTML = "";

  for (const [itemName, reason] of items) {
    const clone = itemTemplate.content.cloneNode(true);
    clone.querySelector(".item-name").textContent = capitalize(itemName);
    clone.querySelector(".item-reason").textContent = reason;

    const links = storeSearchLinks(itemName);
    clone.querySelector(".buy-hollister").href = links.hollister;
    clone.querySelector(".buy-hm").href = links.hm;

    itemGrid.appendChild(clone);
  }

  resultSection.classList.remove("hidden");
}

buildOutfitBtn.addEventListener("click", () => {
  const prompt = promptInput.value.trim();

  if (!prompt) {
    alert("Please enter an outfit prompt first.");
    promptInput.focus();
    return;
  }

  renderOutfit(prompt);
});
