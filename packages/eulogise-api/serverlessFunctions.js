const splitList = (value) => {
  if (!value) return []
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

module.exports = () => {
  const subnets = splitList(process.env.XAWS_SUBNET_IDS)
  const securityGroupIds = splitList(process.env.XAWS_SECURITY_GROUP_IDS)

  return {
    subnets,
    securityGroupIds,
  }
}
