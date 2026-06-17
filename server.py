#!/usr/bin/env python3
import os
import http.server
import socketserver

PORT = int(os.environ.get('DEPLOY_RUN_PORT', 5000))
DIRECTORY = os.environ.get('COZE_WORKSPACE_PATH', '.')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()