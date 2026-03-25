#!/usr/bin/env bash
# =============================================================================
# deploy-proto.sh
#
# Deploys the Gatsby client to the proto AWS environment:
#   https://proto.app.eulogizememorials.com
#
# What it does:
#   1. Pulls env vars from SSM (/eulogise/client/proto)
#   2. Builds the Gatsby app with ENV=proto
#   3. Syncs the build output to S3 (proto.app.eulogizememorials.com)
#   4. Invalidates the CloudFront cache (E2EUKRCNVOST9G)
#
# Usage:
#   ./scripts/deploy-proto.sh
#
# Prerequisites:
#   - AWS CLI configured with EULOGIZE_AWS_PROFILE
#   - Node v24 + Yarn Berry installed
#   - Run from the repo root
# =============================================================================

set -euo pipefail

ENVIRONMENT="proto"
S3_BUCKET="proto.app.eulogizememorials.com"
DISTRIBUTION_ID="E2EUKRCNVOST9G"
REGION="ap-southeast-2"
AWS_PROFILE="${EULOGIZE_AWS_PROFILE:-default}"
CLIENT_DIR="packages/eulogise-client"
ENV_FILE="${CLIENT_DIR}/environments/.env.${ENVIRONMENT}"

echo "🚀 Deploying proto environment..."
echo "   S3:          s3://${S3_BUCKET}"
echo "   CloudFront:  ${DISTRIBUTION_ID}"
echo ""

# Step 1 — pull env vars from SSM
echo "📥 Loading env vars from SSM (/eulogise/client/${ENVIRONMENT})..."
AWS_REGION="${REGION}" AWS_PROFILE="${AWS_PROFILE}" \
  node "${CLIENT_DIR}/scripts/load-ssm-env.js" \
  --env "${ENVIRONMENT}" \
  --path "/eulogise/client/${ENVIRONMENT}"

# Step 2 — build shared packages first (core, client-core, helpers, client-components)
echo "🔨 Building shared packages..."
yarn build

# Step 3 — build Gatsby app
echo "🔨 Building Gatsby app (ENV=${ENVIRONMENT})..."
yarn build:ui:proto

# Step 4 — sync to S3
echo "☁️  Syncing to s3://${S3_BUCKET}..."
aws s3 sync "${CLIENT_DIR}/public" "s3://${S3_BUCKET}" \
  --delete \
  --profile "${AWS_PROFILE}" \
  --region "${REGION}"

# Step 5 — invalidate CloudFront
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths '/*' \
  --profile "${AWS_PROFILE}" \
  --query 'Invalidation.{Id:Id,Status:Status}' \
  --output table

# Step 6 — cleanup env file
echo "🧹 Cleaning up env file..."
rm -f "${ENV_FILE}"

echo ""
echo "✅ Proto deploy complete!"
echo "   🌐 https://proto.app.eulogizememorials.com"
