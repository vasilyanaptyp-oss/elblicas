(function () {
  var burger = document.querySelector('.burger'), nav = document.getElementById('nav'), hdr = document.querySelector('.hdr');
  function setTop() {
    if (hdr) document.documentElement.style.setProperty('--navtop', Math.max(0, hdr.getBoundingClientRect().bottom) + 'px');
  }
  function close() {
    if (!nav) return;
    nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', burger.getAttribute('data-open'));
    document.body.style.overflow = '';
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      if (!open) { close(); return; }
      setTop(); nav.classList.add('open'); burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', burger.getAttribute('data-close'));
      document.body.style.overflow = 'hidden';
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1020) close(); else setTop(); });
  }

  var form = document.getElementById('form');
  if (form) {
    // "Ask" links on the service cards pick that service in the form's select.
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-svc]');
      if (!a) return;
      var sel = form.elements.svc, want = a.getAttribute('data-svc');
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text === want) { sel.selectedIndex = i; break; }
      }
      sel.classList.remove('hl'); void sel.offsetWidth; sel.classList.add('hl');
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, svc = f.svc.value, lines = [];
      if (f.msg.value.trim()) lines.push(f.msg.value.trim(), '');
      if (svc) lines.push(form.querySelector('label:nth-of-type(3) span').textContent + ': ' + svc);
      if (f.name.value.trim()) lines.push(form.querySelector('label:nth-of-type(1) span').textContent + ': ' + f.name.value.trim());
      if (f.contact.value.trim()) lines.push(form.querySelector('label:nth-of-type(2) span').textContent + ': ' + f.contact.value.trim());
      var subj = form.getAttribute('data-subj') + (svc ? ': ' + svc : '');
      window.location.href = 'mailto:' + form.getAttribute('data-mail') + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }
})();
