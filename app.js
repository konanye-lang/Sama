/* =========================================================
   app.js — تشغيل الموقع (نسخة سليمة + إيقاف الصوت عند الانتقال)
   ========================================================= */

(function () {
  const $ = (id) => document.getElementById(id);

  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const homeHeader = $("homeHeader");

  const views = {
    categories: $("viewCategories"),
    list: $("viewList"),
    details: $("viewDetails"),
  };

  const categoriesGrid = $("categoriesGrid");
  const listGrid = $("listGrid");
  const listTitle = $("listTitle");

  const detailsName = $("detailsName");
  const detailsImage = $("detailsImage");
  const detailsAudio = $("detailsAudio");

  const subsGrid = $("subsGrid");
  const toast = $("toast");

  const CATEGORIES = window.CATEGORIES || [];
  const RINGTONES = window.RINGTONES || [];
  const COMPANIES = window.COMPANIES || [];
  const SERVICE_NUMBERS = window.SERVICE_NUMBERS || {};

  let currentCategory = null;

  // ===============================
  // Preview Audio (كما هو)
  // ===============================
  const previewAudio = new Audio();
  previewAudio.preload = "auto";

  let previewPlayingId = null;
  let previewPlayingBtn = null;

  // ===============================
  // 🔴 إيقاف الصوت عند أي انتقال
  // ===============================
  function stopAllAudioNow() {
    try {
      if (previewAudio) {
        previewAudio.pause();
        previewAudio.currentTime = 0;
      }
      if (detailsAudio) {
        detailsAudio.pause();
        detailsAudio.currentTime = 0;
      }
      previewPlayingId = null;
      if (previewPlayingBtn) {
        previewPlayingBtn.textContent = "▶";
        previewPlayingBtn = null;
      }
    } catch (_) {}
  }

  // إيقاف الصوت عند الرجوع أو الخروج أو تغيير التبويب
  window.addEventListener("popstate", stopAllAudioNow);
  window.addEventListener("pagehide", stopAllAudioNow);
  window.addEventListener("beforeunload", stopAllAudioNow);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAllAudioNow();
  });

  // إيقاف الصوت عند أي رابط (SMS أو خارجي)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) stopAllAudioNow();
  }, true);

  function toastMsg(msg) {
    if (!toast) return;
    toast.textContent = msg || "";
    setTimeout(() => (toast.textContent = ""), 2500);
  }

  function safe(s) { return (s ?? "").toString(); }

  // ---------- Categories ----------
  function renderCategories() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const div = document.createElement("div");
      div.className = "card category-card";
      div.innerHTML = `<div class="category-title">${safe(cat)}</div>`;
      div.onclick = () => openCategory(cat);
      categoriesGrid.appendChild(div);
    });
  }

  // ---------- List ----------
  function setPlayIcon(btn, isPlaying) {
    if (!btn) return;
    btn.textContent = isPlaying ? "❚❚" : "▶";
  }

  function toneCard(t) {
    const div = document.createElement("div");
    div.className = "tone-card";

    div.innerHTML = `
      <div class="tone-thumb-wrap">
        <img class="tone-thumb" src="${t.image}" alt="${safe(t.title)}"
             onerror="this.src='ringtones/images/placeholder.png'">
      </div>

      <div class="tone-name">${safe(t.title)}</div>

      <div class="tone-actions">
        <button class="btn btn-soft tone-play" type="button">▶</button>
        <button class="btn btn-soft tone-subscribe" type="button">اشتراك</button>
      </div>
    `;

    const playBtn = div.querySelector(".tone-play");
    const subBtn = div.querySelector(".tone-subscribe");

    playBtn.addEventListener("click", () => {
      try {
        if (previewPlayingId === t.id && !previewAudio.paused) {
          stopAllAudioNow();
          return;
        }

        stopAllAudioNow();
        previewPlayingId = t.id;
        previewPlayingBtn = playBtn;
        previewAudio.src = t.audio;

        previewAudio.play().then(() => {
          setPlayIcon(playBtn, true);
        }).catch(() => {
          setPlayIcon(playBtn, false);
        });

      } catch {
        setPlayIcon(playBtn, false);
        toastMsg("تعذر تشغيل الصوت");
      }
    });

    subBtn.onclick = () => {
      stopAllAudioNow();
      openDetails(t.id);
    };

    return div;
  }

  function renderList(items) {
    if (!listGrid) return;
    listGrid.innerHTML = "";
    items.forEach((t) => listGrid.appendChild(toneCard(t)));
  }

  function openCategory(cat) {
    stopAllAudioNow();
    currentCategory = cat;
    const list = RINGTONES.filter((t) => t.categories.includes(cat));
    if (listTitle) listTitle.textContent = cat;
    renderList(list);
    showView("list");
  }

  // ---------- Details ----------
  function renderSubscriptions(t) {
    if (!subsGrid) return;
    subsGrid.innerHTML = "";

    COMPANIES.forEach((c) => {
      const cfg = (t.codes || {})[c.key] || {};
      const number = SERVICE_NUMBERS[c.key] || "";
      const code = cfg.code || "";

      const item = document.createElement("div");
      item.className = "sub-item";

      item.innerHTML = `
        <button class="btn btn-soft sub-btn" type="button">اشتراك</button>
        <div class="sub-right">
          <div class="sub-head"></div>
          <div class="company-name">${safe(c.name)}</div>
          <div class="company-code">الكود: <span class="mono">${safe(code)}</span></div>
          <div class="company-number">رقم الخدمة: <span class="mono">${safe(number)}</span></div>
        </div>
      `;

      item.querySelector("button").onclick = () => {
        stopAllAudioNow();
        if (!number || !code) {
          toastMsg("المعذرة، هذه النغمة غير موجودة في هذه الشركة");
          return;
        }
        window.location.href = `sms:${number}?&body=${encodeURIComponent(code)}`;
      };

      subsGrid.appendChild(item);
    });
  }

  function openDetails(id) {
    stopAllAudioNow();
    const t = RINGTONES.find((x) => String(x.id) === String(id));
    if (!t) return;

    if (detailsName) detailsName.textContent = t.title;
    if (detailsImage) detailsImage.src = t.image;
    if (detailsAudio) detailsAudio.src = t.audio;

    renderSubscriptions(t);
    showView("details");
  }

  function showView(name) {
    stopAllAudioNow(); // 🔒 إيقاف الصوت عند أي انتقال
    Object.values(views).forEach((v) => v && v.classList.add("hidden"));
    if (views[name]) views[name].classList.remove("hidden");
    if (homeHeader) homeHeader.style.display = (name === "categories") ? "" : "none";
    window.scrollTo(0, 0);
  }

  renderCategories();
})();