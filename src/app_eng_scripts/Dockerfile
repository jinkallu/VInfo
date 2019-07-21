FROM alpine:3.7
WORKDIR /home/root/

RUN apk update &&         \
    apk add gcc           \
            gsl           \
            python3 &&    \
    pip3 install Flask
           


CMD ["/bin/ash"]
