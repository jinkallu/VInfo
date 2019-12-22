# https://hub.docker.com/_/python
FROM ubuntu:18.04

MAINTAINER Jinesh Kallunkathariyil <jinesh.kallunkathariyil@gmail.com>

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt update &&                  \
    #apt upgrade -y &&              \
    #apt dist-upgrade -y &&         \
    apt install -y                 \
        gcc                        \
	g++			   \
	git                        \
	nodejs                     \
        npm                        \
        zip                        \
	python2.7		   \
	python-pip		   \
	libx11-dev               \
        libxpm-dev               \
        libxft-dev               \
        libxext-dev              \
	wget			&& \
    apt clean			 

RUN mkdir /app
WORKDIR /app

RUN cd /app
RUN wget https://root.cern/download/root_v6.18.04.Linux-ubuntu18-x86_64-gcc7.4.tar.gz

RUN tar -zxvf root_v6.18.04.Linux-ubuntu18-x86_64-gcc7.4.tar.gz
RUN source ./root/bin/thisroot.sh
RUN rm root_v6.18.04.Linux-ubuntu18-x86_64-gcc7.4.tar.gz

COPY package.json /app
RUN npm install -g

COPY requirements.txt /app
RUN pip install -r requirements.txt

EXPOSE 5000 

# API pytest
#ENV PYTHONPATH=$PYTHONPATH:flaskr/api/
#ENV PYTHONWARNINGS="ignore"

#ENTRYPOINT ["python"]
#CMD ["main.py"]

