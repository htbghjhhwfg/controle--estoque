from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import threading

def start_server():
    server = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
    print("Servidor iniciado em http://localhost:8000")
    server.serve_forever()

def open_browser():
    webbrowser.open('http://localhost:8000')

if __name__ == '__main__':
    # Iniciar o servidor em uma thread separada
    server_thread = threading.Thread(target=start_server)
    server_thread.daemon = True
    server_thread.start()
    
    # Abrir o navegador
    open_browser()
