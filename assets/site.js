/*
 * 全站共用 JS（規則見 CLAUDE.md）
 * - 首頁（body[data-page="home"]）：依 lessons.js 產生科目與講義卡片
 * - 講義頁（body[data-page="lesson"]）：產生麵包屑、目錄、上下篇連結，套用科目顏色
 * 不依賴任何外部套件。
 */
(function () {
  const body = document.body;
  const root = body.dataset.root || "./";
  const courses = window.COURSES || {};
  const lessons = (window.LESSONS || []).slice().sort((a, b) => a.order - b.order);

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  function setAccent(courseId) {
    const c = courses[courseId];
    if (c && c.color) document.documentElement.style.setProperty("--accent", c.color);
  }

  /* ---------- 首頁 ---------- */
  function renderHome() {
    const wrap = document.getElementById("course-list");
    if (!wrap) return;
    const countEl = document.getElementById("lesson-count");
    if (countEl) countEl.textContent = lessons.length;

    Object.keys(courses).forEach((cid) => {
      const c = courses[cid];
      const items = lessons.filter((l) => l.course === cid);
      if (!items.length) return;

      const sec = el("section", "course");
      sec.style.setProperty("--accent", c.color);
      const head = el("div", "course-head");
      head.append(el("h2", null, c.name), el("span", "en", c.en), el("span", "count", items.length + " 篇"));
      sec.append(head);

      const grid = el("div", "cards");
      items.forEach((l) => {
        const a = el("a", "card");
        a.href = root + l.file;
        a.append(el("span", "label", l.label));
        const h = el("h3", null, l.title);
        a.append(h, el("p", "en", l.en), el("p", "summary", l.summary), el("p", "date", "更新 " + l.updated));
        grid.append(a);
      });
      sec.append(grid);
      wrap.append(sec);
    });
  }

  /* ---------- 講義頁 ---------- */
  function renderLesson() {
    const cid = body.dataset.course;
    const id = body.dataset.id;
    const course = courses[cid] || { name: cid };
    setAccent(cid);

    // 麵包屑
    const crumb = document.getElementById("breadcrumb");
    if (crumb) {
      const home = el("a", null, "首頁");
      home.href = root + "index.html";
      crumb.append(home, el("span", "sep", "/"), el("span", null, course.name));
    }

    // 目錄（由 article 內的 h2 自動產生）
    const toc = document.getElementById("toc");
    const heads = document.querySelectorAll("article h2");
    if (toc && heads.length) {
      toc.append(el("p", "toc-title", "本章目錄"));
      const ol = el("ol");
      heads.forEach((h, i) => {
        if (!h.id) h.id = "s" + (i + 1);
        const a = el("a", null, h.textContent);
        a.href = "#" + h.id;
        const li = el("li");
        li.append(a);
        ol.append(li);
      });
      toc.append(ol);
    }

    // 上一篇 / 下一篇（同科目內）
    const pager = document.getElementById("pager");
    const same = lessons.filter((l) => l.course === cid);
    const idx = same.findIndex((l) => l.id === id);
    if (pager && idx !== -1) {
      const mk = (l, dir) => {
        const a = el("a", "pager-link " + dir);
        a.href = root + l.file;
        a.append(el("span", "dir", dir === "prev" ? "← 上一篇" : "下一篇 →"), el("span", "t", l.label + " " + l.title));
        return a;
      };
      pager.append(idx > 0 ? mk(same[idx - 1], "prev") : el("span"));
      if (idx < same.length - 1) pager.append(mk(same[idx + 1], "next"));
    } else if (idx === -1) {
      console.warn("[site.js] 這篇講義還沒登記在 assets/lessons.js：", id);
    }
  }

  if (body.dataset.page === "home") renderHome();
  if (body.dataset.page === "lesson") renderLesson();
})();
