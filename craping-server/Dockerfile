from python:3.6
MAINTAINER tunguyenuni@gmail.com

WORKDIR /usr/src/app

RUN pip3 install bs4
RUN pip3 install requests
RUN pip3 install flask

EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["server.py"]
