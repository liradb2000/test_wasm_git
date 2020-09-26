import lg from "wasm-git/lg2";

let accessToken = "ANONYMOUS";
XMLHttpRequest.prototype._open = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
  this._open(method, url, async, user, password);
  this.setRequestHeader("Authorization", `Bearer ${accessToken}`);
};

let FS;
let IDBFS;
function writeGlobalConfig(username, useremail) {
  FS.writeFile(
    "/home/web_user/.gitconfig",
    "[user]\n" + `name = ${username}\n` + `email = ${useremail}`
  );
}

const lgPromise = new Promise((resolve) => {
  console.log("aaaaa")
  lg.onRuntimeInitialized = () => {
    console.log("aaaaa")
    FS = lg.FS;
    IDBFS = FS.filesystems.IDBFS;
    writeGlobalConfig("Test user", "test@example.com");
    resolve(lg);
  };
});

let currentRepoRootDir;

export async function expensive(msg) {
  const lg = await lgPromise
  currentRepoRootDir = "test";
  console.log("synclocal", currentRepoRootDir);

  FS.mkdir(`/${currentRepoRootDir}`);
  FS.mount(IDBFS, {}, `/${currentRepoRootDir}`);

  FS.syncfs(true, () => {
    if (FS.readdir(`/${currentRepoRootDir}`).find((file) => file === ".git")) {
      FS.chdir(`/${currentRepoRootDir}`);
      postMessage({ dircontents: FS.readdir(".") });
      console.log(currentRepoRootDir, "restored from indexeddb");
    } else {
      FS.chdir("/");
      console.log("no git repo in", currentRepoRootDir);
    }
  });
}
