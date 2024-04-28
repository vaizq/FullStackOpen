sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
    activate server
    server-->>browser: CSS stylesheet 
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa/spa.js
    activate server
    server-->>browser: Javascript code 
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches notes from the server. It also binds an handler to the form to update notes when user presses save.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON object describing the notes
    deactivate server

    Note right of browser: Browser updates notes array and redraws the notes.


