import serialize = require("serialize-javascript");
import { ViewRenderer } from "../interfaces";

export const indexView: ViewRenderer = (rawData, stackTrace) => {
  let serializedData;

  try {
    serializedData = serialize(rawData);
  } catch (error) {
    serializedData = `Error serialising data: ${error}`;
  }

  return `
   <html lang="en">
   <head>
      <title>webdevetc browser dump</title>
      <link rel="icon" href="data:;base64,=">
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
      <style>
         body {
         font-family: sans-serif;
         font-size: 16px;
         background: #bbdefb;
         line-height: 20px;
         margin-top:50px;
         }
         h1 {
         color: black;
         }
         h1 > span { color: gray; }
         .instructions {
         max-width: 600px;
         margin: 0 auto;
         }
         textarea { 
         width: 100%;
         display: block;
         margin: 50px auto;
         max-width: 80%;
         padding: 15px;
         }
         li {margin-bottom: 5px;}
         a { color: blue; }
         code {
         display: inline-block;
         padding: 1px 5px;
         border-radius: 7px;
         background: #696969;
         font-weight: bold;
         color: white;
         } 
         .large-code {
         min-height: 100px;
         white-space: pre;
         display: block;
         overflow: auto;
         font-family: monospace;
         padding: 15px;
         }
         hr { margin: 50px;}
         footer { 
         color: gray;
         margin: 150px 50px; 
         text-align: center;
         }
      </style>
   </head>
   <body>
      <main class="instructions">
         <h1><span>Web dev etc</span> browser-dump</h1>
         
         <p>
            Use your browser's inspector to see the data!
         </p>
         <p>On <b>Chrome</b> press:</p>
         <ul>
            <li>For <strong>Mac OS</strong> users: <code>cmd &#x2318;</code> + <code>option &#8997;</code> + <code>i</code> 
            <li>For <strong>Windows/Linux</strong> users: <code>Control</code> + <code>Shift</code> + <code>J</code> 
         </ul>
         <p>From there go to the console and interact with <code>window.data</code> variable. A summary JSON view is output below, but this will be missing anything that JSON cannot parse, so check the inspector for more.</p>
      </main>
      <code id="output" class="large-code">[loading]</code>
      
      <hr />
      <h2>Stack trace:</h2>
      <div class="large-code">${stackTrace}</div>
      
      <hr />
      <footer>
          Output generated on ${new Date().toString()}
          &bullet;
          <a href="https://webdevetc.com/">webdevetc (documentation)</a>
      </footer>
      <script>
         // Your data - access it via window.data:
         window.data = ${serializedData};
         window.dataJson = ${JSON.stringify(serializedData)};
         
         console.log('%cYour data:','font-weight: bold; color: #bada55; font-size: 20px;');
         console.log('%c(access it with window.data. You can also access window.dataJson to view it as parsed JSON)', 'font-style: italic; color: gray;');
         console.log(${serializedData});
         
         document.getElementById('output').innerText = ['string','number'].includes(typeof window.data) 
                            ? window.data 
                            : JSON.stringify(window.data,null, '  ');
      </script>

   </body>
</html>
      `;
};
