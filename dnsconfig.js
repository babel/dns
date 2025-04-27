// @ts-check
/// <reference path="types-dnscontrol.d.ts" />

var REG_NONE = NewRegistrar("none");
var DNS_CLOUDFLARE = NewDnsProvider("cloudflare");

DEFAULTS(
  CF_PROXY_DEFAULT_OFF // turn off the orange cloud
);

D("babeljs.io", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  // babeljs.io website
  A("@", "3.124.100.143"),
  A("@", "3.125.36.175"),
  CNAME("www", "babel.netlify.app."),
  CNAME("new", "babel.netlify.app."),
  CNAME("next", "babel-next.netlify.app."),
  CNAME("old", "babel-old.netlify.com."),
  CNAME("v6", "babel-old.netlify.com."),

  // Slack
  CNAME("_acme-challenge.slack", "ad7c4b8d-f2dc-456b-8da0-80caef61f449.acme.d.sb."),
  CNAME("slack", "babel-slack-invite-link.netlify.app."),

  // Email
  CNAME("verify60970", "mailgun.org."),
  MX("@", 10, "mxa.mailgun.org."),
  MX("@", 10, "mxb.mailgun.org."),
  TXT("@", "v=spf1 include:mailgun.org ~all"),
  TXT("pic._domainkey", "k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzOdtkSzaHBIBklk/c49YKjxYlyWJYftaV+qvgJcndKgg88XlTi1HaZVkb+2L1J1GzCZy3aNHv5OxXquRUB4NqSD6g9D9rO9ytvogwFavic/UoI5RxDpUs1XWA+ZVRnDtRXuinJeq9ZRqEp6BAqUCVdsntT5zkGCcdihb/hfM4Qgfnd33T7LDfVQLiCmxgqaCqlTKkNrxnE5R4dwHTO16Xw7FDibgsiXMriIu2zn0peTTnpgRGsTOPKnI8lquKKQrfmYh1P4ViMKbq2gvPL5NPvLtgGmw77RHHapYasrEkJfTEGPvHslsnqJNhCzbHgFzCSHqKBHXnSVKjWCikcE5WQIDAQAB"),

  // Other
  CNAME("discuss", "hosted-vh1.discourse.org."),
  CNAME("podcast", "babel-podcast.netlify.com."),
  CNAME("donate", "babeljs.io."), // Will redirect to OpenCollective

  // ???
  TXT("@", "google-site-verification=P2hE7IscrrfmQWVSQm1_QSB7rXxuKYDm3S5r2if9qkY"), // Google Workspace?
  TXT("_github-challenge-babel", "5d7d8ba399"), // GitHub pages?
);

D("babeljs.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  A("@", "3.124.100.143"),
  A("@", "3.125.36.175"),
  CNAME("www", "babeljs.io."),
);

D("babel.dev", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  // babel.dev website
  A("@", "54.177.145.149"),
  A("@", "54.67.4.46"),
  A("www", "54.177.145.149"),
  A("www", "54.67.4.46"),
  AAAA("@", "2600:1f1c:446:4900::1f4"),
  AAAA("@", "2600:1f1c:446:4901::1f4"),
  AAAA("www", "2600:1f1c:446:4900::1f4"),
  AAAA("www", "2600:1f1c:446:4901::1f4"),
);

// Bluesky
var blueskyDid = "did=did:plc:zpbxe3xx3km2ca65meuzjioa";
D_EXTEND("babeljs.io", TXT("_atproto", blueskyDid));
D_EXTEND("babel.dev", TXT("_atproto", blueskyDid));
