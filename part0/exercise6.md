sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa {content: "..", date: "..."}
    activate server
    server-->>browser: {message: "note created"}
    deactivate server

    Note right of server: Server stores received JSON object. 
