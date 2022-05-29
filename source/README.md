## Manual Installation
```
sudo apt-get install mpg123 

sudo apt-get install python3-smbus python3-dev i2c-tools
```

## Install Docker and docker compose

```
sudo apt-get install -y python3 python3-pip

curl -fsSL https://get.docker.com -o get-docker.sh

sudo sh get-docker.sh

docker version

sudo usermod -aG docker pi

sudo pip3 install docker-compose

sudo systemctl enable docker
```


## Enable audio and extra sensors


```
sudo nano /boot/config.txt

#Uncomment 
dtparam=i2c_arm=on
dtparam=audio=on

# Add the line 
dtoverlay=audremap

```

## Enable options and edit hostname

```
sudo raspi-config
```
* Edit hostname
* Enable I2C
* Enable 1-Wire
* Enable SPI


## Basic files
Transfer the all the files from the basic scripts folder to the /home/pi/

```
docker_compose.yml
install_comitup.sh
update_system.sh
```

## Install wifi manager 

```
sudo su
./install_comitup.sh
```

## Edit AP wifi options

```
sudo comitup-cli
```


## Start the system 

```
docker-compose up
```

## Update the system 

```
./update_system.sh
```