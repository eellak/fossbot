FROM python:3.7
RUN apt update && apt install -y mpg123
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
ENV CFLAGS="-fcommon"
CMD [ "python", "./app.py" ]
