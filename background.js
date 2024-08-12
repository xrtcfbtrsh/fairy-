chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')){
          return
      }
      
      let targetURL = chrome.runtime.getURL("index.html")
      
      let response = await fetch(targetURL)
      
      let html = await response.text()
      
      html = html.replace("url('images/default_ball.png');", `url('${chrome.runtime.getURL("images/default_ball.png")}');`)
      
      html = html.replace('src="scripts/index.js"', `src="${chrome.runtime.getURL('scripts/index.js')}"`)
      
      let return_message = await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: function(html) {
          const set = new Set(['STYLE', 'DIV', 'SCRIPT'])
          function element_looper(element) {
            if(set.has(element.tagName)) {
              if(element.tagName === "SCRIPT") {
                let script = document.createElement("script")
                script.src = element.src
                document.body.appendChild(script)
                  
              }
              else {
                document.body.appendChild(element)
              }
              return
            }
            let element_children = [...element.children]
            for(let i = 0; i < element_children.length; i++) {
              let loop_element = element_children[i]
              console.log(i)
              console.log(loop_element)
              element_looper(loop_element)
            }
          }
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          element_looper(doc.children[0])
          //console.log(doc.children[0])
          return "success"
        },
        args: [html]
      })

      console.log(return_message);
      
      //console.log(args)

  }
})