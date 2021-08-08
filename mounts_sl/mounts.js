const mountListLink = "https://spreadsheets.google.com/feeds/list/1sHzVX83rp-Cj5STEOxecWdU5Flh_vnsydRSPPXRlrRc/od6/public/values?alt=json";
const template = document.querySelector("template").content;
const animaConductor = document.querySelector("#anima-conductor");
const campaign = document.querySelector("#campaign");
const extraFeature = document.querySelector("#extra-feature");
const renown = document.querySelector("#renown");
const reputation = document.querySelector("#reputation");
const rare = document.querySelector("#rare");
const other = document.querySelector("#other");

function loadJSON(link) {
  fetch(mountListLink)
    .then((e) => e.json())
    .then((data) => data.feed.entry.forEach(showMounts));
}

function showMounts(mounts) {
  mountName = mounts.gsx$mountname.$t.replace(/\s+/g, "");

  const clone = template.cloneNode("true");

  clone.querySelector(".form-check-input").setAttribute("value", mountName);
  clone.querySelector(".form-check-input").setAttribute("id", mountName);
  clone.querySelector(".form-check-label").setAttribute("for", mountName);
  clone.querySelector(".mountName").setAttribute("href", mounts.gsx$wowheadlink.$t);
  clone.querySelector(".mountName").textContent = mounts.gsx$mountname.$t;

  if (mounts.gsx$vendor.$t !== "0") {
    clone.querySelector(".isFromVendor").classList.remove("d-none");
    clone.querySelector(".vendorLink").setAttribute("href", mounts.gsx$vendorlink.$t);
    clone.querySelector(".vendorName").textContent = mounts.gsx$vendor.$t;

    clone.querySelector(".costs").classList.remove("d-none");

    if (mounts.gsx$costanima.$t != 0) {
      clone.querySelector(".costAnima").textContent = mounts.gsx$costanima.$t;
      clone.querySelector(".costAnima").classList.remove("d-none");
      clone.querySelector(".animaImg").classList.remove("d-none");
    }
    if (mounts.gsx$costoffering.$t != 0) {
      clone.querySelector(".costOffering").textContent = mounts.gsx$costoffering.$t;
      clone.querySelector(".costOffering").classList.remove("d-none");
      clone.querySelector(".offeringImg").classList.remove("d-none");
    }
    if (mounts.gsx$costgold.$t != 0) {
      clone.querySelector(".costGold").textContent = mounts.gsx$costgold.$t;
      clone.querySelector(".costGold").classList.remove("d-none");
      clone.querySelector(".goldImg").classList.remove("d-none");
    }
    if (mounts.gsx$costother.$t != 0) {
      clone.querySelector(".costOther").classList.remove("d-none");
      clone.querySelector(".costOther").textContent = mounts.gsx$costother.$t;
    }
  }

  if (mounts.gsx$rare.$t != "0") {
    clone.querySelector(".isFromRare").classList.remove("d-none");
    clone.querySelector(".rareLink").setAttribute("href", mounts.gsx$rarelink.$t);
    clone.querySelector(".rareName").textContent = mounts.gsx$rare.$t;
  }

  if (mounts.gsx$todo.$t != "0") {
    clone.querySelector(".todo").parentElement.classList.remove("d-none");
    clone.querySelector(".todo").textContent = mounts.gsx$todo.$t;
  }

  if (mounts.gsx$covenant.$t === "Kyrian") {
    const kyrianMounts = document.querySelector("#kyrianMounts");
    kyrianMounts.appendChild(clone);
  } else if (mounts.gsx$covenant.$t === "Necrolord") {
    const necrolordMounts = document.querySelector("#necrolordMounts");
    necrolordMounts.appendChild(clone);
  } else if (mounts.gsx$covenant.$t === "Nightfae") {
    const nightfaeMounts = document.querySelector("#nightfaeMounts");
    nightfaeMounts.appendChild(clone);
  } else if (mounts.gsx$covenant.$t === "Venthyr") {
    const venthyrMounts = document.querySelector("#venthyrMounts");
    venthyrMounts.appendChild(clone);
  } else if (mounts.gsx$covenant.$t === "All") {
    const forEveryone = document.querySelector("#forEveryone");
    forEveryone.appendChild(clone);
  }
}

loadJSON(mountListLink);