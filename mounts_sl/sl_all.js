const mountListLink = "https://spreadsheets.google.com/feeds/list/1sHzVX83rp-Cj5STEOxecWdU5Flh_vnsydRSPPXRlrRc/od6/public/values?alt=json";
const template = document.querySelector("template").content;
const animaConductor = document.querySelector("#anima-conductor");
const campaign = document.querySelector("#campaign");
const extraFeature = document.querySelector("#extra-feature");
const rare = document.querySelector("#rare");
const reputation = document.querySelector("#reputation");
const other = document.querySelector("#other");

function loadJSON(link) {
  fetch(mountListLink)
    .then((e) => e.json())
    .then((data) => data.feed.entry.forEach(showMounts));
}

function showMounts(mounts) {
  if (mounts.gsx$covenant.$t === "All") {
    const clone = template.cloneNode("true");

    clone.querySelector(".mount-img").setAttribute("src", `${mounts.gsx$img.$t}`);
    clone.querySelector(".mount-name").textContent = mounts.gsx$mountname.$t;

    if (mounts.gsx$vendor.$t != 0) {
      clone.querySelector(".vendor").classList.remove("hide");
      clone.querySelector(".vendor-name").innerHTML = `<a href="${mounts.gsx$vendorlink.$t}" target="_blank">${mounts.gsx$vendor.$t}</a>`;
    }

    if (mounts.gsx$costanima.$t != 0 || mounts.gsx$costoffering.$t != 0 || mounts.gsx$costgold.$t != 0 || mounts.gsx$costother.$t != 0) {
      clone.querySelector(".cost").classList.remove("hide");
    }

    if (mounts.gsx$costanima.$t != 0) {
      clone.querySelector(".anima-cost").classList.remove("hide");
      clone.querySelector(".anima-cost").innerHTML = `${mounts.gsx$costanima.$t} <img src="anima.gif" alt="anima">`;
    }

    if (mounts.gsx$costoffering.$t != 0) {
      clone.querySelector(".offering-cost").classList.remove("hide");
      clone.querySelector(".offering-cost").innerHTML = `${mounts.gsx$costoffering.$t} <img src="offerings.gif" alt="Grateful offerings">`;
    }

    if (mounts.gsx$costgold.$t != 0) {
      clone.querySelector(".gold-cost").classList.remove("hide");
      clone.querySelector(".gold-cost").textContent = mounts.gsx$costgold.$t + " gold ";
    }

    if (mounts.gsx$costother.$t != 0) {
      clone.querySelector(".other-cost").classList.remove("hide");
      clone.querySelector(".other-cost").textContent = mounts.gsx$costother.$t;
    }

    if (mounts.gsx$todo.$t != 0) {
      clone.querySelector(".todo").classList.remove("hide");
      clone.querySelector(".todo-desc").textContent = mounts.gsx$todo.$t;
    }

    clone.querySelector(".wowhead-link").setAttribute("href", `${mounts.gsx$wowheadlink.$t}`);

    if (mounts.gsx$comesfrom.$t === "Anima Conductor") {
      animaConductor.appendChild(clone);
    } else if (mounts.gsx$comesfrom.$t === "Campaign") {
      campaign.appendChild(clone);
    } else if (mounts.gsx$comesfrom.$t === "Extra feature") {
      extraFeature.appendChild(clone);
    } else if (mounts.gsx$comesfrom.$t === "Other") {
      other.appendChild(clone);
    } else if (mounts.gsx$comesfrom.$t === "Rare") {
      rare.appendChild(clone);
    } else if (mounts.gsx$comesfrom.$t === "Reputation") {
      reputation.appendChild(clone);
    }
  }
}

loadJSON(mountListLink);
