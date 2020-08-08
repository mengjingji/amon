yum install -y wget expect
mkdir -p /etc/init.d/
touch /etc/init.d/crond
chmod 777 /etc/init.d/crond
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh
