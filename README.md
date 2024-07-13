# VS-audio-video-upload

This project is a MERN stack application that allows users to upload video and audio files, checks their duration, and compresses them before uploading to an AWS S3 bucket.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Important Note](#important-note)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or hosted)
- [AWS S3 Bucket](https://aws.amazon.com/s3/)
- [FFmpeg](https://ffmpeg.org/) installed and added to your system path

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nomanluhar/VS-audio-video-upload.git
   cd VS-audio-video-upload

2. Install back-end dependencies (Terminal-1):
    ```bash
    cd back-end
    npm install

3. Install front-end dependencies (Terminal-2):
    ```bash
    cd front-end
    npm install

## Configuration
    Server Configuration:

        Create a .env file in the back-end directory and add the following environment variables:


            PORT=5000
            MONGODB_URI=your_mongodb_connection_string
            AWS_ACCESS_KEY_ID=your_aws_access_key
            AWS_SECRET_ACCESS_KEY=your_aws_secret_key
            AWS_BUCKET_NAME=your_s3_bucket_name

    FFmpeg Configuration:

        Ensure FFmpeg is installed on your system. You can download it from FFmpeg.org.

        Make sure FFmpeg and FFprobe paths are correctly set in your ffmpegController.js file if they are not added to your system's PATH:


        ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");
        ffmpeg.setFfprobePath("/usr/bin/ffprobe");

## Running the Application
    1.Start the back-end (Terminal-1):
        cd back-end
        npm start

    Start the front-end (Terminal-2):
        cd front-end
        npm start
    
    The front-end should now be running on http://localhost:3000.

    ## NOTE 
        Please make sure to use two terminal to running both the back-end and front-end properly.

## API Endpoints
    Upload File
        URL: /api/upload
        Method: POST
        Description: Uploads a file, checks its duration, compresses it if necessary, and uploads it to S3.
        Payload: Form data with fields name, title, description, and file.
    
    Get All Files
        URL: /api/files
        Method: GET
        Description: Retrieves all uploaded files metadata.

## File Structure
    VS-audio-video-upload/
    ├── front-end/                # React frontend
    │   ├── public/
    │   ├── src/
    │   ├── .env
    │   ├── package.json
    │   └── package-lock.json
    ├── back-end/                 # Express backend
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── uploads/
    │   ├── .env
    │   ├── package.json
    │   └── package-lock.json
    ├── .gitignore
    └── README.md

## Usage
    Upload a File:

        Navigate to the upload page on the client.
        Fill out the form with the file and its metadata.
        Submit the form to upload the file.
        View Uploaded Files:

    Navigate to the files page to see a list of all uploaded files.

## Important Note
    AWS S3 Credentials:

        In some cases, you may need to hardcode AWS S3 credentials directly into your code if there are issues with accessing them via environment variables. This is not recommended for production use due to security reasons.
        If you encounter access issues, you can temporarily hardcode your credentials in s3FileUploadController.js as shown below:
        
            const AWS = require('aws-sdk');
            const s3 = new AWS.S3({
                accessKeyId: 'your_aws_access_key_id',
                secretAccessKey: 'your_aws_secret_access_key',
                region: 'your_aws_region'
            });







   
