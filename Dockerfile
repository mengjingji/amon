FROM centos:7
RUN yum install -y wget expect
RUN mkdir -p /etc/init.d/
RUN touch /etc/init.d/crond
RUN chmod 777 /etc/init.d/crond
RUN wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssrmu.sh && chmod +x ssrmu.sh && bash ssrmu.sh
