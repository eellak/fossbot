FROM chronis10/fossbot_basic:latest
WORKDIR /app
# copy code itself from context to image
COPY . .
RUN pip install --no-cache-dir -r /app/f
RUN rm -rf requirements.txt
RUN rm -rf Dockerfile
CMD [ "python", "./app.py" ]

FROM ubuntu:20.04

RUN apt-get update 
RUN apt-get install -y sudo
RUN adduser --quiet --disabled-password --shell /bin/bash --home /home/robot robot

# set password
RUN echo "robot:robot" | chpasswd
RUN usermod -aG sudo robot  