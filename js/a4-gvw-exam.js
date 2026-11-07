/* ============================================================================
   a4-gvw-exam.js — Bộ điều khiển tương tác cho 4 đề thi A4 FA 531/1
   "Gasterlebnis, Verkaufsförderung und Warenlagerung" (90 Minuten · 30%)
   ============================================================================ */

(function () {
  var EXAM_SECONDS = 90 * 60;
  var remaining = EXAM_SECONDS;
  var timerId = null;
  var allOpen = false;
  var sampleFilled = false;
  var pageKey = 'azubihub_gvw_' + (location.pathname.split('/').pop() || 'exam');

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }

  function updateTimerDisplay() {
    var el = document.getElementById('gvw-timer');
    if (el) el.textContent = formatTime(remaining);
  }

  window.toggleGvwTimer = function () {
    var btn = document.getElementById('btn-timer');
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      if (btn) btn.textContent = 'Tiếp tục (90p)';
      return;
    }
    if (btn) btn.textContent = 'Tạm dừng';
    timerId = setInterval(function () {
      if (remaining > 0) {
        remaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timerId);
        timerId = null;
        if (btn) btn.textContent = 'Hết giờ (90:00)';
      }
    }, 1000);
  };

  window.resetGvwTimer = function () {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    remaining = EXAM_SECONDS;
    updateTimerDisplay();
    var btn = document.getElementById('btn-timer');
    if (btn) btn.textContent = 'Bắt đầu (90p)';
  };

  window.toggleVi = function () {
    document.body.classList.toggle('hide-vi');
    var btn = document.getElementById('btn-vi');
    if (btn) {
      var hidden = document.body.classList.contains('hide-vi');
      btn.textContent = hidden ? 'Hiện dịch VI' : 'Ẩn dịch VI';
    }
  };

  window.toggleAllSolutions = function () {
    allOpen = !allOpen;
    var list = document.querySelectorAll('details.a4-loesung');
    for (var i = 0; i < list.length; i++) {
      list[i].open = allOpen;
    }
    var btn = document.getElementById('btn-sol');
    if (btn) {
      btn.textContent = allOpen ? 'Ẩn lời giải' : 'Hiện toàn bộ lời giải';
      btn.classList.toggle('sol-active', allOpen);
    }
  };

  window.toggleFillSampleAnswers = function () {
    sampleFilled = !sampleFilled;
    var fields = document.querySelectorAll('[data-sol]');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (sampleFilled) {
        if (f.getAttribute('data-user-backup') === null) {
          f.setAttribute('data-user-backup', f.value || '');
        }
        f.value = f.getAttribute('data-sol') || '';
        f.style.backgroundColor = '#E6F4EA';
        f.style.color = '#14451B';
        f.style.fontWeight = '600';
      } else {
        var backup = f.getAttribute('data-user-backup');
        f.value = backup !== null ? backup : '';
        f.removeAttribute('data-user-backup');
        f.style.backgroundColor = '';
        f.style.color = '';
        f.style.fontWeight = '';
      }
    }
    var btn = document.getElementById('btn-fill-sol');
    if (btn) {
      btn.textContent = sampleFilled ? 'Xóa điền mẫu trên A4' : 'Điền mẫu vào giấy A4';
      btn.classList.toggle('sol-active', sampleFilled);
    }
  };

  window.clearSavedAnswers = function () {
    if (!confirm('Xóa toàn bộ nội dung bạn đã điền trên đề A4 này?')) return;
    localStorage.removeItem(pageKey);
    sampleFilled = false;
    var fields = document.querySelectorAll('.a4-input, .a4-textarea, .name-klasse-line input');
    for (var i = 0; i < fields.length; i++) {
      fields[i].value = '';
      fields[i].removeAttribute('data-user-backup');
      fields[i].style.backgroundColor = '';
      fields[i].style.color = '';
      fields[i].style.fontWeight = '';
    }
    var btn = document.getElementById('btn-fill-sol');
    if (btn) {
      btn.textContent = 'Điền mẫu vào giấy A4';
      btn.classList.remove('sol-active');
    }
  };

  function saveState() {
    if (sampleFilled) return;
    var fields = document.querySelectorAll('.a4-input, .a4-textarea, .name-klasse-line input');
    var data = {};
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].value) data[i] = fields[i].value;
    }
    try {
      localStorage.setItem(pageKey, JSON.stringify(data));
    } catch (e) {}
  }

  function restoreState() {
    try {
      var raw = localStorage.getItem(pageKey);
      if (!raw) return;
      var data = JSON.parse(raw);
      var fields = document.querySelectorAll('.a4-input, .a4-textarea, .name-klasse-line input');
      for (var k in data) {
        if (fields[k]) fields[k].value = data[k];
      }
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    updateTimerDisplay();
    restoreState();
    document.addEventListener('input', function (e) {
      if (
        e.target &&
        (e.target.classList.contains('a4-input') ||
          e.target.classList.contains('a4-textarea') ||
          e.target.tagName === 'INPUT')
      ) {
        saveState();
      }
    });
  });
})();
