# Babel's DNS records

- babeljs.io, managed by Cloudflare
- babeljs.com, managed by Cloudflare
- babel.dev, managed by Cloudflare

This repository uses [DNSControl](https://dnscontrol.org/) to manage DNS through Git,
making it easier to track changes and collaborate.

## Commands

Before running these commands, you need to copy the `.env.example` file to `.env` and fill in the required values.

**Preview changes**

After updating the DNS configuration, youn can preview the actual changes that it will cause.

```
docker run --rm -it -v "$(pwd):/dns" --env-file .env ghcr.io/stackexchange/dnscontrol:4.18.0 preview
```

**Push changes**

After previewing the changes, you can push them to the DNS provider.

```
docker run --rm -it -v "$(pwd):/dns" --env-file .env ghcr.io/stackexchange/dnscontrol:4.18.0 push
```

**Re-generate `./types-dnscontrol.d.ts`**

This is only needed when upgrading DNSControl.

```
docker run --rm -it -v "$(pwd):/dns" ghcr.io/stackexchange/dnscontrol:4.18.0 write-types
```

