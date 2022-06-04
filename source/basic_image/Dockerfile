FROM python:3.7
RUN apt update && apt install -y mpg123
COPY robot_lib /robot_lib
COPY requirements.txt /requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN rm -rf /requirements.txt
ENV CFLAGS="-fcommon"
