# 🧬 Eulogise generator

![Version - 0.1.0](https://img.shields.io/badge/Version-0.1.0-brightgreen.svg)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/Code_Style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Format - Prettier](https://img.shields.io/badge/Code_Style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Built at DotDev](https://img.shields.io/badge/Built%20At-DotDev-lightgrey.svg)](https://dotdev.com.au)
![#DD1242](https://img.shields.io/badge/Project-DD1242-DD1242.svg)

Node instance for generating booklets and slideshows for [Eulogise](https://github.com/wild-palms/eulogise-client).

## Usage

### Setup

1. Install [Node](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/)
1. Clone `https://github.com/wild-palms/eulogise-generator.git` and cd to the project folder
1. Install dependencies with `yarn install`
1. Create a `.env` file following the `.env.example` file

### Commands

- `yarn start`: Start a production server
- `yarn watch`: Start a development server with [nodemon](https://nodemon.io/) that reloads when files change

## Application overview

![Eulogise generator overview](https://github.com/wild-palms/eulogise-generator/blob/develop/overview-diagram.jpg)

## Resource types

You can generate a PDF from a booklet and a video from a slideshow.

### Booklet

Generate 2 PDF's, 1 with and 1 without cropmarks, and upload files to AWS S3. The endpoint is `/booklet/generate` and requires a payload of the following form:

```json
{
  environment: '<staging or production>',
  booklet: {
    <booklet database entry>
  }
}
```

### Slideshow

Generate an MP4 video and upload it to AWS S3. The endpoint is `/slideshow/generate` and requires a payload of the following form:

```json
{
  environment: '<staging or production>',
  slideshow: {
    <slideshow database entry>
  }
}
```

## Environments

Both `staging` and `production` environments use the same AWS EC2 instance managed by the Wild Palms AWS account. An AMI has been created to spin up new EC2 instances. Follow these steps to update the codebase on the generator instance.

Download the private key located in a password protected `.dmg` on the Google Drive folder of the project. SSH into the the EC2 instance with the following command, update the path to your private key file.

### Production

```bash
ssh -i ~/.ssh/eulogise.pem ubuntu@ec2-54-153-245-238.ap-southeast-2.compute.amazonaws.com
```

Go to the repository folder.

```bash
cd /home/ubuntu/eulogise-generator
```

Update the codebase using [git](https://git-scm.com/), enter your GitHub credentials when prompted.

```bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_eulogise
git pull
```

The generator service is managed by [Systemd](https://github.com/systemd/systemd) so you can use the following command to restart the service.

```bash
sudo systemctl restart eulogise-generator
```

You can check the status of the service with:

```bash
sudo systemctl status eulogise-generator
```

Use Journald when you want to check up on the latest 50 log messages:

```bash
sudo journalctl --unit=eulogise-generator.service | tail -n 50
```

### Staging

```bash
ssh -i ~/.ssh/eulogise.pem ubuntu@ec2-52-64-122-2.ap-southeast-2.compute.amazonaws.com
```

Go to the repository folder.

```bash
cd /home/ubuntu/eulogise-generator
```

Update the codebase using [git](https://git-scm.com/), enter your GitHub credentials when prompted.

```bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_eulogise
git pull
```

The generator service is managed by [pm2](http://pm2.keymetrics.io/) on the staging server. You can restart the service with the following command:

```bash
NODE_ENV=staging pm2 restart index
```

You can check the status of the service with:

```bash
pm2 status
```

Use pm2 logs to check the logs. The following command dsiplays the last 50 lines in the logs:

```bash
pm2 logs --lines 50
```

# Generate AWS Layer for sparticuz
https://github.com/Sparticuz/chromium go to AWS Layer section

To publish a new layer
clone this project https://github.com/shelfio/chrome-aws-lambda-layer and then
1. put the zip version of your layer file into the repo
2. update and execute create.sh
3. update and execute publish.sh

# Run the PDF generator locally
1. need to build storybook
2. npx serve storybook-static # in `generator` directory
3. search for `iframe.html` in `CardProductPdfHelper` and change it to `iframe`
4. `yarn test` if you would like to run all the test and generate all the pdf files


## Related links

- [Install node on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
- [Puppeteer dependencies](https://techoverflow.net/2018/06/05/how-to-fix-puppetteer-error-while-loading-shared-libraries-libx11-xcb-so-1-cannot-open-shared-object-file-no-such-file-or-directory/)
- [Install ffmpeg on Ubuntu](https://www.faqforge.com/linux/how-to-install-ffmpeg-on-ubuntu-14-04/)
