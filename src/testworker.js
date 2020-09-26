import MyWorker from "./web.worker";

const worker = new MyWorker();
const filecontentslisteners = {};

function addFileContentListener(filename, listenerfunc) {
  if (!filecontentslisteners[filename]) {
    filecontentslisteners[filename] = [];
  }
  filecontentslisteners[filename].push(listenerfunc);
}

function emptyDirView() {
  // const dircontentselm = document.querySelector('#dircontents');
  // while(dircontentselm.hasChildNodes()) {
  //     dircontentselm.removeChild(dircontentselm.firstChild);
  // }
}

function clearconsole() {
  // document.querySelector('#console').innerHTML = '';
}

worker.onmessage = (msg) => {
  if (msg.data.stdout) {
    console.log(msg.data.stdout);
  } else if (msg.data.stderr) {
    console.log(msg.data.stderr);
  } else if (msg.data.dircontents) {
    console.log(msg.data.dircontents);
  } else if (msg.data.filecontents) {
    console.log(msg.data.filecontents);
  } else if (msg.data.deleted) {
    console.log(msg.data.deleted);
    emptyDirView();
  } else {
    console.log(msg);
  }
};

export function clone() {
  // document.querySelector('#clonebutton').disabled = true;
  worker.postMessage({
    command: "clone",
    url: `http://localhost:8000/-/dabeom/node.git`,
  });
}

// function opendirentry(filename) {
//     worker.postMessage({
//         command: 'readfile',
//         filename: filename
//     });

//     addFileContentListener(filename, contents => {
//         let blob;
//         if (filename.indexOf('.') > 0) {
//             switch(filename.split('.')[1]) {
//                 case 'md':
//                     blob = new Blob([marked(contents)], {type: 'text/html'});
//                     break;
//                 case 'html':
//                     blob = new Blob([contents], {type: 'text/html'});
//                     break;
//                 default:
//                     blob = new Blob([contents], {type: 'text/plain'});
//                     break;
//             }
//         }
//         window.open(
//             URL.createObjectURL(
//                 blob
//             )
//         );
//     });
// }

export function synclocal() {
  // emptyDirView();
  worker.postMessage({
    command: "synclocal",
    url: `http://localhost:8000/-/dabeom/node.git`,
  });
  worker.postMessage({
    command: "readfile",
    filename: "/home/web_user/.gitconfig",
  });
}

export function readFile() {
  worker.postMessage({
    command: "readfile",
    filename: "/node/readme.md",
  });
  worker.postMessage({
    command: "readfile",
    filename: "/home/web_user/.gitconfig",
  });
}

// function deletelocal() {
//     worker.postMessage({
//         command: 'deletelocal',
//         url: document.querySelector("#gitrepourl").value
//     });
// }

// function gitcommand(cmd) {
//     worker.postMessage({
//         command: cmd
//     });
// }

// function openEditor(filename) {
//     const onFileContentReady = contents => {
//         const editorElement = document.querySelector('#editortemplate').content.cloneNode(true);
//         const el = editorElement.querySelector('textarea');
//         el.value = contents;
//         const filenamefieldelement = editorElement.querySelector('#filenamefield');
//         const commitmessageelement = editorElement.querySelector('#commitmessagefield');
//         filenamefieldelement.value = filename;
//         if (filename) {
//             commitmessageelement.value = `edited ${filename}`;
//         } else {
//             commitmessageelement.value = 'add new file';
//         }
//         editorElement.querySelector('#savebutton').onclick = () => {
//             if(filenamefieldelement.value && el.value !== contents) {
//                 worker.postMessage({
//                     command: 'writeandcommit',
//                     commitmessage: commitmessageelement.value,
//                     filename: filenamefieldelement.value,
//                     contents: el.value
//                 });
//                 document.body.removeChild(document.querySelector('#editor'));
//             } else if (!filenamefieldelement.value ) {
//                 console.error('missing filename');
//             } else if (el.value === contents) {
//                 console.error('no changes');
//             }
//         };

//         editorElement.querySelector('#cancelbutton').onclick = () => {
//             document.body.removeChild(document.querySelector('#editor'));
//         }

//         document.body.appendChild(editorElement);
//     };

//     if (filename) {
//         worker.postMessage({
//             command: 'readfile',
//             filename: filename
//         });
//         addFileContentListener(filename, onFileContentReady);
//     } else {
//         filename = '';
//         onFileContentReady('new file');
//     }
// }

// const lastUrl = localStorage.getItem('lastRemoteUrl');
// document.querySelector("#gitrepourl").value = lastUrl ? lastUrl : `${self.location.origin}/test`;

// synclocal();
