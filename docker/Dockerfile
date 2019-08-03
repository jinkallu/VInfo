# https://hub.docker.com/_/python
FROM python:3.7-slim

MAINTAINER Jinesh Kallunkathariyil <jinesh.kallunkathariyil@gmail.com>

RUN apt update &&                  \
    #apt upgrade -y &&              \
    #apt dist-upgrade -y &&         \
    apt install -y                 \
        gcc                        \
	git                        \
	nodejs                     \
        npm                        \
        postgresql                 \
        postgresql-contrib       &&\
    apt clean			 &&\
    npm install --save-dev jest

RUN mkdir /app
COPY requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt

EXPOSE 5000

#ENTRYPOINT ["python"]
#CMD ["main.py"]

