# vinfo

[![Build Status](https://dev.azure.com/Freeedu/vinfo/_apis/build/status/jkallu.vinfo_git?branchName=master)](https://dev.azure.com/Freeedu/vinfo/_build/latest?definitionId=6&branchName=master)

## Run   
### First time clone
```
git clone https://github.com/jkallu/vinfo_git.git   
cd vinfo_git 
docker run  -v `pwd`/src/flaskr:/app -p 5000:5000 jinkallu/python_gcc python run.py
```
### Already cloned
From location vinfo_git
```
git pull   
docker run  -v `pwd`/src/flaskr:/app -p 5000:5000 jinkallu/python_gcc python run.py
```

