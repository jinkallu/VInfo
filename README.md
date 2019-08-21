# vinfo

[![Build Status](https://dev.azure.com/Freeedu/vinfo/_apis/build/status/jkallu.vinfo_git?branchName=master)](https://dev.azure.com/Freeedu/vinfo/_build/latest?definitionId=6&branchName=master)
#
## Run   
### First time clone
```
git clone https://github.com/jkallu/vinfo_git.git   
cd vinfo_git 
```
To build the Svelte app
```
docker run  -v `pwd`:/app jinkallu/python_gcc npm --prefix src/flaskr/svelte-app run build
```
To run the server on http://0.0.0.0:8081/
```
docker run  -v `pwd`/src/flaskr:/app -p 8081:8081 jinkallu/python_gcc python run.py
```
To run API server on http://0.0.0.0:5000/
```
docker run  -v `pwd`/src/flaskr/api:/app -p 5000:5000 jinkallu/python_gcc python run.py
```
### Already cloned
From location vinfo_git
```
git pull   
```
To build the Svelte app
```
docker run  -v `pwd`:/app jinkallu/python_gcc npm --prefix src/flaskr/svelte-app run build
```
To run the server on http://0.0.0.0:8081/
```
docker run  -v `pwd`/src/flaskr:/app -p 8081:8081 jinkallu/python_gcc python run.py
```
### Docker
Time to time it is better to pull the latest docker image
```
docker pull jinkallu/python_gcc:latest
```
### Tests
API
```
docker run -v `pwd`/src:/app jinkallu/python_gcc pytest -rav flaskr/tests/api/unit
```
In ubuntu add sudo for running docker.

Test to check Azure board works well with Github
