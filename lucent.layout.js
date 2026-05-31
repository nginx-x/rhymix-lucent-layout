/*!
 * Lucent — Glassmorphism Layout for Rhymix
 * Accessible navigation (no framework, no jQuery dependency).
 * Licensed GPL v2 or later.
 */
(function () {
	"use strict";

	function ready(fn) {
		if (document.readyState !== "loading") fn();
		else document.addEventListener("DOMContentLoaded", fn);
	}

	ready(function () {
		var root = document.querySelector(".lucent");
		if (!root) return;

		/* =====================================================
		 * Desktop mega menu — keyboard + ARIA
		 * CSS handles mouse hover; JS adds keyboard open/close so
		 * submenu links become reachable via Tab, plus Escape.
		 * ===================================================== */
		var items = root.querySelectorAll(".lucent-gnb .lucent-l1.has-sub");
		Array.prototype.forEach.call(items, function (li) {
			var link = li.querySelector(":scope > .lucent-l1-link");
			if (!link) return;
			link.setAttribute("aria-haspopup", "true");
			link.setAttribute("aria-expanded", "false");

			function open() {
				li.classList.add("is-open");
				link.setAttribute("aria-expanded", "true");
			}
			function close() {
				li.classList.remove("is-open");
				link.setAttribute("aria-expanded", "false");
			}

			// Opening the parent link by keyboard focus reveals the panel,
			// making its links focusable for continued tabbing.
			link.addEventListener("focus", open);
			li.addEventListener("mouseenter", open);
			li.addEventListener("mouseleave", close);

			// Close when focus leaves the whole item.
			li.addEventListener("focusout", function (e) {
				if (!li.contains(e.relatedTarget)) close();
			});

			// Escape closes and returns focus to the top-level link.
			li.addEventListener("keydown", function (e) {
				if (e.key === "Escape" || e.key === "Esc") {
					close();
					link.focus();
				}
			});
		});

		/* =====================================================
		 * Mobile drawer
		 * ===================================================== */
		var burger = root.querySelector(".lucent-burger");
		var drawer = document.getElementById("lucent-drawer");
		var backdrop = root.querySelector(".lucent-drawer-backdrop");
		var closeBtn = drawer ? drawer.querySelector(".lucent-drawer-close") : null;
		var lastFocused = null;

		function focusables() {
			return drawer.querySelectorAll(
				'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
			);
		}

		function openDrawer() {
			if (!drawer) return;
			lastFocused = document.activeElement;
			drawer.hidden = false;
			if (backdrop) backdrop.hidden = false;
			// next frame so the transition runs
			requestAnimationFrame(function () {
				drawer.classList.add("is-open");
			});
			if (burger) burger.setAttribute("aria-expanded", "true");
			document.body.style.overflow = "hidden";
			var f = focusables();
			if (f.length) f[0].focus();
		}

		function closeDrawer() {
			if (!drawer) return;
			drawer.classList.remove("is-open");
			if (burger) burger.setAttribute("aria-expanded", "false");
			document.body.style.overflow = "";
			var onEnd = function () {
				drawer.hidden = true;
				if (backdrop) backdrop.hidden = true;
				drawer.removeEventListener("transitionend", onEnd);
			};
			drawer.addEventListener("transitionend", onEnd);
			// fallback if no transition fired
			setTimeout(onEnd, 350);
			if (lastFocused && lastFocused.focus) lastFocused.focus();
		}

		if (burger) burger.addEventListener("click", openDrawer);
		if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
		if (backdrop) backdrop.addEventListener("click", closeDrawer);

		if (drawer) {
			drawer.addEventListener("keydown", function (e) {
				if (e.key === "Escape" || e.key === "Esc") {
					closeDrawer();
					return;
				}
				// simple focus trap
				if (e.key === "Tab") {
					var f = focusables();
					if (!f.length) return;
					var first = f[0];
					var last = f[f.length - 1];
					if (e.shiftKey && document.activeElement === first) {
						e.preventDefault();
						last.focus();
					} else if (!e.shiftKey && document.activeElement === last) {
						e.preventDefault();
						first.focus();
					}
				}
			});

			/* Build accordion toggles for drawer items that have a submenu. */
			var withSub = drawer.querySelectorAll(".lucent-drawer-nav li");
			Array.prototype.forEach.call(withSub, function (li) {
				var sub = li.querySelector(":scope > ul");
				var link = li.querySelector(":scope > a");
				if (!sub || !link) return;

				var row = document.createElement("div");
				row.className = "lucent-acc-row";
				var toggle = document.createElement("button");
				toggle.type = "button";
				toggle.className = "lucent-acc-toggle";
				toggle.setAttribute("aria-label", "Toggle submenu");
				toggle.setAttribute("aria-expanded", "false");

				li.insertBefore(row, link);
				row.appendChild(link);
				row.appendChild(toggle);

				// keep the selected branch open by default
				if (li.classList.contains("is-active")) {
					li.classList.add("is-expanded");
					toggle.setAttribute("aria-expanded", "true");
				}

				toggle.addEventListener("click", function () {
					var expanded = li.classList.toggle("is-expanded");
					toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
				});
			});
		}

		/* =====================================================
		 * Login widget placeholder injection & click-outside close
		 * ===================================================== */
		var userId = document.getElementById("user_id");
		var userPw = document.getElementById("user_pw");
		if (userId) {
			userId.placeholder = userId.type === "email" ? "Email Address" : "ID";
		}
		if (userPw) {
			userPw.placeholder = "Password";
		}

		var acField = document.getElementById("acField");
		var acTog = document.querySelector('a[href="#acField"]');
		if (acField && acTog) {
			document.addEventListener("click", function (e) {
				if (!acField.contains(e.target) && !acTog.contains(e.target)) {
					if (window.jQuery) {
						var $acField = window.jQuery(acField);
						if ($acField.is(":visible")) {
							$acField.slideUp(200);
						}
					} else {
						acField.style.display = "none";
					}
				}
			});
		}
	});
})();
