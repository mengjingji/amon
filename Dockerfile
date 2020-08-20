FROM centos:7
#COPY ./install.sh /install.sh
#RUN echo -e "1\n47.242.15.97\nameng\n443\nAmon1982\n8\n4\n5\nY\n\n\n\n\n\ny\n"| sh /install.sh
CMD /bin/sh -c 'echo -e "10\n" | sh /ssrmu.sh ; sleep 999999'
