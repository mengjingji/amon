FROM centos:7
COPY ./install.sh /install.sh
RUN echo -e "1\n192.168.1.1\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"| sh /install.sh
