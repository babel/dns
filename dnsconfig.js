// @ts-check
/// <reference path="types-dnscontrol.d.ts" />

var REG_NONE = NewRegistrar("none");
var DNS_CLOUDFLARE = NewDnsProvider("cloudflare");

DEFAULTS(
  CF_PROXY_DEFAULT_OFF // turn off the orange cloud
);

var website = [
  // https://docs.netlify.com/domains/configure-domains/configure-external-dns/#configure-an-apex-domain
  ALIAS("@", "apex-loadbalancer.netlify.com."),
  CNAME("www", "babel.netlify.app."),
  CNAME("next", "babel-next.netlify.app."),
];

D("babeljs.io", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  // babeljs.io website
  website,
  CNAME("new", "babel.netlify.app."), // Redirect to babeljs.io
  CNAME("old", "babel-old.netlify.com."), // Legacy website
  CNAME("v6", "babel-old.netlify.com."),

  // Slack
  CNAME("_acme-challenge.slack", "ad7c4b8d-f2dc-456b-8da0-80caef61f449.acme.d.sb."),
  CNAME("slack", "babel-slack-invite-link.netlify.app."),

  // Email
  CNAME("verify60970", "mailgun.org."),
  MX("@", 10, "mxa.mailgun.org."),
  MX("@", 10, "mxb.mailgun.org."),
  TXT("@", "v=spf1 include:mailgun.org ~all"),
  TXT("_dmarc", "v=DMARC1; p=reject; pct=100; fo=1; ri=3600; rua=mailto:ccb90f52@dmarc.mailgun.org,mailto:745e4f4c@inbox.ondmarc.com; ruf=mailto:ccb90f52@dmarc.mailgun.org,mailto:745e4f4c@inbox.ondmarc.com;"),
  TXT("pic._domainkey", "k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzOdtkSzaHBIBklk/c49YKjxYlyWJYftaV+qvgJcndKgg88XlTi1HaZVkb+2L1J1GzCZy3aNHv5OxXquRUB4NqSD6g9D9rO9ytvogwFavic/UoI5RxDpUs1XWA+ZVRnDtRXuinJeq9ZRqEp6BAqUCVdsntT5zkGCcdihb/hfM4Qgfnd33T7LDfVQLiCmxgqaCqlTKkNrxnE5R4dwHTO16Xw7FDibgsiXMriIu2zn0peTTnpgRGsTOPKnI8lquKKQrfmYh1P4ViMKbq2gvPL5NPvLtgGmw77RHHapYasrEkJfTEGPvHslsnqJNhCzbHgFzCSHqKBHXnSVKjWCikcE5WQIDAQAB"),

  // Other
  CNAME("discuss", "hosted-vh1.discourse.org."),
  CNAME("podcast", "babel-podcast.netlify.com."),
  CNAME("donate", "babeljs.io."), // Will redirect to OpenCollective
  // Google Search Console
  TXT("@", "google-site-verification=dvqOoItOBGcbHYIZLluqVF-iOnWx7gGHQVK_vtzHCYo"),
);

D("babeljs.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  website,
);

D("babel.dev", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
  website,
);

// Bluesky
var blueskyDid = "did=did:plc:zpbxe3xx3km2ca65meuzjioa";
D_EXTEND("babeljs.io", TXT("_atproto", blueskyDid));
D_EXTEND("babel.dev", TXT("_atproto", blueskyDid));
