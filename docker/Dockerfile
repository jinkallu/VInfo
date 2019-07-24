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

WORKDIR /src
ENTRYPOINT ["python"]
CMD ["main.py"]

