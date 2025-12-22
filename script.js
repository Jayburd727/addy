const conan = document.getElementById("conan");
const cookieCountEl = document.getElementById("cookieCount");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "cookies_fed_count";

function getCount() {
  return Number(localStorage.getItem(STORAGE_KEY) || "0");
}
function setCount(n) {
  localStorage.setItem(STORAGE_KEY, String(n));
  cookieCountEl.textContent = String(n);
}

setCount(getCount());

resetBtn.addEventListener("click", () => setCount(0));

function feedCookie(clientX, clientY) {
  // Spawn cookie at click/tap point
  const cookie = document.createElement("div");
  cookie.className = "cookie";
  cookie.textContent = "🍪";
  document.body.appendChild(cookie);

  // Start position
  cookie.style.left = `${clientX}px`;
  cookie.style.top = `${clientY}px`;

  // End position = center-ish of image
  const rect = conan.getBoundingClientRect();
  const targetX = rect.left + rect.width * 0.52;
  const targetY = rect.top + rect.height * 0.55;

  // Animate cookie flying into Conan
  cookie.animate(
    [
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
      { transform: `translate(${targetX - clientX - 50}px, ${targetY - clientY - 50}px) scale(0.25)`, opacity: 0.15 }
    ],
    { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" }
  ).onfinish = () => cookie.remove();

  // Increase count
  setCount(getCount() + 1);

  // Trigger nom animation
  conan.classList.remove("nom");
  // force reflow to restart animation reliably
  void conan.offsetWidth;
  conan.classList.add("nom");
}

// Use pointerdown so it works for mouse + touch
conan.addEventListener("pointerdown", (e) => {
  e.preventDefault(); // prevents image drag/ghost click on mobile
  feedCookie(e.clientX, e.clientY);
});
