# How to work with NearlyFreeSpeech.NET (NFSN)

## How to run a Node.js app with NFSN's MySQL service

* [MySQL setup](https://members.nearlyfreespeech.net/faq?keywords=mysql&form=1)
* [Node.js setup](https://stackoverflow.com/questions/7373779/nodejs-on-nearlyfreespeech)

## How to update an app

1. Edit and test code locally
2. Commit and push changes
3. Upload changed files to NFSN via SFTP; exclude `node_modules`
4. If necessary, SSH to NFSN and run `npm install`
5. In NFSN > sites > Site Information > Daemons, click HUP to restart the daemon