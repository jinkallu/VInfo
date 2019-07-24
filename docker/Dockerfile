# https://hub.docker.com/_/python
FROM python:3

MAINTAINER Jinesh Kallunkathariyil <jinesh.kallunkathariyil@gmail.com>

RUN apt update &&                  \
    #apt upgrade -y &&              \
    #apt dist-upgrade -y &&         \
    apt install -y                 \
        gcc                        \
        postgresql                 \
        postgresql-contrib       &&\
    apt clean

WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["main.py"]

