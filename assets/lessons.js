/*
 * 講義清單 —— 新增講義時必須在這裡登記（規則見 CLAUDE.md 第 4 節）
 *
 * COURSES：科目設定
 *   key   = course-id（與 lessons/ 底下的資料夾名稱相同）
 *   name  = 中文科目名稱
 *   en    = 英文科目名稱
 *   color = 科目強調色
 *
 * LESSONS：講義列表
 *   course  = course-id
 *   id      = 檔名去掉 .html
 *   order   = 排序用數字（通常就是章號）
 *   label   = 顯示用章號，例如 "Ch 6"、"個案"
 *   title   = 中文標題
 *   en      = 英文標題
 *   summary = 一句話摘要（首頁卡片會顯示）
 *   file    = 從網站根目錄開始的相對路徑
 *   updated = 最後更新日期 YYYY-MM-DD
 */

window.COURSES = {
  marketing: {
    name: "行銷管理",
    en: "Marketing Management",
    color: "#c2410c",
  },
};

window.LESSONS = [
  {
    course: "marketing",
    id: "ch01-marketing-basics",
    order: 1,
    label: "Ch 1",
    title: "行銷的基本概念",
    en: "Defining Marketing",
    summary: "需要、欲望、需求的差別，以及行銷觀念從生產導向走到全方位行銷。",
    file: "lessons/marketing/ch01-marketing-basics.html",
    updated: "2026-11-16",
  },
  {
    course: "marketing",
    id: "ch06-segmentation-targeting",
    order: 6,
    label: "Ch 6",
    title: "市場區隔與目標市場",
    en: "Segmentation & Targeting",
    summary: "四大區隔變數、有效區隔的五個條件，以及四種目標市場策略。",
    file: "lessons/marketing/ch06-segmentation-targeting.html",
    updated: "2026-11-16",
  },
  {
    course: "marketing",
    id: "ch07-value-positioning",
    order: 7,
    label: "Ch 7",
    title: "價值主張與定位",
    en: "Value Proposition & Positioning",
    summary: "參考架構、共同點與差異點，以及怎麼寫一句定位陳述。",
    file: "lessons/marketing/ch07-value-positioning.html",
    updated: "2026-11-16",
  },
  {
    course: "marketing",
    id: "ch12-imc",
    order: 12,
    label: "Ch 12",
    title: "推廣與整合行銷傳播",
    en: "Integrated Marketing Communications",
    summary: "八種行銷傳播工具、IMC 的核心精神，以及消費者反應階段模型。",
    file: "lessons/marketing/ch12-imc.html",
    updated: "2026-11-16",
  },
];
