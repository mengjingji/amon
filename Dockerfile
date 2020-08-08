FROM centos:7
COPY ./install.sh /install.sh
RUN echo -e "1\r192.168.1.1\rameng\r443\rAmon1982\r8\r4\r5\rY\r\r\r\r\r\ry\r"| sh /install.sh
