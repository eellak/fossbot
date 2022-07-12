FROM chronis10/fossbot_basic:latest
WORKDIR /app
# Adding requirements file to current directory, just this file first to cache the pip install step when code changes
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN rm -rf requirements.txt

# copy code itself from context to image
COPY . .
RUN rm -rf Dockerfile
CMD [ "python", "./app.py" ]

FROM ubuntu:20.04

RUN apt-get update 
RUN apt-get install -y sudo
RUN adduser --quiet --disabled-password --shell /bin/bash --home /home/robot robot

# set password
RUN echo "robot:robot" | chpasswd
RUN usermod -aG sudo robot  