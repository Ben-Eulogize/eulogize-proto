import 'mocha'
;[
  'API_URL',
  'FILESTACK_CDN',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_REGION',
  'AWS_S3_BUCKET',
  'AWS_S3_URL',
  'XAWS_REGION',
  'XAWS_S3_BUCKET',
  'XAWS_S3_URL',
  'VIDEO_OUTPUT_SIZE',
  'AWS_SDK_LOAD_CONFIG',
  'IS_LAMBDA_GENERATE_SLIDESHOW',
  'CPDF_BIN',
  'DESIGN_SYSTEM_URL',
  'TMP_DIR',
].forEach((key) => console.log(key, process.env[key]))
