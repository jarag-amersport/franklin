# Sitemap Checker

This script checks that all parts that makes dynamic sitemap works are well configured:
- the `helix-sitemap.yaml`, it reads from a `query-index` to write the sitemap file.
- the `helix-query.yaml` that configures where each index is managed and which are its property
- the push invalidation, sitemap will be updated so the client DNS should pick up the update

The script will perform the following actions:
1. Request an re-index for a url matching `/products/test/SOME-UUID`
2. Wait for the URL to appear in the sitemap of the domain passed in parameter
3. Request a removal from the index of the previous URL
4. Wait until the URL is removed from the sitemap

## Runing the script

Run the following command:

```
node sitemap-checker.js franklin.maidenform.com
```
