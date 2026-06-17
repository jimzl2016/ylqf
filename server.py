#!/usr/bin/env python3
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = int(os.environ.get('DEPLOY_RUN_PORT', 5000))

class Handler(SimpleHTTPRequestHandler):
    pass

print(f'Starting server on port {PORT}', flush=True)
httpd = HTTPServer(('', PORT), Handler)
httpd.serve_forever()
