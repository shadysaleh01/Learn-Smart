$(document).ready(() => { function a(a, d, e, f) { $.post("/api/signup", { firstName: a, lastName: d, email: e, password: f }).then(() => { localStorage.setItem("userEmail", e), localStorage.setItem("isAuthenticated", !0), window.location.replace("/play.html") }).catch(b) } function b(a) { $("#alert .msg").text(a.responseJSON), $("#alert").fadeIn(500) } function d() { q.length = 0; for (var a = 0; a < 4; ++a)q.push(new g(u)); p.fillStyle = "#222", p.fillRect(0, 0, n, o) } function e(a) { return "hsl( hue, 80%, 50% )".replace("hue", 360 * (a / n) + r) } function f() { window.requestAnimationFrame(f), ++r, p.shadowBlur = 0, p.fillStyle = "rgba(0,0,0,.02)", p.fillRect(0, 0, n, o), p.shadowBlur = .5; for (var a = 0; a < q.length; ++a)q[a].step() && (q.splice(a, 1), --a); ++s, q.length < 100 && 10 < s && .5 > Math.random() && (s = 0, q.push(new g(u)), p.fillStyle = p.shadowColor = e(u.x), p.beginPath(), p.arc(u.x, u.y, 10, 0, 2 * Math.PI), p.fill()) } function g(a) { this.x = 0 | a.x, this.y = 0 | a.y, this.width = a.width / 1.25; do { var b = t[0 | Math.random() * t.length]; this.vx = b[0], this.vy = b[1] } while (this.vx === -a.vx && this.vy === -a.vy || this.vx === a.vx && this.vy === a.vy); this.vx *= 5, this.vy *= 5, this.dist = Math.random() * 20 + 10 } const i = $("form#form"), j = $("input#first_name"), k = $("input#last_name"), l = $("input#email"), m = $("input#password"); i.on("submit", b => { b.preventDefault(); const d = { firstName: j.val().trim(), lastName: k.val().trim(), email: l.val().trim(), password: m.val().trim() }; d.firstName && d.lastName && d.email && d.password && (a(d.firstName, d.lastName, d.email, d.password), j.val(""), k.val(""), l.val(""), m.val("")) }); var n = c.width = window.innerWidth, o = c.height = window.innerHeight, p = c.getContext("2d"), q = [], r = 0, s = 0, t = [[0, 1], [1, 0], [0, -1], [-1, 0], [.7, .7], [.7, -.7], [-.7, .7], [-.7, -.7]], u = { x: n / 2, y: o / 2, vx: 0, vy: 0, width: 10 }; g.prototype.step = function () { var a = !1, b = this.x, d = this.y; if (this.x += this.vx, this.y += this.vy, --this.dist, (0 > this.x || this.x > n || 0 > this.y || this.y > o) && (a = !0), 0 >= this.dist && 1 < this.width && (this.dist = 20 * Math.random() + 10, 100 > q.length && q.push(new g(this)), 100 > q.length && .5 > Math.random() && q.push(new g(this)), .2 > Math.random() && (a = !0)), p.strokeStyle = p.shadowColor = e(this.x), p.beginPath(), p.lineWidth = this.width, p.moveTo(this.x, this.y), p.lineTo(b, d), p.stroke(), a) return !0 }, d(), f(), window.addEventListener("resize", function () { n = c.width = window.innerWidth, o = c.height = window.innerHeight, u.x = n / 2, u.y = o / 2, d() }) }); function validateUser() { "true" === localStorage.isAuthenticated ? window.location.replace("/play.html") : (window.location.replace("/signup.html"), alert("Please sign up first")) } document.addEventListener("DOMContentLoaded", function () { var a = document.querySelectorAll(".sidenav"), b = M.Sidenav.init(a, {}) }); var collapsibleElem = document.querySelector(".collapsible"), collapsibleInstance = M.Collapsible.init(collapsibleElem, {});