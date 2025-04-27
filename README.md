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

## Contributing flow

All changes to this repository must be made through pull requests. When opening a pull request, GitHub Actions will generate a previw of the DNS changes and post is as a comment.

## Copying this repository for your organization

Feel free to fork this repository in your own organization! Here is the recommended setup:
- Babel's DNS is managed through Cloudflare:
  - if you also use Cloudflare, you can copy the GitHub Actions workflows as-is. You will need to provide the following secrets: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN_WRITE` (with the permissions described in the [DNSControl documentation](https://docs.dnscontrol.org/provider/cloudflareapi#api-tokens-recommended)), `CLOUDFLARE_API_TONEN_READ_ONLY` (same as `CLOUDFLARE_API_TOKEN_WRITE`, but will all permissions set to "Read").
  - if you use any other provider, check on the DNSControl documentation how to configure it and update the GitHub Actions workflow to pass the correct environment variables to the Docker container.
- In the GitHub repository [settings for for branches](https://github.com/babel/dns/settings/branches), create a rule for the `main` branch with the following restrictions:
  - Require linear history
  - Require a pull request before merging
  - Require status checks to pass
    - Require branches to be up to date before merging
    - Select the "Preview" check as required
