FROM golang:1.11.2-alpine

COPY root /
RUN apk add --no-cache ca-certificates \
        dpkg \
        gcc \
        git \
        musl-dev \
        bash

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" \
    && chmod -R 777 "$GOPATH" \
    && chmod +x /entrypoint.sh

RUN go get github.com/tockins/realize

WORKDIR $GOPATH

COPY . .

EXPOSE 6000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["realize", "start"]



