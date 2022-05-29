wget https://davesteele.github.io/comitup/deb/davesteele-comitup-apt-source_1.2_all.deb
dpkg -i --force-all davesteele-comitup-apt-source_1.2_all.deb
apt-get update
apt-get install comitup comitup-watch
rm /etc/network/interfaces
systemctl mask dnsmasq.service
systemctl mask systemd-resolved.service
systemctl mask dhcpd.service
systemctl mask dhcpcd.service
systemctl mask wpa-supplicant.service
reboot