const STORAGE_KEY = "shichitei-db";
const SESSION_KEY = "shichitei-session";

const state = {
  db: null,
  session: null,
  currentView: "dashboard",
  selectedAthleteId: null,
  calendarMonth: new Date(),
  selectedDate: null,
  filters: {
    from: "",
    to: "",
    grade: "",
    axisId: "",
    level: "",
  },
};

const defaultData = () => ({
  users: [
    {
      id: "u_admin",
      name: "管理者",
      email: "admin@judo.local",
      password: "admin123",
      role: "admin",
      status: "active",
    },
    {
      id: "u_eval",
      name: "山本聡太",
      email: "eval@judo.local",
      password: "eval123",
      role: "evaluator",
      status: "active",
    },
    {
      id: "u_manager",
      name: "マネージャー",
      email: "manager@judo.local",
      password: "manager123",
      role: "manager",
      status: "active",
    },
    {
      id: "u_player_a01",
      name: "佐藤 大輝",
      email: "player01@judo.local",
      password: "player123",
      role: "player",
      athleteId: "a_01",
      status: "active",
    },
  ],
  athletes: [
    {
      id: "a_01",
      name: "佐藤 大輝",
      kana: "さとう だいき",
      grade: "3",
      entryYear: "2022",
      weightClass: "-73kg",
      styleType: "総合型",
      tags: ["主将団"],
      status: "在籍中",
    },
    {
      id: "a_02",
      name: "山本 颯太",
      kana: "やまもと そうた",
      grade: "2",
      entryYear: "2023",
      weightClass: "-81kg",
      styleType: "立ち技型",
      tags: ["レギュラー候補"],
      status: "在籍中",
    },
    {
      id: "a_03",
      name: "高橋 遥",
      kana: "たかはし はるか",
      grade: "1",
      entryYear: "2024",
      weightClass: "-57kg",
      styleType: "寝技型",
      tags: ["初心者"],
      status: "在籍中",
    },
  ],
  axes: [
    { id: "ax_01", name: "状況理解", description: "相手の動きと局面理解" },
    { id: "ax_02", name: "ムーブ構築", description: "動きの組み立て" },
    { id: "ax_03", name: "主導権", description: "展開の支配" },
    { id: "ax_04", name: "再現性", description: "再現できる強さ" },
    { id: "ax_05", name: "組み手", description: "組み手の安定" },
    { id: "ax_06", name: "寝技移行", description: "立ちから寝技へ" },
    { id: "ax_07", name: "守備・脱出", description: "守りと脱出" },
    { id: "ax_08", name: "試合運び", description: "試合設計" },
  ],
  levels: [
    { code: "A", score: 1, label: "A", description: "何をすればいいかわからない" },
    { code: "B", score: 2, label: "B", description: "相手の動きは理解できるが返しなし" },
    { code: "C", score: 3, label: "C", description: "相手に応じてムーブを構築" },
    { code: "D", score: 4, label: "D", description: "自分の動きで誘導" },
    { code: "E", score: 5, label: "E", description: "相手に何もさせず制圧" },
  ],
  evaluations: [
    {
      id: "ev_01",
      athleteId: "a_01",
      evaluatorId: "u_admin",
      date: "2024-12-10",
      type: "coach",
      overall: "組み手の主導権が安定してきた。",
      strengths: "寝技移行が良い。",
      issues: "終盤の再現性に課題。",
      nextFocus: "終盤のムーブ固定。",
      items: [
        { axisId: "ax_01", level: "C" },
        { axisId: "ax_02", level: "C" },
        { axisId: "ax_03", level: "D" },
        { axisId: "ax_04", level: "C" },
        { axisId: "ax_05", level: "D" },
        { axisId: "ax_06", level: "D" },
        { axisId: "ax_07", level: "C" },
        { axisId: "ax_08", level: "C" },
      ],
    },
    {
      id: "ev_02",
      athleteId: "a_01",
      evaluatorId: "u_admin",
      date: "2025-02-05",
      type: "coach",
      overall: "主導権が上がり試合運びが安定。",
      strengths: "守備からの切り返し。",
      issues: "終盤の再現性は継続課題。",
      nextFocus: "再現性を高める反復。",
      items: [
        { axisId: "ax_01", level: "C" },
        { axisId: "ax_02", level: "D" },
        { axisId: "ax_03", level: "D" },
        { axisId: "ax_04", level: "C" },
        { axisId: "ax_05", level: "D" },
        { axisId: "ax_06", level: "D" },
        { axisId: "ax_07", level: "C" },
        { axisId: "ax_08", level: "D" },
      ],
    },
    {
      id: "ev_03",
      athleteId: "a_02",
      evaluatorId: "u_eval",
      date: "2025-01-18",
      type: "coach",
      overall: "組み手の反応が良い。",
      strengths: "状況理解が高い。",
      issues: "寝技移行が遅い。",
      nextFocus: "移行パターンを増やす。",
      items: [
        { axisId: "ax_01", level: "D" },
        { axisId: "ax_02", level: "C" },
        { axisId: "ax_03", level: "C" },
        { axisId: "ax_04", level: "C" },
        { axisId: "ax_05", level: "D" },
        { axisId: "ax_06", level: "B" },
        { axisId: "ax_07", level: "C" },
        { axisId: "ax_08", level: "C" },
      ],
    },
  ],
  practice_sessions: [
    {
      id: "ps_01",
      date: "2025-02-05",
      title: "火曜稽古",
      practice_theme: "組み手と寝技移行",
      manager_note: "参加率が高い",
      is_held: true,
    },
  ],
  attendance_logs: [
    {
      id: "al_01",
      session_id: "ps_01",
      athlete_id: "a_01",
      status: "参加",
      recorded_by: "u_manager",
      source: "manager",
    },
    {
      id: "al_02",
      session_id: "ps_01",
      athlete_id: "a_02",
      status: "参加",
      recorded_by: "u_manager",
      source: "manager",
    },
    {
      id: "al_03",
      session_id: "ps_01",
      athlete_id: "a_03",
      status: "見学",
      recorded_by: "u_manager",
      source: "manager",
    },
  ],
  daily_notes: [
    {
      id: "dn_01",
      athlete_id: "a_01",
      session_id: "ps_01",
      participation_status: "参加",
      practice_content: "打ち込みと寝技連携",
      insights: "主導権の取り方に工夫が必要",
      good_points: "寝技移行がスムーズ",
      issues: "終盤に力が落ちる",
      next_actions: "足技の反復",
      free_comment: "",
      created_at: "2025-02-05T20:00:00Z",
      updated_at: "2025-02-05T20:00:00Z",
    },
  ],
});

const uid = (prefix) => `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

const normalizeDB = (db) => {
  const defaults = defaultData();
  db.users = db.users || [];
  db.athletes = db.athletes || [];
  db.axes = db.axes || defaults.axes;
  db.levels = db.levels || defaults.levels;
  db.evaluations = db.evaluations || [];
  db.practice_sessions = db.practice_sessions || [];
  db.attendance_logs = db.attendance_logs || [];
  db.daily_notes = db.daily_notes || [];

  defaults.users.forEach((u) => {
    if (!db.users.find((x) => x.id === u.id)) db.users.push(u);
  });
  return db;
};

const loadDB = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seed = defaultData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
  const parsed = JSON.parse(raw);
  return normalizeDB(parsed);
};

const saveDB = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.db));
};

const loadSession = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
};

const saveSession = (session) => {
  state.session = session;
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

const getUser = () => state.db.users.find((u) => u.id === state.session?.userId);

const getLevelScore = (code) => state.db.levels.find((l) => l.code === code)?.score ?? 0;

const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("ja-JP");

const formatMonthTitle = (date) => `${date.getFullYear()}年${date.getMonth() + 1}月`;

const daysFrom = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
};

const getSessionByDate = (dateStr) =>
  state.db.practice_sessions.find((session) => session.date === dateStr);

const getOrCreateSession = (dateStr) => {
  let session = getSessionByDate(dateStr);
  if (!session) {
    session = {
      id: uid("ps"),
      date: dateStr,
      title: "",
      practice_theme: "",
      manager_note: "",
      is_held: false,
    };
    state.db.practice_sessions.push(session);
  }
  return session;
};

const getAttendanceStatus = (sessionId, athleteId) => {
  const logs = state.db.attendance_logs.filter(
    (log) => log.session_id === sessionId && log.athlete_id === athleteId
  );
  const managerLog = logs.find((log) => log.source === "manager");
  if (managerLog) return managerLog.status;
  const selfLog = logs.find((log) => log.source === "self");
  if (selfLog) return selfLog.status;
  const note = state.db.daily_notes.find(
    (n) => n.session_id === sessionId && n.athlete_id === athleteId
  );
  return note?.participation_status || "";
};

const upsertAttendanceLog = ({ sessionId, athleteId, status, recordedBy, source }) => {
  const existing = state.db.attendance_logs.find(
    (log) => log.session_id === sessionId && log.athlete_id === athleteId && log.source === source
  );
  if (existing) {
    existing.status = status;
    existing.recorded_by = recordedBy;
  } else {
    state.db.attendance_logs.push({
      id: uid("al"),
      session_id: sessionId,
      athlete_id: athleteId,
      status,
      recorded_by: recordedBy,
      source,
    });
  }
};

const getUserAthlete = () => {
  const user = getUser();
  if (!user) return null;
  return state.db.athletes.find((a) => a.id === user.athleteId);
};

const setView = (view) => {
  const user = getUser();
  if (view === "admin" && user?.role !== "admin") {
    view = "dashboard";
  }
  state.currentView = view;
  document.querySelectorAll(".view").forEach((el) => el.classList.add("hidden"));
  const viewEl = document.getElementById(`view-${view}`);
  if (viewEl) viewEl.classList.remove("hidden");

  document.querySelectorAll(".nav-item").forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`.nav-item[data-view="${view}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  const titles = {
    dashboard: ["ダッシュボード", "月間カレンダーで確認"],
    notes: ["練習ノート", "日次の振り返り"],
    athletes: ["選手一覧", "検索と詳細閲覧"],
    evaluation: ["評価入力", "評価シートの作成"],
    analysis: ["分析", "条件を絞って傾向確認"],
    admin: ["管理", "マスタとユーザー管理"],
    "athlete-detail": ["選手詳細", "評価履歴と成長推移"],
  };
  const [title, sub] = titles[view] || ["", ""];
  document.getElementById("pageTitle").textContent = title;
  document.getElementById("pageSub").textContent = sub;

  renderCurrentView();
};

const renderCurrentView = () => {
  if (state.currentView === "dashboard") renderDashboard();
  if (state.currentView === "notes") renderNotes();
  if (state.currentView === "athletes") renderAthletes();
  if (state.currentView === "evaluation") renderEvaluationForm();
  if (state.currentView === "analysis") renderAnalysis();
  if (state.currentView === "admin") renderAdmin();
  if (state.currentView === "athlete-detail") renderAthleteDetail();
};

const renderSidebarUser = () => {
  const user = getUser();
  if (!user) return;
  document.getElementById("userName").textContent = user.name;
  document.getElementById("userRole").textContent = user.role === "admin" ? "管理者" : "記入者";
  const roleLabel = {
    admin: "管理者",
    evaluator: "記入者",
    manager: "マネージャー",
    player: "選手",
  };
  document.getElementById("userRole").textContent = roleLabel[user.role] || user.role;

  document.querySelectorAll(".admin-only").forEach((el) => {
    el.style.display = user.role === "admin" ? "" : "none";
  });

  const viewRules = {
    admin: ["dashboard", "notes", "athletes", "evaluation", "analysis", "admin"],
    evaluator: ["dashboard", "athletes", "evaluation", "analysis"],
    manager: ["dashboard", "notes"],
    player: ["notes"],
  };
  const allowed = viewRules[user.role] || ["dashboard"];
  document.querySelectorAll(".nav-item").forEach((btn) => {
    const view = btn.dataset.view;
    btn.style.display = allowed.includes(view) ? "" : "none";
  });

  const quickAdd = document.getElementById("quickAddEval");
  if (quickAdd) {
    quickAdd.style.display = user.role === "admin" || user.role === "evaluator" ? "" : "none";
  }
};

const renderDashboard = () => {
  const month = state.calendarMonth;
  document.getElementById("calendarTitle").textContent = formatMonthTitle(month);

  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const startOffset = firstDay.getDay();
  const totalCells = 42;
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - startOffset);

  for (let i = 0; i < totalCells; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const session = getSessionByDate(dateStr);

    const dayEl = document.createElement("div");
    dayEl.className = "calendar-day";
    if (date.getMonth() !== month.getMonth()) dayEl.classList.add("muted");

    const totalAthletes = state.db.athletes.length;
    const noteCount = state.db.daily_notes.filter((n) => n.session_id === session?.id).length;
    const attendanceCount = session
      ? state.db.athletes.filter(
          (a) => getAttendanceStatus(session.id, a.id) === "参加"
        ).length
      : 0;
    const missingNotes = Math.max(totalAthletes - noteCount, 0);

    dayEl.innerHTML = `
      <div class="calendar-date">${date.getDate()}</div>
      <div class="calendar-metrics">
        <div>${session?.is_held ? "<span class=\"calendar-badge\">練習あり</span>" : "<span class=\"calendar-badge warn\">練習なし</span>"}</div>
        <div>参加: ${attendanceCount}人</div>
        <div>ノート: ${noteCount}人</div>
        <div>未記入: ${missingNotes}人</div>
      </div>
    `;
    dayEl.addEventListener("click", () => openDayDetail(dateStr));
    grid.appendChild(dayEl);
  }
};

const renderGradeDistribution = () => {
  const gradeCounts = [1, 2, 3, 4].map((g) => ({
    label: `${g}年`,
    value: state.db.athletes.filter((a) => a.grade === String(g)).length,
  }));
  renderBarChart(document.getElementById("gradeChart"), gradeCounts);
};

const renderAthletes = () => {
  const search = document.getElementById("athleteSearch").value.trim();
  const grade = document.getElementById("athleteGradeFilter").value;

  const list = state.db.athletes.filter((athlete) => {
    const matchesName = athlete.name.includes(search) || athlete.kana.includes(search);
    const matchesGrade = grade ? athlete.grade === grade : true;
    return matchesName && matchesGrade;
  });

  const table = document.getElementById("athleteTable");
  table.innerHTML = "";
  const header = document.createElement("div");
  header.className = "table-row header";
  header.innerHTML = "<div>氏名</div><div>学年</div><div>主戦場</div><div>状態</div><div></div>";
  table.appendChild(header);

  list.forEach((athlete) => {
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
      <div>${athlete.name}</div>
      <div>${athlete.grade}年</div>
      <div>${athlete.styleType || "-"}</div>
      <div>${athlete.status}</div>
      <div>
        <button class="ghost" data-athlete="${athlete.id}">詳細</button>
        <button class="ghost admin-only" data-edit-athlete="${athlete.id}">編集</button>
      </div>
    `;
    table.appendChild(row);
  });

  table.querySelectorAll("[data-athlete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedAthleteId = btn.dataset.athlete;
      setView("athlete-detail");
    });
  });

  table.querySelectorAll("[data-edit-athlete]").forEach((btn) => {
    btn.addEventListener("click", () => openAthleteForm(btn.dataset.editAthlete));
  });

  renderSidebarUser();
};

const renderAthleteDetail = () => {
  const athlete = state.db.athletes.find((a) => a.id === state.selectedAthleteId);
  if (!athlete) return;

  document.getElementById("detailName").textContent = athlete.name;
  document.getElementById("detailMeta").textContent = `${athlete.grade}年 / ${athlete.styleType || "-"} / ${athlete.weightClass || "-"}`;

  const evals = state.db.evaluations
    .filter((ev) => ev.athleteId === athlete.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const latest = evals[0];
  const latestContainer = document.getElementById("latestEval");
  latestContainer.innerHTML = latest
    ? `
      <div class="list-item">${formatDate(latest.date)} / ${latest.type === "self" ? "自己評価" : "指導者評価"}</div>
      <div class="list-item">総評: ${latest.overall}</div>
    `
    : "評価がまだありません";

  const history = document.getElementById("evalHistory");
  history.innerHTML = "";
  const header = document.createElement("div");
  header.className = "table-row header";
  header.innerHTML = "<div>評価日</div><div>記入者</div><div>平均スコア</div>";
  history.appendChild(header);
  evals.forEach((ev) => {
    const evaluator = state.db.users.find((u) => u.id === ev.evaluatorId);
    const avg = averageScore(ev);
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `<div>${formatDate(ev.date)}</div><div>${evaluator?.name || "-"}</div><div>${avg.toFixed(2)}</div>`;
    history.appendChild(row);
  });

  const comments = document.getElementById("commentHistory");
  comments.innerHTML = "";
  evals.forEach((ev) => {
    const item = document.createElement("div");
    item.className = "list-item";
    const monthly = ev.monthlyReview ? `<br /><span class="badge">月末振り返り</span> ${ev.monthlyReview}` : "";
    const nextGoals = ev.nextMonthGoals ? `<br /><span class="badge">翌月目標</span> ${ev.nextMonthGoals}` : "";
    item.innerHTML = `<strong>${formatDate(ev.date)}</strong><br />${ev.overall}${monthly}${nextGoals}`;
    comments.appendChild(item);
  });

  if (latest) {
    const labels = state.db.axes.map((ax) => ax.name);
    const values = state.db.axes.map((ax) => {
      const item = latest.items.find((i) => i.axisId === ax.id);
      return getLevelScore(item?.level);
    });
    renderRadarChart(document.getElementById("radarChart"), labels, values);
  }

  const avgSeries = evals
    .slice()
    .reverse()
    .map((ev) => ({ label: ev.date, value: averageScore(ev) }));
  renderLineChart(document.getElementById("lineChart"), avgSeries);
};

const averageScore = (evaluation) => {
  const scores = evaluation.items.map((item) => getLevelScore(item.level));
  return scores.reduce((sum, v) => sum + v, 0) / scores.length;
};

const isEndOfMonth = (dateStr) => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const next = new Date(date);
  next.setDate(date.getDate() + 1);
  return next.getMonth() !== date.getMonth();
};

const renderEvaluationForm = () => {
  const athleteSelect = document.getElementById("evalAthlete");
  athleteSelect.innerHTML = "";
  state.db.athletes.forEach((athlete) => {
    const option = document.createElement("option");
    option.value = athlete.id;
    option.textContent = athlete.name;
    if (athlete.id === state.selectedAthleteId) option.selected = true;
    athleteSelect.appendChild(option);
  });

  const dateInput = document.getElementById("evalDate");
  if (!dateInput.value) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }

  const axisInputs = document.getElementById("axisInputs");
  axisInputs.innerHTML = "";
  state.db.axes.forEach((axis) => {
    const group = document.createElement("div");
    group.className = "axis-group";
    group.innerHTML = `<div><strong>${axis.name}</strong><span class="badge">${axis.description}</span></div>`;

    const options = document.createElement("div");
    options.className = "axis-options";
    state.db.levels.forEach((level) => {
      const label = document.createElement("label");
      const isDefault = level.code === "C";
      label.className = `chip${isDefault ? " active" : ""}`;
      label.innerHTML = `<input type="radio" name="axis-${axis.id}" value="${level.code}" ${isDefault ? "checked" : ""} />${level.code}`;
      options.appendChild(label);
    });
    group.appendChild(options);
    axisInputs.appendChild(group);
  });

  axisInputs.querySelectorAll(".axis-options").forEach((options) => {
    options.addEventListener("change", (event) => {
      if (!event.target.matches("input[type=\"radio\"]")) return;
      options.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("active"));
      event.target.closest(".chip").classList.add("active");
    });
  });

  const updatePrevious = () => {
    const athleteId = athleteSelect.value;
    const previous = state.db.evaluations
      .filter((ev) => ev.athleteId === athleteId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    const previousContainer = document.getElementById("previousEval");
    previousContainer.innerHTML = previous
      ? `${formatDate(previous.date)} / ${previous.overall}`
      : "まだ評価がありません";
  };
  updatePrevious();
  athleteSelect.addEventListener("change", updatePrevious);

  const toggleMonthlyFields = () => {
    const isMonthEnd = isEndOfMonth(dateInput.value);
    const monthlyReview = document.getElementById("monthlyReview");
    const nextMonthGoals = document.getElementById("nextMonthGoals");
    const rows = [monthlyReview, nextMonthGoals].map((el) => el.closest(".form-row"));
    rows.forEach((row) => row.classList.toggle("muted", !isMonthEnd));
  };
  toggleMonthlyFields();
  dateInput.addEventListener("change", toggleMonthlyFields);
};

const renderAnalysis = () => {
  const axisSelect = document.getElementById("filterAxis");
  axisSelect.innerHTML = "<option value=\"\">評価軸</option>";
  state.db.axes.forEach((axis) => {
    const opt = document.createElement("option");
    opt.value = axis.id;
    opt.textContent = axis.name;
    axisSelect.appendChild(opt);
  });

  const filtered = filterEvaluations();
  renderAnalysisTable(filtered);
  renderAnalysisSummary(filtered);
  renderDistribution(filtered);
};

const renderNotes = () => {
  const user = getUser();
  const athlete = getUserAthlete();
  const form = document.getElementById("dailyNoteForm");
  const noteHistory = document.getElementById("noteHistory");

  const today = new Date().toISOString().split("T")[0];
  if (!document.getElementById("noteDate").value) {
    document.getElementById("noteDate").value = today;
  }

  if (user?.role === "player" && athlete) {
    form.querySelectorAll("input, select, textarea, button").forEach((el) => (el.disabled = false));
  } else {
    form.querySelectorAll("input, select, textarea, button").forEach((el) => (el.disabled = true));
  }

  const loadNoteForDate = () => {
    if (!athlete) return;
    const dateStr = document.getElementById("noteDate").value;
    const session = getSessionByDate(dateStr);
    const note = state.db.daily_notes.find(
      (n) => n.athlete_id === athlete.id && n.session_id === session?.id
    );
    document.getElementById("noteParticipation").value = note?.participation_status || "参加";
    document.getElementById("noteContent").value = note?.practice_content || "";
    document.getElementById("noteInsights").value = note?.insights || "";
    document.getElementById("noteGood").value = note?.good_points || "";
    document.getElementById("noteIssues").value = note?.issues || "";
    document.getElementById("noteNext").value = note?.next_actions || "";
    document.getElementById("noteFree").value = note?.free_comment || "";
  };
  loadNoteForDate();
  document.getElementById("noteDate").onchange = loadNoteForDate;

  noteHistory.innerHTML = "";
  const notes = user?.role === "player" && athlete
    ? state.db.daily_notes.filter((n) => n.athlete_id === athlete.id)
    : state.db.daily_notes;

  notes
    .slice()
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .forEach((note) => {
      const session = state.db.practice_sessions.find((s) => s.id === note.session_id);
      const athleteName = state.db.athletes.find((a) => a.id === note.athlete_id)?.name || "-";
      const item = document.createElement("div");
      item.className = "note-card";
      item.innerHTML = `
        <strong>${session?.date || ""} / ${athleteName}</strong>
        <div>参加区分: ${note.participation_status}</div>
        <div>${note.practice_content || ""}</div>
        <div>${note.free_comment || ""}</div>
      `;
      noteHistory.appendChild(item);
    });
};

const openDayDetail = (dateStr) => {
  state.selectedDate = dateStr;
  const modal = document.getElementById("dayDetailModal");
  const title = document.getElementById("dayDetailTitle");
  const sub = document.getElementById("dayDetailSub");
  const body = document.getElementById("dayDetailBody");

  const session = getOrCreateSession(dateStr);
  const user = getUser();

  title.textContent = `${formatDate(dateStr)} の詳細`;
  sub.textContent = session.practice_theme ? `テーマ: ${session.practice_theme}` : "テーマ未設定";

  const attendanceRows = state.db.athletes
    .map((athlete) => {
      const status = getAttendanceStatus(session.id, athlete.id) || "未登録";
      return `<div class="table-row"><div>${athlete.name}</div><div>${status}</div></div>`;
    })
    .join("");

  const notesList = state.db.daily_notes
    .filter((n) => n.session_id === session.id)
    .map((note) => {
      const athleteName = state.db.athletes.find((a) => a.id === note.athlete_id)?.name || "-";
      return `<div class="list-item"><strong>${athleteName}</strong><br />${note.practice_content || ""}<br />${note.insights || ""}</div>`;
    })
    .join("");

  const notedAthleteIds = state.db.daily_notes
    .filter((n) => n.session_id === session.id)
    .map((n) => n.athlete_id);
  const missingNotes = state.db.athletes
    .filter((a) => !notedAthleteIds.includes(a.id))
    .map((a) => `<div class="list-item">${a.name}</div>`)
    .join("");

  const managerSection =
    user?.role === "admin" || user?.role === "manager"
      ? `
        <div class="card">
          <div class="card-title">当日の練習設定 / 参加登録</div>
          <form id="attendanceForm" class="form">
            <div class="form-row">
              <label>練習実施</label>
              <select name="isHeld">
                <option value="true" ${session.is_held ? "selected" : ""}>実施</option>
                <option value="false" ${!session.is_held ? "selected" : ""}>未実施</option>
              </select>
            </div>
            <div class="form-row">
              <label>練習テーマ</label>
              <input name="practiceTheme" value="${session.practice_theme || ""}" />
            </div>
            <div class="form-row">
              <label>管理者メモ</label>
              <textarea name="managerNote" rows="2">${session.manager_note || ""}</textarea>
            </div>
            <div class="form-row">
              <label>参加者登録</label>
              <div class="table">
                ${state.db.athletes
                  .map((athlete) => {
                    const status = getAttendanceStatus(session.id, athlete.id) || "参加";
                    return `
                      <div class="table-row">
                        <div>${athlete.name}</div>
                        <div>
                          <select name="status-${athlete.id}">
                            ${["参加", "欠席", "見学", "遅刻", "早退"]
                              .map(
                                (s) => `<option value="${s}" ${s === status ? "selected" : ""}>${s}</option>`
                              )
                              .join("")}
                          </select>
                        </div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>
            <button class="primary" type="submit">保存</button>
          </form>
        </div>
      `
      : "";

  body.innerHTML = `
    <div class="grid-2">
      <div class="card">
        <div class="card-title">参加状況</div>
        <div class="table">
          <div class="table-row header"><div>選手</div><div>区分</div></div>
          ${attendanceRows}
        </div>
      </div>
      <div class="card">
        <div class="card-title">ノート一覧</div>
        <div class="list">${notesList || "まだノートがありません"}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">未記入者</div>
      <div class="list">${missingNotes || "全員提出済み"}</div>
    </div>
    ${managerSection}
  `;

  modal.classList.add("show");

  const attendanceForm = document.getElementById("attendanceForm");
  if (attendanceForm) {
    attendanceForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(attendanceForm);
      session.is_held = formData.get("isHeld") === "true";
      session.practice_theme = formData.get("practiceTheme");
      session.manager_note = formData.get("managerNote");
      state.db.athletes.forEach((athlete) => {
        const status = formData.get(`status-${athlete.id}`);
        upsertAttendanceLog({
          sessionId: session.id,
          athleteId: athlete.id,
          status,
          recordedBy: state.session.userId,
          source: "manager",
        });
      });
      saveDB();
      openDayDetail(dateStr);
      renderDashboard();
    });
  }
};

const filterEvaluations = () => {
  const { from, to, grade, axisId, level } = state.filters;
  return state.db.evaluations.filter((ev) => {
    const athlete = state.db.athletes.find((a) => a.id === ev.athleteId);
    if (from && ev.date < from) return false;
    if (to && ev.date > to) return false;
    if (grade && athlete?.grade !== grade) return false;
    if (axisId) {
      const item = ev.items.find((i) => i.axisId === axisId);
      if (!item) return false;
      if (level && item.level !== level) return false;
    }
    return true;
  });
};

const renderAnalysisTable = (evaluations) => {
  const table = document.getElementById("analysisTable");
  table.innerHTML = "";
  const header = document.createElement("div");
  header.className = "table-row header";
  header.innerHTML = "<div>選手</div><div>評価日</div><div>平均</div><div>記入者</div>";
  table.appendChild(header);
  evaluations.forEach((ev) => {
    const athlete = state.db.athletes.find((a) => a.id === ev.athleteId);
    const evaluator = state.db.users.find((u) => u.id === ev.evaluatorId);
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `<div>${athlete?.name || "-"}</div><div>${formatDate(ev.date)}</div><div>${averageScore(ev).toFixed(2)}</div><div>${evaluator?.name || "-"}</div>`;
    table.appendChild(row);
  });
};

const renderAnalysisSummary = (evaluations) => {
  const summary = document.getElementById("analysisSummary");
  if (!evaluations.length) {
    summary.innerHTML = "該当データがありません";
    return;
  }
  const averages = state.db.axes.map((axis) => {
    const values = evaluations
      .flatMap((ev) => ev.items)
      .filter((item) => item.axisId === axis.id)
      .map((item) => getLevelScore(item.level));
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    return `<div class="list-item">${axis.name}: ${avg.toFixed(2)}</div>`;
  });
  summary.innerHTML = averages.join("");
};

const renderDistribution = (evaluations) => {
  const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  evaluations.forEach((ev) => {
    ev.items.forEach((item) => {
      counts[item.level] += 1;
    });
  });
  const data = Object.keys(counts).map((key) => ({ label: key, value: counts[key] }));
  renderBarChart(document.getElementById("distributionChart"), data);
};

const renderAdmin = () => {
  renderAxisTable();
  renderUserTable();
};

const renderAxisTable = () => {
  const table = document.getElementById("axisTable");
  table.innerHTML = "";
  const header = document.createElement("div");
  header.className = "table-row header";
  header.innerHTML = "<div>評価軸</div><div>説明</div><div></div>";
  table.appendChild(header);
  state.db.axes.forEach((axis) => {
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `<div>${axis.name}</div><div>${axis.description}</div><div><button class="ghost" data-edit-axis="${axis.id}">編集</button></div>`;
    table.appendChild(row);
  });
  table.querySelectorAll("[data-edit-axis]").forEach((btn) => {
    btn.addEventListener("click", () => openAxisForm(btn.dataset.editAxis));
  });
};

const renderUserTable = () => {
  const table = document.getElementById("userTable");
  table.innerHTML = "";
  const header = document.createElement("div");
  header.className = "table-row header";
  header.innerHTML = "<div>氏名</div><div>メール</div><div>権限</div>";
  table.appendChild(header);
  state.db.users.forEach((user) => {
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `<div>${user.name}</div><div>${user.email}</div><div>${user.role}</div>`;
    table.appendChild(row);
  });
};

const openFormModal = (title, bodyHtml, onSubmit) => {
  const modal = document.getElementById("formModal");
  document.getElementById("formModalTitle").textContent = title;
  const body = document.getElementById("formModalBody");
  body.innerHTML = bodyHtml;
  modal.classList.add("show");

  const form = body.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit(new FormData(form));
      modal.classList.remove("show");
    });
  }

  body.querySelectorAll("[data-cancel-modal]").forEach((btn) => {
    btn.addEventListener("click", () => modal.classList.remove("show"));
  });
};

const openAthleteForm = (id) => {
  const user = getUser();
  if (user?.role !== "admin") {
    alert("管理者のみ操作できます");
    return;
  }
  const athlete = state.db.athletes.find((a) => a.id === id) || {
    name: "",
    kana: "",
    grade: "1",
    entryYear: "",
    weightClass: "",
    styleType: "",
    tags: [],
    status: "在籍中",
  };

  openFormModal(
    id ? "選手を編集" : "選手を追加",
    `
      <form class="form">
        <div class="form-row"><label>氏名</label><input name="name" value="${athlete.name}" required /></div>
        <div class="form-row"><label>ふりがな</label><input name="kana" value="${athlete.kana}" /></div>
        <div class="form-row"><label>学年</label><select name="grade">
          <option value="1" ${athlete.grade === "1" ? "selected" : ""}>1年</option>
          <option value="2" ${athlete.grade === "2" ? "selected" : ""}>2年</option>
          <option value="3" ${athlete.grade === "3" ? "selected" : ""}>3年</option>
          <option value="4" ${athlete.grade === "4" ? "selected" : ""}>4年</option>
        </select></div>
        <div class="form-row"><label>入学年度</label><input name="entryYear" value="${athlete.entryYear}" /></div>
        <div class="form-row"><label>体重階級</label><input name="weightClass" value="${athlete.weightClass}" /></div>
        <div class="form-row"><label>主戦場</label><input name="styleType" value="${athlete.styleType}" /></div>
        <div class="form-row"><label>所属区分</label><input name="tags" value="${athlete.tags.join(",")}" /></div>
        <div class="form-row"><label>ステータス</label><input name="status" value="${athlete.status}" /></div>
        <div class="form-actions">
          <button class="ghost" type="button" data-cancel-modal>キャンセル</button>
          <button class="primary" type="submit">保存</button>
        </div>
      </form>
    `,
    (formData) => {
      const updated = {
        id: id || uid("a"),
        name: formData.get("name"),
        kana: formData.get("kana"),
        grade: formData.get("grade"),
        entryYear: formData.get("entryYear"),
        weightClass: formData.get("weightClass"),
        styleType: formData.get("styleType"),
        tags: String(formData.get("tags")).split(",").map((t) => t.trim()).filter(Boolean),
        status: formData.get("status"),
      };
      if (id) {
        state.db.athletes = state.db.athletes.map((a) => (a.id === id ? updated : a));
      } else {
        state.db.athletes.push(updated);
      }
      saveDB();
      renderAthletes();
    }
  );
};

const openAxisForm = (id) => {
  const axis = state.db.axes.find((a) => a.id === id) || { name: "", description: "" };
  openFormModal(
    id ? "評価軸を編集" : "評価軸を追加",
    `
      <form class="form">
        <div class="form-row"><label>名称</label><input name="name" value="${axis.name}" required /></div>
        <div class="form-row"><label>説明</label><input name="description" value="${axis.description}" /></div>
        <button class="primary" type="submit">保存</button>
      </form>
    `,
    (formData) => {
      const updated = {
        id: id || uid("ax"),
        name: formData.get("name"),
        description: formData.get("description"),
      };
      if (id) {
        state.db.axes = state.db.axes.map((a) => (a.id === id ? updated : a));
      } else {
        state.db.axes.push(updated);
      }
      saveDB();
      renderAdmin();
      renderEvaluationForm();
    }
  );
};

const openUserForm = () => {
  openFormModal(
    "ユーザー追加",
    `
      <form class="form">
        <div class="form-row"><label>氏名</label><input name="name" required /></div>
        <div class="form-row"><label>メール</label><input name="email" type="email" required /></div>
        <div class="form-row"><label>パスワード</label><input name="password" type="password" required /></div>
        <div class="form-row"><label>権限</label><select name="role"><option value="admin">admin</option><option value="evaluator">evaluator</option></select></div>
        <button class="primary" type="submit">保存</button>
      </form>
    `,
    (formData) => {
      const user = {
        id: uid("u"),
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role"),
        status: "active",
      };
      state.db.users.push(user);
      saveDB();
      renderAdmin();
    }
  );
};

const exportCsv = () => {
  const evaluations = filterEvaluations();
  const header = ["選手", "評価日", "平均スコア", "記入者"];
  const rows = evaluations.map((ev) => {
    const athlete = state.db.athletes.find((a) => a.id === ev.athleteId);
    const evaluator = state.db.users.find((u) => u.id === ev.evaluatorId);
    return [athlete?.name || "", ev.date, averageScore(ev).toFixed(2), evaluator?.name || ""];
  });
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "analysis.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const renderBarChart = (container, data) => {
  container.innerHTML = "";
  const width = container.clientWidth || 360;
  const height = container.clientHeight || 220;
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = width / data.length;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  data.forEach((d, i) => {
    const barHeight = (d.value / max) * (height - 30);
    const rect = document.createElementNS(svg.namespaceURI, "rect");
    rect.setAttribute("x", i * barWidth + 12);
    rect.setAttribute("y", height - barHeight - 20);
    rect.setAttribute("width", barWidth - 24);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("rx", 6);
    rect.setAttribute("fill", "rgba(248,176,78,0.8)");
    svg.appendChild(rect);

    const label = document.createElementNS(svg.namespaceURI, "text");
    label.setAttribute("x", i * barWidth + barWidth / 2);
    label.setAttribute("y", height - 6);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", "#fff");
    label.setAttribute("font-size", "12");
    label.textContent = d.label;
    svg.appendChild(label);
  });
  container.appendChild(svg);
};

const renderRadarChart = (container, labels, values) => {
  container.innerHTML = "";
  const width = container.clientWidth || 360;
  const height = container.clientHeight || 300;
  const size = Math.min(width, height) * 0.85;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = size / 2;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  const levels = 5;
  for (let l = 1; l <= levels; l++) {
    const r = (radius / levels) * l;
    const polygon = document.createElementNS(svg.namespaceURI, "polygon");
    const points = labels.map((_, i) => {
      const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
      return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
    });
    polygon.setAttribute("points", points.join(" "));
    polygon.setAttribute("fill", "none");
    polygon.setAttribute("stroke", "rgba(255,255,255,0.12)");
    svg.appendChild(polygon);
  }

  labels.forEach((label, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    const x = centerX + (radius + 12) * Math.cos(angle);
    const y = centerY + (radius + 12) * Math.sin(angle);
    const text = document.createElementNS(svg.namespaceURI, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y);
    text.setAttribute("fill", "#fff");
    text.setAttribute("font-size", "11");
    text.setAttribute("text-anchor", "middle");
    text.textContent = label;
    svg.appendChild(text);
  });

  const valuePoints = values.map((value, i) => {
    const angle = (Math.PI * 2 * i) / labels.length - Math.PI / 2;
    const r = (radius * value) / 5;
    return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
  });

  const area = document.createElementNS(svg.namespaceURI, "polygon");
  area.setAttribute("points", valuePoints.join(" "));
  area.setAttribute("fill", "rgba(61, 209, 193, 0.35)");
  area.setAttribute("stroke", "rgba(61, 209, 193, 0.9)");
  area.setAttribute("stroke-width", "2");
  svg.appendChild(area);

  container.appendChild(svg);
};

const renderLineChart = (container, series) => {
  container.innerHTML = "";
  const width = container.clientWidth || 360;
  const height = container.clientHeight || 240;
  const padding = 30;
  const max = Math.max(...series.map((s) => s.value), 5);
  const min = Math.min(...series.map((s) => s.value), 1);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  const points = series.map((s, i) => {
    const x = padding + (i / Math.max(series.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((s.value - min) / (max - min || 1)) * (height - padding * 2);
    return { x, y, label: s.label };
  });

  const path = document.createElementNS(svg.namespaceURI, "path");
  path.setAttribute(
    "d",
    points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  );
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "#f8b04e");
  path.setAttribute("stroke-width", "2");
  svg.appendChild(path);

  points.forEach((p) => {
    const circle = document.createElementNS(svg.namespaceURI, "circle");
    circle.setAttribute("cx", p.x);
    circle.setAttribute("cy", p.y);
    circle.setAttribute("r", 4);
    circle.setAttribute("fill", "#f8b04e");
    svg.appendChild(circle);
  });

  container.appendChild(svg);
};

const wireEvents = () => {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    saveSession(null);
    showLogin();
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = state.db.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      alert("メールアドレスまたはパスワードが違います");
      return;
    }
    saveSession({ userId: user.id });
    document.getElementById("loginModal").classList.remove("show");
    renderSidebarUser();
    if (user.role === "player") {
      setView("notes");
    } else {
      setView("dashboard");
    }
  });

  document.getElementById("quickAddEval").addEventListener("click", () => setView("evaluation"));
  document.getElementById("addEvalFromDetail").addEventListener("click", () => setView("evaluation"));

  document.getElementById("dailyNoteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const user = getUser();
    const athlete = getUserAthlete();
    if (user?.role !== "player" || !athlete) {
      alert("選手本人のみ入力できます");
      return;
    }
    const dateStr = document.getElementById("noteDate").value;
    const session = getOrCreateSession(dateStr);
    const existing = state.db.daily_notes.find(
      (n) => n.session_id === session.id && n.athlete_id === athlete.id
    );
    const now = new Date().toISOString();
    const payload = {
      id: existing?.id || uid("dn"),
      athlete_id: athlete.id,
      session_id: session.id,
      participation_status: document.getElementById("noteParticipation").value,
      practice_content: document.getElementById("noteContent").value,
      insights: document.getElementById("noteInsights").value,
      good_points: document.getElementById("noteGood").value,
      issues: document.getElementById("noteIssues").value,
      next_actions: document.getElementById("noteNext").value,
      free_comment: document.getElementById("noteFree").value,
      created_at: existing?.created_at || now,
      updated_at: now,
    };
    if (existing) {
      Object.assign(existing, payload);
    } else {
      state.db.daily_notes.push(payload);
    }
    upsertAttendanceLog({
      sessionId: session.id,
      athleteId: athlete.id,
      status: payload.participation_status,
      recordedBy: user.id,
      source: "self",
    });
    saveDB();
    renderNotes();
    renderDashboard();
  });

  document.getElementById("evaluationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const athleteId = document.getElementById("evalAthlete").value;
    const date = document.getElementById("evalDate").value;
    const type = document.getElementById("evalType").value;
    const items = state.db.axes.map((axis) => {
      const selected = document.querySelector(`input[name="axis-${axis.id}"]:checked`);
      return { axisId: axis.id, level: selected ? selected.value : "C" };
    });
    const evaluation = {
      id: uid("ev"),
      athleteId,
      evaluatorId: state.session.userId,
      date,
      type,
      overall: document.getElementById("overallComment").value,
      strengths: document.getElementById("strengthsComment").value,
      issues: document.getElementById("issuesComment").value,
      nextFocus: document.getElementById("nextFocusComment").value,
      monthlyReview: document.getElementById("monthlyReview").value,
      nextMonthGoals: document.getElementById("nextMonthGoals").value,
      items,
    };
    state.db.evaluations.push(evaluation);
    saveDB();
    state.selectedAthleteId = athleteId;
    setView("athlete-detail");
  });

  document.getElementById("athleteSearch").addEventListener("input", renderAthletes);
  document.getElementById("athleteGradeFilter").addEventListener("change", renderAthletes);
  document.getElementById("addAthleteBtn").addEventListener("click", () => openAthleteForm());
  document.getElementById("backToAthletes").addEventListener("click", () => setView("athletes"));

  document.getElementById("addAxisBtn").addEventListener("click", () => openAxisForm());
  document.getElementById("addUserBtn").addEventListener("click", openUserForm);

  document.getElementById("applyFilters").addEventListener("click", () => {
    state.filters.from = document.getElementById("filterFrom").value;
    state.filters.to = document.getElementById("filterTo").value;
    state.filters.grade = document.getElementById("filterGrade").value;
    state.filters.axisId = document.getElementById("filterAxis").value;
    state.filters.level = document.getElementById("filterLevel").value;
    renderAnalysis();
  });

  document.getElementById("exportCsv").addEventListener("click", exportCsv);
  document.getElementById("closeFormModal").addEventListener("click", () => {
    document.getElementById("formModal").classList.remove("show");
  });

  document.getElementById("closeDayDetail").addEventListener("click", () => {
    document.getElementById("dayDetailModal").classList.remove("show");
  });

  document.getElementById("prevMonth").addEventListener("click", () => {
    state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() - 1, 1);
    renderDashboard();
  });
  document.getElementById("nextMonth").addEventListener("click", () => {
    state.calendarMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth() + 1, 1);
    renderDashboard();
  });
};

const showLogin = () => {
  document.getElementById("loginModal").classList.add("show");
};

const init = () => {
  state.db = loadDB();
  state.session = loadSession();
  wireEvents();
  if (!state.session) {
    showLogin();
  } else {
    renderSidebarUser();
    const user = getUser();
    if (user?.role === "player") {
      setView("notes");
    } else {
      setView("dashboard");
    }
  }
};

window.addEventListener("resize", () => renderCurrentView());
window.addEventListener("DOMContentLoaded", init);
