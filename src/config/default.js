let apiUrl;

if (import.meta.env.VITE_LOCATION === "RELEASED") {
  apiUrl = "";
} else {
  apiUrl = "http://localhost:1010";
}

export { apiUrl };
