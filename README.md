# vinfo

[![Build Status](https://dev.azure.com/Freeedu/vinfo/_apis/build/status/jkallu.vinfo_git?branchName=master)](https://dev.azure.com/Freeedu/vinfo/_build/latest?definitionId=6&branchName=master)

## Overview

**VInfo** is a modular web application that integrates a MediaWiki backend, a modern Svelte-based frontend, and a RESTful API. The project is designed for collaborative document management, rich media viewing, and extensible data workflows.

### Main Components

- **MediaWiki Backend:**  
  The codebase includes an embedded MediaWiki instance (`src/mediawiki`) with several extensions, such as CodeEditor and MultimediaViewer, to provide advanced wiki editing and media management capabilities.

- **API Server:**  
  The `src/flaskr/api` directory contains a Flask-based API server. This exposes REST endpoints for interacting with your wiki data, media files, and user management.

- **Frontend (Svelte App):**  
  The `src/flaskr/svelte-app` directory hosts a Svelte frontend application. This provides a modern, responsive user interface for interacting with the backend services.

- **Docker Integration:**  
  The repository supports containerized development and deployment using Docker, with pre-built images available for the Python/Flask environment and build automation.

- **Testing:**  
  Automated tests are provided for the API using Pytest.

### Directory Structure

- `src/mediawiki/` – MediaWiki core and extensions
- `src/flaskr/` – Flask app and API code
- `src/flaskr/svelte-app/` – Svelte frontend source
- `src/noder/static/materialize/` – Static assets (Materialize CSS framework)
- `tests/` – Test scripts and fixtures

## Getting Started

### First time clone

```sh
git clone https://Freeedu@dev.azure.com/Freeedu/vinfo/_git/vinfo   
cd vinfo   
```

To build the Svelte app:
```sh
docker run  -v `pwd`:/app jinkallu/python_gcc npm --prefix src/flaskr/svelte-app run build
```

To run the server on http://0.0.0.0:8081/:
```sh
docker run  -v `pwd`/src/flaskr:/app -p 8081:8081 jinkallu/python_gcc python run.py
```

To run the API server on http://0.0.0.0:5000/:
```sh
docker run  -v `pwd`/src/flaskr/api:/app -p 5000:5000 jinkallu/python_gcc python run.py
```

### Already cloned

From location vinfo_git:
```sh
git pull   
```
To build the Svelte app:
```sh
docker run  -v `pwd`:/app jinkallu/python_gcc npm --prefix src/flaskr/svelte-app run build
```
To run the server on http://0.0.0.0:8081/:
```sh
docker run  -v `pwd`/src/flaskr:/app -p 8081:8081 jinkallu/python_gcc python run.py
```

### Docker

Time to time it is better to pull the latest docker image:
```sh
docker pull jinkallu/python_gcc:latest
```

### Tests

API:
```sh
docker run -v `pwd`/src:/app jinkallu/python_gcc pytest -rav flaskr/tests/api/unit
```
In ubuntu add `sudo` for running docker.

## Contributing

Feel free to open issues or submit pull requests to improve VInfo.

---

*Test to check Azure board works well with Github*

test
