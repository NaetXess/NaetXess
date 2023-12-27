import { apiUrl } from "../config/default";
import { _ } from "svelte-i18n";
import moment from "moment";

export async function i18(lang) {
  let response = await fetch("../locales/" + lang + ".json");
  response = response.json();
  return response;
}

function request(
  route,
  method,
  body = false,
  headers = false,
  isformdata = false,
  delay = false
) {
  let url = apiUrl;
  return new Promise((resolve, reject) => {
    let options = {
      method,
      headers: {},
    };

    if (!isformdata) {
      Object.assign(options.headers, {
        "Content-Type": "application/json",
      });
    }

    if (headers) {
      Object.assign(options.headers, headers);
    }

    if (body) {
      if (isformdata) {
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
      }
    }
    if (delay) {
      // showLoader();
    }

    fetch(`${url}/${route}`, options)
      .then((response) => {
        if (response.status == 404) {
          throw new Error("Route Not Found !");
        } else if (response.status == 401) {
          localStorage.setItem("loggedIN", false);
          setTimeout(() => {
            if (delay) {
              // hideLoader();
            }

            $goto("/login");
          }, 1000);
          throw new Error("Login Reqiure !");
        } else return response.json();
      })
      .then((response) => {
        if (response.code == 9) {
          alert("New version founded.");
          window.location.reload(true);
        } else if (response.code != 0) {
          let msg = "";
          if (typeof response.message === "object") {
            response.message.forEach((element) => {
              msg = msg + element.message + " ";
            });
          } else msg = response.message;
          throw new Error(msg);
        }

        setTimeout(() => {
          if (delay) {
            hideLoader();
          }
          resolve(response);
        }, delay || 0);
      })
      .catch((error) => {
        if (delay) {
          hideLoader();
        }
        // toastCustom(error.message, 2);
        reject(error);
      });
  });
}

export const Get = (route, headers, delay) =>
  request(route, "GET", false, headers, false, delay);
export const Post = (route, body, headers, isformdata, delay) =>
  request(route, "POST", body, headers, isformdata, delay);
export const Put = (route, body, headers, isformdata, delay) =>
  request(route, "PUT", body, headers, isformdata, delay);
export const Delete = (route, headers) =>
  request(route, "DELETE", false, headers, false);

export function kaydirHaci(prid, prindex, prtime) {
  if (prindex == 0) {
    f7.input.scrollIntoView(`#${prid}`, prtime, false, true);
  } else {
    f7.input.scrollIntoView(`#${prid}`, prtime, true, true);
  }
}
export function minToHourMin(minute) {
  let hour = Math.floor(minute / 60);
  let min = minute % 60;
  let result = "";
  hour == 0
    ? ""
    : hour <= 1
    ? (result += hour + " hour")
    : (result += hour + " hours");
  min == 0
    ? ""
    : min <= 1
    ? (result += " " + min + " minute")
    : (result += " " + min + " minutes");
  return result;
}
// export function toastCustom(msg, type) {
//   show(msg, type);
// }
export function currencySymbolFinder(pr_symbol) {
  let symbol = "";
  switch (pr_symbol) {
    case "EUR":
      symbol = "€";
      break;
    case "TRY":
      symbol = "₺";
      break;
    case "GBP":
      symbol = "£";
      break;
    case "USD":
      symbol = "$";
      break;
  }
  return symbol;
}

export function formatDate(date, type) {
  if (type == "1") {
    return moment(date).format("DD.MM.YYYY");
  } else if (type == "2") {
    return moment(date).format("YYYY-MM-DD HH:mm");
  } else if (type == "3") {
    return moment(date).format("YYYY-MM-DD  HH:mm:ss.000");
  } else if (type == "4") {
    return moment(curDate).format("YYYY-MM-DD");
  } else if (type == "5") {
    return moment(date).format("HH:mm");
  } else if (type == "6") {
    return moment(date).format("DD.MM.YYYY HH:mm");
  }
}
export function TurkishNumberFormat(val) {
  val = val ? val : 0;
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

// export function showLoader() {
//   document.querySelectorAll(".loader-container")[0].style.display = "flex";
// }

// export function hideLoader() {
//   document.querySelectorAll(".loader-container")[0].style.display = "none";
// }
export function modalOperations(id, type) {
  if (type == "show") new bootstrap.Modal(document.getElementById(id)).show();
  if (type == "hide")
    bootstrap.Modal.getInstance(document.getElementById(id)).hide();
}

export function groupBy(arr, key, object = false) {
  if (object)
    return arr.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  return Array.from(
    arr.reduce(
      (entryMap, e) =>
        entryMap.set(e[key], [...(entryMap.get(e[key]) || []), e]),
      new Map()
    ),
    ([name, value]) => ({ [key]: name, data: value })
  );
}
