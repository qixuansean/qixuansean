"use strict";

/* ==========================================================================
   SEAN QIXUAN — MONOLITH 4.0
   Robust, progressively enhanced. Content is visible without JavaScript.
   ========================================================================== */

(function () {
  // Always start at the top, never restore a previous scroll position.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  // A hard refresh should land on the hero, even if the browser restored late.
  var navEntry =
    window.performance && performance.getEntriesByType
      ? performance.getEntriesByType("navigation")[0]
      : null;
  if (navEntry && navEntry.type === "reload") {
    window.addEventListener("load", function () { window.scrollTo(0, 0); });
  }

  var hasGSAP =
    typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  /* ------------------------------------------------------------------ i18n */

  var I18N = {
    en: {
      "hero-role": "INDEPENDENT DEVELOPER — MALAYSIA / UTC+8",
      "hero-hint": "SCROLL",
      statement: "An independent full-stack developer in Malaysia building high-concurrency Rust systems, Python automation, and Next.js web applications.",
      "student-title": "FOR STUDENTS",
      "student-lede":
        "Tools that remove the boring parts of university, so the work you keep is the work that matters.",
      "stu1-t": "Academic toolkit",
      "stu1-d":
        "Coursework templates, citation cleanup and formatting pipelines that turn a messy draft into a submittable paper.",
      "stu2-t": "Campus auto-login",
      "stu2-d":
        "A quiet daemon that re-authenticates your campus network after sleep, without touching your password.",
      "stu3-t": "LaTeX & papers",
      "stu3-d": "IEEE and ACM templates, reference checks, and a clean build every single time.",
      "stu4-t": "Student rate",
      "stu4-d":
        "Same engineering standard, 80% of market rate. Student bundles start at $40 with source code included.",
      "archive-cta": "START A PROJECT →",
      depth: "From custom web scraping scripts and ETL data pipelines to scalable AI agents, engineered cleanly with full source code ownership.",
      "pricing-title": "80% OF MARKET",
      "pricing-lede":
        "No agency markup, no account managers. You pay for engineering time, and you keep the source code.",
      "pricing-biz-tag": "[ FOR BUSINESS / 商业接单 ]",
      "price1-name": "SIMPLE TASKS & SCRIPTS",
      "price1-desc":
        "CLI tools, basic web scrapers, and workflow automation. <b class='accent-text'>Saves 90% manual time.</b>",
      "price1-price": "[ START: $20 ]",
      "price2-name": "MEDIUM PIPELINES & APPS",
      "price2-desc":
        "Complex ETL pipelines, full-stack web apps, and API integrations. <b class='accent-text'>Saves 80% dev time.</b>",
      "price2-price": "[ START: $80 ]",
      "price3-name": "COMPLEX SYSTEMS & AUDITS",
      "price3-desc":
        "Rust P2P networks, security audits, and high-concurrency backends. <b class='accent-text'>Saves 65% enterprise costs.</b>",
      "price3-price": "[ START: $250 ]",
      "pricing-stu-tag": "[ FOR STUDENTS / 学生特惠 ]",
      "price4-name": "BASIC CODE DEBUGGING",
      "price4-desc":
        "Fixing logic errors and environment setups. <i>Valid student ID required.</i>",
      "price4-price": "[ START: $10 ]",
      "price5-name": "COURSEWORK & TEMPLATES",
      "price5-desc":
        "LaTeX generators, standard algorithms, and UI templates. <i>Valid student ID required.</i>",
      "price5-price": "[ START: $30 ]",
      "price6-name": "FINAL PROJECT ASSISTANCE",
      "price6-desc":
        "Architecture design, core logic implementation, and code review. <i>Valid student ID required.</i>",
      "price6-price": "[ START: $80 ]",
      p1t: "01 — SOLÉRA",
      p1d: "An editorial travel experience built around light, time, and discovery. ",
      p2t: "02 — QORVYN",
      p2d: "A community platform built to connect people through knowledge and conversation.",
      p3t: "03 — SWIMFLOW",
      p3d: "A smarter approach to structured learning and student progression.",
      "process-title": "FOUR STEPS, NO DRAMA.",
      step1: "Scope",
      step1d: "A short call, a written spec, a fixed price.",
      step2: "Build",
      step2d: "Weekly builds you can run yourself.",
      step3: "Review",
      step3d: "Two revision rounds, tested on real data.",
      step4: "Ship",
      step4d: "Source code, docs and 30 days of support.",
      "status-title": "Transparent freelance software engineering at 80% of agency rates—delivering production-ready code with zero middleman markup.",
      quote: "Specializing in P2P network architecture, ClickHouse analytics, and backend performance audits for startups and researchers.",
      "contact-title": "LET'S BUILD.",
      footer: "DESIGNED & BUILT WITH STRICT LOGIC — 2026",
      "footer-top": "BACK TO TOP ↑"
    },
    zh: {
      "hero-role": "独立开发者 — 马来西亚 / UTC+8",
      "hero-hint": "向下滚动",
      statement: "马来西亚独立全栈开发者，专注于高性能 Rust 系统架构、Python 自动化脚本与 Next.js 网页开发。 —— 全栈开发",
      "student-title": "大学生专栏",
      "student-lede": "把大学里枯燥的部分交给我，你只需要保留真正重要的研究。",
      "stu1-t": "学术工具箱",
      "stu1-d": "课程论文模板、引用清洗与格式流水线，把凌乱草稿变成可以直接提交的论文。",
      "stu2-t": "校园网自动登录",
      "stu2-d": "一个安静的后台服务，睡眠或换网后自动重新认证，不接触你的密码。",
      "stu3-t": "LaTeX 与论文",
      "stu3-d": "IEEE 与 ACM 模板、参考文献检查，每次编译都干净通过。",
      "stu4-t": "学生价格",
      "stu4-d": "同样的工程标准，市场价的 80%。学生套餐 $40 起，包含源代码。",
      "archive-cta": "开始一个项目 →",
      depth: "提供定制网页数据采集、ETL 数据管道搭建与 AI 智能体开发，交付即享完整源代码所有权。 —— 软件外包",
      "pricing-title": "市场价的 80%",
      "pricing-lede": "没有中间商加价，没有客户经理。你只为工程时间付费，源码归你。",
      "pricing-biz-tag": "[ 商业接单 / FOR BUSINESS ]",
      "price1-name": "简单任务与脚本",
      "price1-desc":
        "命令行工具、基础网页爬虫与工作流自动化。<b class='accent-text'>节省 90% 人工时间。</b>",
      "price1-price": "[ 起步: $20 ]",
      "price2-name": "中型管道与应用",
      "price2-desc":
        "复杂 ETL 管道、全栈 Web 应用与 API 集成。<b class='accent-text'>节省 80% 开发时间。</b>",
      "price2-price": "[ 起步: $80 ]",
      "price3-name": "复杂系统与审计",
      "price3-desc":
        "Rust P2P 网络、安全审计与高并发后端。<b class='accent-text'>节省 65% 企业成本。</b>",
      "price3-price": "[ 起步: $250 ]",
      "pricing-stu-tag": "[ 学生特惠 / FOR STUDENTS ]",
      "price4-name": "基础代码调试",
      "price4-desc":
        "修复逻辑错误与环境配置问题。<i>需提供有效学生证件。</i>",
      "price4-price": "[ 起步: $10 ]",
      "price5-name": "课程作业与模板",
      "price5-desc":
        "LaTeX 生成器、标准算法与 UI 模板。<i>需提供有效学生证件。</i>",
      "price5-price": "[ 起步: $30 ]",
      "price6-name": "毕业设计协助",
      "price6-desc":
        "架构设计、核心逻辑实现与代码评审。<i>需提供有效学生证件。</i>",
      "price6-price": "[ 起步: $80 ]",
      p1t: "01 — SOLÉRA",
      p1d: "一个互动式旅行平台，包含动态目的地探索、高级筛选、已保存行程、沉浸式图库以及基于位置的日照计算。",
      p2t: "02 — QORVYN",
      p2d: "一个通过知识与对话连接彼此的社区平台。",
      p3t: "03 — SWIMFLOW",
      p3d: "一种更智能的结构化学习与学生进阶方式。",
      "process-title": "四个步骤，没有意外。",
      step1: "确定范围",
      step1d: "一次短会，一份书面规格，一个固定价格。",
      step2: "开发",
      step2d: "每周交付可以自己运行的版本。",
      step3: "评审",
      step3d: "两轮修改，并在真实数据上测试。",
      step4: "交付",
      step4d: "源代码、文档，以及 30 天维护。",
      "status-title": "专为大学生打造的编程作业辅助、IEEE/ACM LaTeX 论文排版模板与代码报错排查服务。 —— 代码辅导",
      quote: "透明合理的独立工程师报价（仅为市场价 80%），无中介差价，按周交付可运行源码。 —— 接单开发。",
      "contact-title": "开始构建。",
      footer: "严谨逻辑设计与构建 — 2026",
      "footer-top": "回到顶部 ↑"
    }
  };

  /* localStorage can throw in private mode or when the origin is opaque. */
  function readLang() {
    try {
      return window.localStorage.getItem("site-lang") === "zh" ? "zh" : "en";
    } catch (e) {
      return "en";
    }
  }

  function writeLang(lang) {
    try {
      window.localStorage.setItem("site-lang", lang);
    } catch (e) {
      /* Preference simply won't persist; the page still works. */
    }
  }

  var currentLang = readLang();

  function applyLanguage(lang) {
    var dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    // Copy that carries its own emphasis (<b class="accent-text">, <i>) is
    // swapped as markup; textContent would print the tags. Only authored
    // dictionary strings ever reach innerHTML.
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key]) el.innerHTML = dict[key];
    });

    // Rebuild split text so newly translated copy reveals correctly.
    document.querySelectorAll("[data-split]").forEach(splitElement);
    document.querySelectorAll("[data-flip]").forEach(splitFlip);

    var btn = document.getElementById("lang");
    if (btn) btn.textContent = lang === "en" ? "EN / 中" : "中 / EN";

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    writeLang(lang);
    currentLang = lang;
  }

  /* --------------------------------------------------------- text splitting */

  function splitElement(el) {
    var raw = (el.textContent || "").trim();
    if (!raw) return;

    var instant = el.classList.contains("is-in");
    var parts = /\s/.test(raw) ? raw.split(/\s+/) : Array.from(raw);

    el.textContent = "";
    parts.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "w";
      span.style.setProperty("--i", i);

      var inner = document.createElement("i");
      inner.textContent = word;
      span.appendChild(inner);
      el.appendChild(span);

      if (/\s/.test(raw)) el.appendChild(document.createTextNode(" "));
    });

    // Re-splitting must not replay an animation that already finished.
    if (instant) el.classList.add("rv-now");
  }

  /* Venetian-blind title: one 3D slat per word. */
  function splitFlip(el) {
    var raw = (el.textContent || "").trim();
    if (!raw) return;

    var instant = el.classList.contains("is-in");
    var parts = /\s/.test(raw) ? raw.split(/\s+/) : Array.from(raw);

    el.textContent = "";
    parts.forEach(function (word, i) {
      var span = document.createElement("span");
      span.className = "fl";
      span.style.setProperty("--i", i);

      var inner = document.createElement("i");
      inner.textContent = word;
      span.appendChild(inner);
      el.appendChild(span);

      if (/\s/.test(raw)) el.appendChild(document.createTextNode(" "));
    });

    if (instant) el.classList.add("rv-now");
  }

  /* ------------------------------------------------------------ hero morph */

  function buildMorph(el, slices) {
    if (!el) return;
    var front = el.getAttribute("data-front") || "";
    var back = el.getAttribute("data-back") || "";
    var count = slices || 12;

    el.textContent = "";

    for (var i = 0; i < count; i++) {
      var slice = document.createElement("div");
      slice.className = "slice";
      slice.style.flex = "0 0 " + 100 / count + "%";

      var f = document.createElement("div");
      f.className = "face face--front";
      f.textContent = front;
      f.style.width = count * 100 + "%";
      f.style.left = "-" + i * 100 + "%";

      var b = document.createElement("div");
      b.className = "face face--back";
      b.textContent = back;
      b.style.width = count * 100 + "%";
      b.style.left = "-" + i * 100 + "%";

      slice.appendChild(f);
      slice.appendChild(b);
      el.appendChild(slice);
    }
  }

  /* ------------------------------------------------------------------ clock */

  function startClock() {
    var el = document.getElementById("clock");
    if (!el) return;

    function tick() {
      var now = new Date();
      var utc8 = new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 60000);
      var pad = function (n) { return String(n).padStart(2, "0"); };
      el.textContent =
        pad(utc8.getHours()) + ":" + pad(utc8.getMinutes()) + ":" + pad(utc8.getSeconds()) + " UTC+8";
    }

    tick();
    setInterval(tick, 1000);
  }

  /* --------------------------------------------------------- pricing fetch */

  function syncPricing() {
    if (!window.fetch) return;
    // The 07 rate card is static copy now; only the old bar chart had
    // rows for the API to fill in.
    if (!document.querySelector(".bar-row")) return;
    fetch("/api/pricing")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !Array.isArray(data.items)) return;
        var rows = document.querySelectorAll(".bar-row");
        data.items.forEach(function (item, i) {
          var row = rows[i];
          if (!row) return;
          var val = row.querySelector(".bar-val");
          var note = row.querySelector(".bar-note");
          var price = Number(item.price);
          var market = Number(item.original) || Math.round(price / 0.8);
          if (price) {
            // Keep data-price in sync with the API so the scroll scrub
            // counts to the real number, not the static fallback.
            row.setAttribute("data-price", String(price));
            if (val) val.textContent = "$" + price;
          }
          if (note) {
            // Write through the i18n table, not straight into the node:
            // the fetch resolves after applyLanguage() on load, so a direct
            // write would flip a persisted Chinese page back to English.
            var key = "note" + (i + 1);
            var enNote = "MARKET $" + market + " · YOU SAVE $" + (market - price);
            var zhNote = "市场价 $" + market + " · 省 $" + (market - price);
            I18N.en[key] = enNote;
            I18N.zh[key] = zhNote;
            note.textContent = currentLang === "zh" ? zhNote : enNote;
          }
        });
      })
      .catch(function () { /* static fallback already in the markup */ });
  }

  /* ------------------------------------------------------------------- init */

  function init() {
    buildMorph(document.getElementById("morph"), 12);
    startClock();
    syncPricing();

    document.querySelectorAll("[data-split]").forEach(splitElement);
    applyLanguage(currentLang);

    var langBtn = document.getElementById("lang");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        applyLanguage(currentLang === "en" ? "zh" : "en");
        syncReveals();
        if (hasGSAP) window.ScrollTrigger.refresh();
      });
    }

    /* Reveal system: scroll-synced, self-healing and GPU friendly.
       Anything the reader has already passed jumps straight to its final
       state, so an animation can never lag behind the scroll position. */
    var revealSets = [
      { selector: ".tile", cls: "rv-wipe" },
      { selector: ".step", cls: "rv-scale" },
      { selector: ".contact-link", cls: "rv-slide" },
      { selector: ".radar", cls: "rv-iris" }
    ];

    /* Nodes GSAP is already scrolling for us. They must NOT get a CSS
       reveal class on top: a CSS transition on transform/opacity would
       re-ease every scrubbed frame and make the motion lag the scroll. */
    var GSAP_OWNED = {
      ".tile": 1,
      ".step": 1,
      ".contact-link": 1
    };

    revealSets.forEach(function (set) {
      if (hasGSAP && GSAP_OWNED[set.selector]) return;
      document.querySelectorAll(set.selector).forEach(function (el, i) {
        el.classList.add(set.cls);
        el.style.setProperty("--i", i);
      });
    });

    var REVEAL_SELECTOR =
      "[data-split], [data-flip], .rv-wipe, .rv-scale, .rv-bar, .rv-slide, .rv-iris, .idx";

    var revealItems = Array.prototype.slice.call(
      document.querySelectorAll(REVEAL_SELECTOR)
    );

    function reveal(el, instant) {
      if (el.classList.contains("is-in")) return;
      if (instant) el.classList.add("rv-now");
      el.classList.add("is-in");
    }

    var lastY = window.pageYOffset || 0;
    var lastT = performance.now();
    var fastUntil = 0;
    var rafPending = false;

    function syncReveals() {
      var vh = window.innerHeight || 800;
      var fast = performance.now() < fastUntil;

      for (var i = 0; i < revealItems.length; i++) {
        var el = revealItems[i];

        // GSAP's pinned sections (hero, archive) drive their own
        // scrubbed animations; the CSS reveal engine must not touch the
        // pinned element itself, but it must still finish any *child*
        // (e.g. the pricing section title) that is not scrubbed by GSAP.
        if (el.classList.contains("pin-spacer")) continue;

        var r = el.getBoundingClientRect();

        if (el.classList.contains("is-in")) {
          // Already running but moving into the reading zone: finish it now
          // so the reader never sees a half-revealed line slide past.
          if (!el.classList.contains("rv-now") && r.top < vh * 0.5) {
            el.classList.add("rv-now");
          }
          continue;
        }

        if (r.bottom < 0) {
          reveal(el, true);
        } else if (r.bottom > 0 && r.top < vh) {
          // A jump or fast flick can land an element deep in the viewport;
          // in that case show the finished state instead of animating late.
          reveal(el, fast || r.top < vh * 0.6);
        }
      }
    }

    function scheduleSync() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () {
        rafPending = false;
        syncReveals();
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        var y = window.pageYOffset || 0;
        var now = performance.now();
        var dt = Math.max(16, now - lastT);
        var velocity = Math.abs(y - lastY) / dt; // px per ms

        if (velocity > 1.2) fastUntil = now + 250;
        lastY = y;
        lastT = now;
        scheduleSync();
        // The last chapter's range stops short of the true page bottom
        // (pins and the footer sit below it), so hold XIII lit there.
        if (y > 0 && y >= document.documentElement.scrollHeight - window.innerHeight - 2) {
          setActive("contact");
        }
      },
      { passive: true }
    );

    window.addEventListener("resize", scheduleSync);
    window.addEventListener("orientationchange", scheduleSync);
    window.addEventListener("load", scheduleSync);

    syncReveals();

    /* Mobile archive strip: the header line follows the swipe position. */
    var archiveViewport = document.querySelector(".archive-viewport");
    var archiveProg = document.querySelector(".archive-progress i");
    if (archiveViewport && archiveProg) {
      archiveViewport.addEventListener(
        "scroll",
        function () {
          var max = archiveViewport.scrollWidth - archiveViewport.clientWidth;
          var p = max > 0 ? archiveViewport.scrollLeft / max : 0;
          archiveProg.style.transform = "scaleX(" + p + ")";
        },
        { passive: true }
      );
    }

    /* Custom Awwwards-style interactive cursor */
    var cursorDot = document.getElementById("cursor-dot");
    var cursorRing = document.getElementById("cursor-ring");
    if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
      var cursorX = 0, cursorY = 0, ringX = 0, ringY = 0;
      var isHover = false, isClickable = false;

      function moveCursor(x, y) {
        cursorX = x;
        cursorY = y;
        cursorDot.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
      }

      function moveRing() {
        ringX += (cursorX - ringX) * 0.18;
        ringY += (cursorY - ringY) * 0.18;
        cursorRing.style.transform = "translate3d(" + ringX + "px, " + ringY + "px, 0)";
        requestAnimationFrame(moveRing);
      }
      moveRing();

      document.addEventListener("mousemove", function (e) {
        moveCursor(e.clientX, e.clientY);
      });

      document.addEventListener("mousedown", function () {
        cursorRing.classList.add("is-clickable");
      });
      document.addEventListener("mouseup", function () {
        cursorRing.classList.remove("is-clickable");
      });

      document.querySelectorAll("a, button, .tile, .panel, .step, .contact-link, .node, .link-arrow").forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursorRing.classList.add("is-hover");
        });
        el.addEventListener("mouseleave", function () {
          cursorRing.classList.remove("is-hover");
        });
      });
    }

    /* Navigation */
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".node"));

    function setActive(id) {
      nodes.forEach(function (n) {
        n.classList.toggle("is-active", n.getAttribute("data-target") === id);
      });
    }

    /* A pinned chapter's layout top sits *after* its pin spacer, so a plain
       scroll to its offsetTop would land past the animation and skip it.
       Aim at the trigger's start instead, where the pin actually begins.
       Scenes that open on an empty frame (rings not yet burst, cards not
       yet dropped, links not yet chambered) instead land on the finished
       frame, so a nav jump never shows a blank screen. */
    var LAND_ON_PIN_END = { philosophy: 1, radar: 1, process: 1, contact: 1 };
    function sectionTop(el) {
      if (hasGSAP && window.ScrollTrigger) {
        var all = ScrollTrigger.getAll();
        for (var i = 0; i < all.length; i++) {
          if (all[i].trigger === el && all[i].pin) {
            if (LAND_ON_PIN_END[el.id]) {
              return Math.max(all[i].start, all[i].end - 1);
            }
            return all[i].start;
          }
        }
      }
      return el.getBoundingClientRect().top + window.pageYOffset;
    }

    nodes.forEach(function (node) {
      node.addEventListener("click", function () {
        var target = document.getElementById(node.getAttribute("data-target"));
        if (!target) return;
        window.scrollTo({
          top: Math.max(0, Math.round(sectionTop(target))),
          behavior: "smooth"
        });
      });
    });

    // Deep links (#archive, #pricing …) must resolve to the pin start too.
    window.addEventListener("hashchange", function () {
      var el = document.getElementById((window.location.hash || "").slice(1));
      if (!el) return;
      window.scrollTo(0, Math.max(0, Math.round(sectionTop(el))));
    });

    var topBtn = document.getElementById("to-top");
    if (topBtn) {
      topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (!hasGSAP) return; // Everything above works without GSAP.
    try {
      gsap.registerPlugin(ScrollTrigger);

      /* Scroll progress */
      var bar = document.getElementById("progress");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: function (self) {
          if (bar) bar.style.transform = "scaleX(" + self.progress + ")";
        }
      });

      /* Hero: pinned at the top. The reader must scroll a full viewport
         before anything below is reachable, so the shutter always
         finishes before the manifesto appears. One pinned trigger
         drives every hero motion on the same scrubbed progress. */
      var heroRange = "+=" + Math.round(window.innerHeight * 1.2);

      // Cache the nodes once — querying inside onUpdate would run on
      // every scroll frame and make the hero stutter.
      var heroBacks = Array.prototype.slice.call(
        document.querySelectorAll(".morph .face--back")
      );
      var heroMorph = document.getElementById("morph");
      var heroMeta = Array.prototype.slice.call(
        document.querySelectorAll(".hero-top, .hero-bottom")
      );

      var heroTrigger = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: heroRange,
        pin: true,
        scrub: true,
        // Pins stack down the document; they must be measured top-down
        // or every lower pin's start is off by the pin above it.
        refreshPriority: 3,
        anticipatePin: 1,
        onUpdate: function (self) {
          var p = self.progress;
          var count = heroBacks.length || 1;
          // Match the GSAP stagger: each slat starts 0.05 of the tween
          // later than the one before, so the bar opens like blinds.
          var slat = 0.05;
          var span = 0.55 + (count - 1) * slat;
          var travel = Math.round(window.innerHeight * 0.16);

          for (var i = 0; i < heroBacks.length; i++) {
            var local = (p * span - i * slat) / 0.5;
            if (local < 0) local = 0;
            else if (local > 1) local = 1;
            heroBacks[i].style.transform =
              "rotateX(" + (-90 + 90 * local) + "deg)";
            // Each slat only becomes visible once it starts to open.
            heroBacks[i].style.opacity = local > 0.02 ? "1" : "0";
          }

          if (heroMorph) {
            heroMorph.style.transform = "translateY(" + travel * p + "px)";
          }

          // Meta fades out over the last ~40% of the pin. Driven by p
          // directly (not by the slat span) so it always reaches zero.
          var fadeP = Math.max(0, Math.min(1, (p - 0.6) / 0.4));
          for (var j = 0; j < heroMeta.length; j++) {
            // Fade fully out by the end of the pin: the hero meta must
            // not linger behind the fixed nav while the section leaves.
            heroMeta[j].style.opacity = String(1 - fadeP);
          }
        }
      });

      gsap.from(".hero-top, .hero-bottom", {
        y: 10,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        // Clear the inline transform so the CSS hover lift still works.
        clearProps: "transform"
      });

      /* Chapter index numbers wipe in one by one as the reader crosses
         each section — a running film-strip cue. Each number gets its
         own trigger: a single shared trigger would reveal every number
         on the page the moment the first one was crossed. */
      Array.prototype.forEach.call(document.querySelectorAll(".idx"), function (el) {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 96%",
              end: "top 68%",
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );
      });

      /* The archive header line ("05 / 13 — SELECTED WORK") wipes in
         like the numbered chapter cues, so the horizontal chapter also
         announces itself. */
      var archiveHead = document.querySelector(".archive-head");
      if (archiveHead) {
        gsap.fromTo(
          archiveHead,
          { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#archive",
              start: "top 92%",
              end: "top 55%",
              scrub: true
            }
          }
        );
      }

      /* Student bento tiles wipe open from the top like index cards,
         with the wide dark card landing last. A clip wipe (rather than
         an opacity fade) keeps the black card truly black all the way
         through the reveal instead of washing it out to grey. */
      gsap.fromTo(
        ".tile",
        { clipPath: "inset(0% 0% 100% 0%)", y: 26 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          stagger: { each: 0.08, from: "start" },
          ease: "none",
          scrollTrigger: {
            trigger: "#student",
            start: "top 78%",
            // Finish while the bento is arriving, not while it is being
            // read: a wipe still running at eye level slices the copy.
            end: "top 26%",
            scrub: true
          }
        }
      );

      /* Stack marquees fade in and speed up slightly as they enter,
         then settle into their endless crawl. */
      gsap.fromTo(
        ".marquee",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: "#stack",
            start: "top 80%",
            end: "bottom 50%",
            scrub: true
          }
        }
      );

      /* Every chapter's lede paragraph slides up as its section arrives,
         so no block of copy is statically pinned to the screen. */
      document.querySelectorAll(".lede").forEach(function (lede) {
        var section = lede.closest(".chapter");
        gsap.fromTo(
          lede,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section || lede,
              start: "top 76%",
              end: "top 42%",
              scrub: true
            }
          }
        );
      });

      /* =================================================================
        06 DEPTH — UPGRADED: chromatic split + scanline + particles
        Compression → Chromatic charge → Release
        ================================================================= */

      var depthSection = document.getElementById("depth");
      var depthStatement = depthSection && depthSection.querySelector(".statement");

      if (depthStatement) {
        // Stash original text as data-text for the CSS ghost layers.
        depthStatement.setAttribute("data-text", depthStatement.textContent.trim());

        // Build particle field inside the section.
        var particleCount = 14;
        for (var dp = 0; dp < particleCount; dp++) {
          var particle = document.createElement("i");
          particle.className = "depth-particle";
          particle.style.left = (8 + Math.random() * 84) + "%";
          particle.style.top = (10 + Math.random() * 80) + "%";
          depthSection.appendChild(particle);
        }
        var depthParticles = depthSection.querySelectorAll(".depth-particle");

        // Scanline element.
        var scan = document.createElement("div");
        scan.className = "depth-scan";
        depthSection.appendChild(scan);

        var depthTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#depth",
            start: "top 90%",
            end: "center 40%",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
              // Toggle the chromatic class while the statement is compressed.
              depthSection.classList.toggle(
                "is-charging",
                self.progress > 0.15 && self.progress < 0.75
              );
            },
            onLeave: function () { depthSection.classList.remove("is-charging"); },
            onLeaveBack: function () { depthSection.classList.remove("is-charging"); }
          }
        });

        // 1 — Compression: shrink, blur, tighten.
        depthTl.fromTo(
          depthStatement,
          {
            y: 70,
            scale: 0.82,
            opacity: 0,
            filter: "blur(14px)",
            letterSpacing: "-0.09em"
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: "-0.035em",
            ease: "none",
            duration: 1
          },
          0
        );

        // 2 — Chromatic ghosts drift apart then snap back.
        depthTl.fromTo(
          depthStatement,
          { "--chroma": 0 },
          { "--chroma": 1, duration: 0.5, ease: "none" },
          0.1
        );
        depthTl.to(
          depthStatement,
          { "--chroma": 0, duration: 0.5, ease: "none" },
          0.6
        );

        // 3 — Scanline sweeps down through the text.
        depthTl.fromTo(
          scan,
          { y: "-40vh", opacity: 0 },
          { y: "40vh", opacity: 1, duration: 0.4, ease: "none" },
          0.25
        );
        depthTl.to(scan, { opacity: 0, duration: 0.2, ease: "none" }, 0.65);

        // 4 — Particles burst outward as the statement settles.
        depthParticles.forEach(function (p, i) {
          var angle = (i / particleCount) * Math.PI * 2;
          var dist = 60 + Math.random() * 120;
          depthTl.fromTo(
            p,
            { scale: 0, opacity: 0, x: 0, y: 0 },
            {
              scale: 1,
              opacity: 1,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              duration: 0.5,
              ease: "power2.out"
            },
            0.35 + i * 0.012
          );
          depthTl.to(p, { opacity: 0, scale: 0.4, duration: 0.3, ease: "none" }, 0.85);
        });

        // 5 — Accent colour pulse on the statement.
        gsap.to(depthStatement, {
          color: "#7195C8",
          ease: "none",
          scrollTrigger: {
            trigger: "#depth",
            start: "top 48%",
            end: "center 28%",
            scrub: 0.5
          }
        });

        // 6 — Index cue.
        var depthIdx = depthSection.querySelector(".idx");
        if (depthIdx) {
          gsap.fromTo(
            depthIdx,
            { opacity: 0, x: -18 },
            {
              opacity: 1,
              x: 0,
              color: "#7195C8",
              ease: "none",
              scrollTrigger: {
                trigger: "#depth",
                start: "top 88%",
                end: "top 52%",
                scrub: 0.65
              }
            }
          );
        }
      }

      /* =================================================================
         08 PHILOSOPHY — black stage + “LESS, BUT BETTER.” lives inside
         the black frame, then the paper returns.
         ================================================================= */
      var philosophySection = document.getElementById("philosophy");
      if (philosophySection) {
        var pageBody = document.body;
        var paperBg = getComputedStyle(pageBody).backgroundColor;
        var inkColor = getComputedStyle(pageBody).color;
        var darkOn = false;
        var setDark = function (on) {
          if (on === darkOn) return;
          darkOn = on;
          pageBody.classList.toggle("dark-mode-active", on);
        };

        // Ensure the line-assembly SVG exists
        if (!philosophySection.querySelector(".line-assembly-svg")) {
          philosophySection.insertAdjacentHTML(
            "beforeend",
            '<svg class="line-assembly-svg" viewBox="0 0 1000 600" aria-hidden="true">' +
              '<path class="fly-line" d="M 100,100 L 500,300" />' +
              '<path class="fly-line" d="M 900,100 L 500,300" />' +
              '<path class="fly-line" d="M 500,50 L 500,300" />' +
              '<path class="fly-line" d="M 200,500 L 500,300" />' +
              '<path class="fly-line" d="M 800,500 L 500,300" />' +
            "</svg>"
          );
        }

        var flyPaths = philosophySection.querySelectorAll(".fly-line");
        var outline = document.getElementById("outline");

        var lineTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#philosophy",
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: function (self) {
              // Stay black for most of the pin so the title can live inside it
              setDark(self.progress > 0.04 && self.progress < 0.88);
            },
            onLeave: function () { setDark(false); },
            onLeaveBack: function () { setDark(false); }
          }
        });

        // 1. Paper → black
        lineTl.to(pageBody, {
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          duration: 0.9
        }, 0);

        // 2. Draw the five lines (front-loaded)
        flyPaths.forEach(function (p, i) {
          var length = p.getTotalLength();
          gsap.set(p, {
            strokeDasharray: length,
            strokeDashoffset: length + 1,
            rotation: i * 72,
            svgOrigin: "500 300",
            opacity: 0
          });
          lineTl.to(p, {
            strokeDashoffset: 0,
            rotation: 0,
            duration: 1.8,
            ease: "power2.out"
          }, 0.05);
        });
        lineTl.fromTo(flyPaths, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.05);

        // 3. “LESS, BUT BETTER.” appears and stays fully legible in the black frame
        if (outline) {
          gsap.set(outline, { opacity: 0, scale: 0.92 });
          lineTl.to(outline, {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out"
          }, 0.9);
          // Hold it solid while the reader is still on black
          lineTl.to(outline, { opacity: 1, duration: 0.6 }, 1.6);
        }

        // 4. Paper returns to white + lines scatter
        lineTl.to(pageBody, {
          backgroundColor: paperBg,
          color: inkColor,
          duration: 1
        }, 2.4);

        lineTl.to(flyPaths, {
          strokeDashoffset: function (i, target) { return target.getTotalLength() + 1; },
          rotation: -180,
          opacity: 0,
          duration: 0.9
        }, 2.4);

        // Title gently fades with the return to white
        if (outline) {
          lineTl.to(outline, { opacity: 0.35, duration: 0.6 }, 2.5);
          lineTl.to(outline, { opacity: 1, duration: 0.5 }, 3.1);
        }
      }

      /* 07 — Pricing is a printed rate card now, not a bar chart. The
         rows are wiped up from the baseline one after another while the
         chapter settles, and the starts slide in from their own edges.
         No pin, no count-up: every figure is fixed copy, so a number can
         never be read mid-animation as a wrong price. */
      if (document.querySelector(".pricing-container")) {
        var pricingTl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "#pricing",
            start: "top 88%",
            // Fully legible before an anchor jump to #pricing, which
            // lands with the section top at 0 (progress = 1).
            end: "top 26%",
            scrub: true
          }
        });

        // Category rules arrive first, then the six lines follow in the
        // same order the reader scans them.
        pricingTl.fromTo(
          ".pricing-category",
          { opacity: 0, y: 14 },
          { opacity: 0.5, y: 0, duration: 0.5, stagger: 0.18 },
          0
        );
        pricingTl.fromTo(
          ".pricing-line",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 },
          0.05
        );
        pricingTl.fromTo(
          ".pricing-num",
          { x: -16 },
          { x: 0, duration: 0.5, stagger: 0.07 },
          0.05
        );
        pricingTl.fromTo(
          ".pricing-price",
          { x: 18 },
          { x: 0, duration: 0.5, stagger: 0.07 },
          0.05
        );
      }

      /* =================================================================
        09 RADAR — UPGRADED: reticle + ping ripples + lock-on brackets
        Expand → Sweep → Ping → Acquire → Lock
        ================================================================= */

      var radarSection = document.getElementById("radar");

      if (radarSection) {
        var radarRings = radarSection.querySelectorAll(".radar-ring");
        var radarSweep = radarSection.querySelector(".radar-sweep");
        var radarDot = radarSection.querySelector(".radar-dot");
        var radarCoords = radarSection.querySelector(".coords");

        // Build reticle.
        var reticle = document.createElement("div");
        reticle.className = "radar-reticle";
        radarSection.querySelector(".radar").appendChild(reticle);

        // Build lock-on brackets.
        var lock = document.createElement("div");
        lock.className = "radar-lock";
        lock.innerHTML = "<span></span><span></span><span></span><span></span>";
        radarSection.querySelector(".radar").appendChild(lock);
        var lockCorners = lock.querySelectorAll("span");

        // Build three ping rings.
        var pings = [];
        for (var pr = 0; pr < 3; pr++) {
          var ping = document.createElement("i");
          ping.className = "radar-ping";
          radarSection.querySelector(".radar").appendChild(ping);
          pings.push(ping);
        }

        var radarTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#radar",
            start: "top top",
            end: "+=210%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        // 1 — Rings emerge.
        radarTl.fromTo(
          radarRings,
          { scale: 0.15, opacity: 0, rotation: -90 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power2.out"
          },
          0
        );

        // 2 — Reticle fades in.
        radarTl.fromTo(
          reticle,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          0.2
        );

        // 3 — Sweep begins.
        if (radarSweep) {
          radarTl.fromTo(
            radarSweep,
            { opacity: 0, scale: 0.65, rotation: -45 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "power2.out" },
            0.45
          );
        }

        // 4 — Ping ripples expand outward.
        pings.forEach(function (p, i) {
          radarTl.fromTo(
            p,
            { scale: 0.2, opacity: 0.9 },
            {
              scale: 1.6,
              opacity: 0,
              duration: 0.55,
              ease: "power2.out"
            },
            0.7 + i * 0.18
          );
        });

        // 5 — Target dormant → acquisition.
        if (radarDot) {
          gsap.set(radarDot, {
            scale: 0,
            opacity: 0,
            backgroundColor: "#7195C8",
            transformOrigin: "center center"
          });

          radarTl.to(radarDot, { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" }, 1.25);

          // Lock-on brackets snap inward.
          lockCorners.forEach(function (c, i) {
            radarTl.fromTo(
              c,
              {
                opacity: 0,
                scale: 1.8,
                x: i % 2 === 0 ? -14 : 14,
                y: i < 2 ? -14 : 14
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.35,
                ease: "back.out(2)"
              },
              1.3
            );
          });

          // Acquisition pulse.
          radarTl.to(radarDot, { scale: 1.6, duration: 0.2, ease: "power2.out" }, 1.45);
          radarTl.to(radarDot, { scale: 1, duration: 0.3, ease: "power2.inOut" }, 1.65);

          // Second ping burst on lock.
          pings.forEach(function (p, i) {
            radarTl.fromTo(
              p,
              { scale: 0.3, opacity: 0.8 },
              { scale: 1.9, opacity: 0, duration: 0.4, ease: "power2.out" },
              1.6 + i * 0.1
            );
          });
        }

        // 6 — Coordinates resolve.
        if (radarCoords) {
          radarTl.fromTo(
            radarCoords,
            { opacity: 0, y: 16, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.65,
              ease: "power2.out"
            },
            1.85
          );
        }

        // 7 — Outer ring settles.
        var outerRing = radarSection.querySelector(".radar-ring--2");
        if (outerRing) {
          radarTl.to(
            outerRing,
            { scale: 1.035, opacity: 0.72, duration: 0.45, ease: "sine.inOut" },
            2.2
          );
        }

        // 8 — Reticle + lock fade out as chapter leaves.
        radarTl.to([reticle, lock], { opacity: 0, duration: 0.4, ease: "none" }, 2.6);
      }

      /* =================================================================
        10 PROCESS — sharper line + heavier card drop + title entrance
        ================================================================= */
      var processSection = document.getElementById("process");
      if (processSection) {
        var processPathEl = document.getElementById("process-path");
        if (processPathEl) {
          var pathLen = processPathEl.getTotalLength
            ? processPathEl.getTotalLength()
            : 1000;
          gsap.set(processPathEl, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen
          });
        }

        var processTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#process",
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        // Title settles first
        processTl.fromTo(
          "#process .section-title",
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out"
          },
          0
        );

        // Line draws
        if (processPathEl) {
          processTl.to(
            processPathEl,
            {
              strokeDashoffset: 0,
              duration: 1.35,
              ease: "power2.inOut"
            },
            0.2
          );
        }

        // Cards drop harder with more perspective
        processTl.fromTo(
          ".step",
          {
            y: -140,
            opacity: 0,
            rotateX: -100,
            transformOrigin: "top center",
            transformPerspective: 1100
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.26,
            duration: 1.1,
            ease: "bounce.out"
          },
          0.45
        );
      }

      /* =================================================================
        11 STATUS — UPGRADED: glitch lock-in + scanning beam
        ================================================================= */

      var statusSection = document.getElementById("status");

      if (statusSection) {
        var statusDot = statusSection.querySelector(".dot");
        var statusTitle = statusSection.querySelector(".section-title");
        var statusClock = statusSection.querySelector(".clock");

        // Build glitch copy and scanning beam.
        var glitch = document.createElement("span");
        glitch.className = "status-glitch";
        glitch.textContent = statusTitle ? statusTitle.textContent : "";
        if (statusTitle) statusTitle.parentNode.insertBefore(glitch, statusTitle.nextSibling);

        var beam = document.createElement("div");
        beam.className = "status-beam";
        statusSection.appendChild(beam);

        var statusTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#status",
            start: "top 10%",
            end: "top -10%",
            scrub: 0.65,
            invalidateOnRefresh: true
          }
        });

        // 1 — Indicator activates with a snap.
        if (statusDot) {
          statusTl.fromTo(
            statusDot,
            { scale: 0, opacity: 0, backgroundColor: "#111111" },
            {
              scale: 1,
              opacity: 1,
              backgroundColor: "#7195C8",
              duration: 0.35,
              ease: "back.out(3)"
            },
            0
          );
        }

        // 2 — Title reveal with a quick flicker.
        if (statusTitle) {
          statusTl.fromTo(
            statusTitle,
            { y: 28, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.75,
              ease: "power2.out"
            },
            0.12
          );

          // Flicker: rapidly toggle opacity before locking in.
          statusTl.to(statusTitle, { opacity: 0.3, duration: 0.04, repeat: 5, yoyo: true, ease: "none" }, 0.55);

          // Glitch layer scans across then vanishes.
          statusTl.fromTo(
            glitch,
            { opacity: 0.9, clipPath: "inset(0 100% 0 0)", x: -10 },
            { opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.25, ease: "none" },
            0.6
          );
          statusTl.to(glitch, { opacity: 0, x: 10, duration: 0.2, ease: "none" }, 0.85);
        }

        // 3 — Scanning beam sweeps across the title.
        if (statusTitle) {
          statusTl.fromTo(
            beam,
            { left: "0%", opacity: 0 },
            { left: "100%", opacity: 1, duration: 3, ease: "none" },
            0.5
          );
          statusTl.to(beam, { opacity: 0, duration: 0.15, ease: "none" }, 1);
        }

        // 4 — Clock resolves.
        if (statusClock) {
          statusTl.fromTo(
            statusClock,
            { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.65,
              ease: "power2.out"
            },
            0.42
          );
        }
      }

      /* =================================================================
        12 QUOTE — UPGRADED: 3D word rotation + light streak + echo
        ================================================================= */

      var quoteSection = document.getElementById("quote");

      if (quoteSection) {
        var quoteBlock = quoteSection.querySelector("blockquote");
        var quoteIdx = quoteSection.querySelector(".idx");

        // Build light streak and echo layer.
        var streak = document.createElement("div");
        streak.className = "quote-streak";
        quoteSection.appendChild(streak);

        if (quoteBlock) {
          var echo = document.createElement("blockquote");
          echo.className = "quote-echo";
          echo.textContent = quoteBlock.textContent;
          echo.setAttribute("aria-hidden", "true");
          quoteBlock.parentNode.insertBefore(echo, quoteBlock.nextSibling);

          // 1 — Block container reveals.
          gsap.fromTo(
            quoteBlock,
            { opacity: 0, y: 32, clipPath: "inset(0 0 100% 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              ease: "none",
              scrollTrigger: {
                trigger: "#quote",
                start: "top 78%",
                end: "center 48%",
                scrub: 0.75,
                invalidateOnRefresh: true
              }
            }
          );

          // 2 — Each word rotates in 3D from the X axis.
          var words = quoteBlock.querySelectorAll(".w > i");
          gsap.fromTo(
            words,
            {
              rotateX: -92,
              opacity: 0,
              transformOrigin: "50% 100%",
              transformPerspective: 800
            },
            {
              rotateX: 0,
              opacity: 1,
              stagger: 0.06,
              ease: "back.out(1.6)",
              scrollTrigger: {
                trigger: "#quote",
                start: "top 72%",
                end: "center 52%",
                scrub: 0.9,
                invalidateOnRefresh: true
              }
            }
          );

          // 3 — Light streak sweeps across the quote.
          gsap.fromTo(
            streak,
            { x: "-60%", opacity: 0 },
            {
              x: "120%",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#quote",
                start: "top 65%",
                end: "center 40%",
                scrub: 0.6
              }
            }
          );

          // 4 — Echo layer lags behind, then fades.
          gsap.fromTo(
            echo,
            { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)", scale: 1.02 },
            {
              opacity: 0.18,
              y: 8,
              clipPath: "inset(0 0 0% 0)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: "#quote",
                start: "top 68%",
                end: "center 44%",
                scrub: 1.2
              }
            }
          );
          gsap.to(echo, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#quote",
              start: "center 40%",
              end: "bottom 20%",
              scrub: 0.5
            }
          });
        }

        // 5 — Index anchor.
        if (quoteIdx) {
          gsap.fromTo(
            quoteIdx,
            { opacity: 0, x: -12, color: "#111111" },
            {
              opacity: 1,
              x: 0,
              color: "#7195C8",
              ease: "none",
              scrollTrigger: {
                trigger: "#quote",
                start: "top 86%",
                end: "top 56%",
                scrub: 0.65
              }
            }
          );
        }
      }

      /* =================================================================
         13 CONTACT — tighter, more dramatic chambering
         ================================================================= */
      var contactSection = document.getElementById("contact");
      if (contactSection) {
        var contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#contact",
            start: "top top",
            end: "+=110%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
          }
        });

        contactTl.fromTo(
          ".contact-title",
          { scale: 0.78, opacity: 0, y: 60 },
          { scale: 1, opacity: 1, y: 0, duration: 1.4, ease: "power3.out" },
          0
        );

        contactTl.fromTo(
          ".contact-link",
          { x: -120, opacity: 0, skewX: 18 },
          { x: 0, opacity: 1, skewX: 0, stagger: 0.18, duration: 0.95, ease: "power3.out" },
          0.25
        );

        var signaturePath = contactSection.querySelector(".signature-svg path");
        if (signaturePath) {
          var signatureLength = signaturePath.getTotalLength();
          if (signatureLength) {
            gsap.set(signaturePath, {
              strokeDasharray: signatureLength,
              strokeDashoffset: signatureLength
            });
            contactTl.fromTo(
              ".signature",
              { opacity: 0 },
              { opacity: 1, duration: 0.35 },
              0.55
            );
            contactTl.to(signaturePath, {
              strokeDashoffset: 0,
              duration: 1.15,
              ease: "power2.inOut"
            }, 0.55);
          }
        }
      }

      /* Archive panels: each card lifts and sharpens as the strip
         arrives, finishing before the pin takes over. */
      gsap.fromTo(
        ".panel",
        { opacity: 0.35, y: 26 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: "#archive",
            start: "top 82%",
            end: "top 42%",
            scrub: true
          }
        }
      );

      /* Panel index numbers slide in from the left within each card. */
      gsap.fromTo(
        ".panel-num",
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: "#archive",
            start: "top 80%",
            end: "top 35%",
            scrub: true
          }
        }
      );

      /* Horizontal archive (desktop only): pinned, scrubbed, with the
         reader forced to travel the full width before the next chapter. */
      if (window.gsap.matchMedia) {
        var mm = gsap.matchMedia();

        mm.add("(min-width: 901px)", function () {
          var track = document.querySelector(".archive-track");
          if (!track) return;

          var prog = document.querySelector(".archive-progress i");

          var distance = function () {
            return Math.max(0, track.scrollWidth - window.innerWidth);
          };

          var tween = gsap.to(track, {
            x: function () { return -distance(); },
            ease: "none",
            scrollTrigger: {
              trigger: "#archive",
              start: "top top",
              end: function () { return "+=" + distance(); },
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              refreshPriority: 2,
              onUpdate: function (self) {
                if (prog) prog.style.transform = "scaleX(" + self.progress + ")";
              },
              onLeave: function () {
                if (prog) prog.style.transform = "scaleX(1)";
              }
            }
          });

          return function () {
            if (tween.scrollTrigger) tween.scrollTrigger.kill();
            tween.kill();
            gsap.set(track, { clearProps: "transform" });
            if (prog) prog.style.transform = "scaleX(0)";
          };
        });
      }

      /* ============================================================
         FINAL REFRESH — 保证所有动画尺寸与滚动触发位置准确
         ============================================================ */

      // 等待字体加载完成
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          ScrollTrigger.refresh();
        });
      }

      // 等待图片及页面资源全部加载
      window.addEventListener("load", function () {
        ScrollTrigger.refresh();
      }, { once: true });

      // 页面尺寸变化时重新计算
      window.addEventListener("resize", function () {
        ScrollTrigger.refresh();
      });

      // 确保初始化后的布局完成
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          ScrollTrigger.refresh();
        });
      });

    } catch (err) {
      // 动画系统出现问题时，不影响网页正常运行
      console.warn("Animation layer disabled:", err);
    }
  }

  // 安全初始化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
