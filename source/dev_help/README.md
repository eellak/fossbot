#Local Build and development

## Basic image
Inside the fossbot/source/basic_image
```
docker build -f Dockerfile.local -t fossbot_basic .
```

## Blockly server
Inside the fossbot/source/blockly_server
```
docker build -f Dockerfile.local -t fossbot_blockly .
```

## Start with attach using bash
```
docker run --rm -it -p 5000:5000 --entrypoint /bin/bash fossbot_blockly
# Now you can start the app manually 
python3 app.py
```

## Realtime code edit inside the container
```
docker run --rm -p 5000:5000 -it -v $(pwd)/:/app/ --entrypoint /bin/bash fossbot_blockly
```


