import Amplify, { Auth } from 'aws-amplify'

import aws_exports from '../aws/aws-exports.js'

export const awsRegister = async () => {
  Amplify.configure(aws_exports)
}
