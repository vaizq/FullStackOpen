sequenceDiagram
    participant browser 
    participant server

    browser->>server : POST https://studies.cs.helsinki.fi/exampleapp/new_note {note: "hello"}
    activate server
    server->>browser: HTML document
    deactivate server

    Note right of server: Server stores received note.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS stylesheet 
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: Javascript file 
    deactivate server
  
    Note right of browser: Browser starts executing javascript and fetches data.json from server. 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: JSON file
    deactivate server

    Note right of browser: Browser parses received json and renders notes inside li elements.

