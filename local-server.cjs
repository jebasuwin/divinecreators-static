const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.argv[2] || process.env.PORT || 5173);
const host = process.env.HOST || "127.0.0.1";
const root = path.resolve(__dirname, "..");
const sitePath = "/divinecreators-static";

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".otf", "font/otf"],
  [".ttf", "font/ttf"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const send = (res, status, body, headers = {}) => {
  res.writeHead(status, {
    "Cache-Control": "no-cache",
    ...headers,
  });
  res.end(body);
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") {
    send(res, 302, "", { Location: `${sitePath}/` });
    return;
  }

  if (pathname === sitePath) {
    send(res, 301, "", { Location: `${sitePath}/` });
    return;
  }

  pathname = pathname.replace(/\\/g, "/");
  const target = path.resolve(root, `.${pathname}`);

  if (!target.startsWith(root)) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  fs.stat(target, (statError, stat) => {
    let filePath = target;
    if (!statError && stat.isDirectory()) {
      filePath = path.join(target, "index.html");
    }

    fs.readFile(filePath, (readError, data) => {
      if (readError) {
        send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      send(res, 200, data, { "Content-Type": types.get(ext) || "application/octet-stream" });
    });
  });
});

server.listen(port, host, () => {
  console.log(`Divine Creators running at http://${host}:${port}${sitePath}/`);
});
