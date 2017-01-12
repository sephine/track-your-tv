Aws.config.update({
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
})

s3 = Aws::S3::Resource.new(region: 'us-west-1')
S3_BUCKET =  s3.bucket(ENV['S3_BUCKET'])
