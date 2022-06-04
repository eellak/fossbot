FROM chronis10/fossbot_basic:latest
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN rm -rf requirements.txt
RUN rm -rf Dockerfile
CMD [ "python", "./app.py" ]
