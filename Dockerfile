FROM ubuntu:latest
WORKDIR /app
RUN apt update

RUN apt install -y python3
RUN apt install -y python3-pip
RUN apt install -y neofetch

RUN pip install numpy
RUN pip install pywal
RUN pip install matplotlib