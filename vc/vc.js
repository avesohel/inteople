/* Inteople virtual card — builds vCard + QR from window.PERSON */
(function () {
  "use strict";
  var p = window.PERSON || {};
  var pageUrl = window.location.href.split("#")[0];

  /* ---- Build vCard 3.0 ---- */
  function buildVCard() {
    var n = (p.name || "").trim().split(/\s+/);
    var last = n.length > 1 ? n[n.length - 1] : "";
    var first = n.length > 1 ? n.slice(0, -1).join(" ") : (p.name || "");
    var lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:" + last + ";" + first + ";;;",
      "FN:" + (p.name || ""),
      "ORG:" + (p.org || "Inteople"),
      "TITLE:" + (p.role || "")
    ];
    if (p.email) lines.push("EMAIL;TYPE=INTERNET,WORK:" + p.email);
    if (p.phone) lines.push("TEL;TYPE=CELL:" + p.phone);
    if (p.website) lines.push("URL:" + p.website);
    if (p.linkedin) lines.push("X-SOCIALPROFILE;TYPE=linkedin:" + p.linkedin);
    lines.push("URL;TYPE=card:" + pageUrl);
    if (p.bio) lines.push("NOTE:" + p.bio.replace(/\n/g, " "));
    lines.push("END:VCARD");
    return lines.join("\r\n");
  }

  function saveContact() {
    var blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (p.slug || "contact") + ".vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    showToast("Contact saved 📇");
  }

  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---- QR pointing at this card URL ---- */
  function renderQR() {
    var el = document.getElementById("qr");
    if (!el || typeof qrcode === "undefined") return;
    var qr = qrcode(0, "M");
    qr.addData(pageUrl);
    qr.make();
    el.innerHTML = qr.createImgTag(5, 0);
    var img = el.querySelector("img");
    if (img) { img.alt = "QR code for " + (p.name || "this contact"); }
  }

  /* ---- Share ---- */
  function shareCard() {
    if (navigator.share) {
      navigator.share({ title: p.name + " — Inteople", url: pageUrl }).catch(function () {});
    } else {
      navigator.clipboard && navigator.clipboard.writeText(pageUrl).then(function () {
        showToast("Link copied 🔗");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var save = document.getElementById("save-contact");
    if (save) save.addEventListener("click", saveContact);
    var share = document.getElementById("share-card");
    if (share) share.addEventListener("click", shareCard);
    renderQR();
  });
})();
