# vinfo

[![Build Status](https://dev.azure.com/Freeedu/vinfo/_apis/build/status/jkallu.vinfo_git?branchName=master)](https://dev.azure.com/Freeedu/vinfo/_build/latest?definitionId=6&branchName=master)

## Run   
### First time clone
```
git clone https://github.com/jkallu/vinfo_git.git   
cd vinfo_git 
sudo docker run  -v `pwd`/src/front_end/python/www:/app  jinkallu/python_gcc:198 python main.py
```
### Already cloned
From location vinfo_git
```
git pull   
sudo docker run  -v `pwd`/src/front_end/python/www:/app  jinkallu/python_gcc:198 python main.py

```

