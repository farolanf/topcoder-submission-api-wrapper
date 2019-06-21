/*
 * Wrapper function for Submission related endpoints
 */

const helper = require('./common/helper')

/**
 * Function to search Submissions with pagination and filter(type, url, memberId, challengeId, legacySubmissionId, legacyUploadId, submissionPhaseId)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), type(the type filter for submissions),
 *   url(the url filter for submissions), memberId(the member id filter for submissions), challengeId(the challenge id filter for submissions)
 *   legacySubmissionId(the legacy submission id filter for submissions), legacyUploadId(the legacy upload id filter for submissions),
 *   and submissionPhaseId(the submission phase id filter for submissions)
 * @returns {Promise} searched Submissions
 */
const searchSubmissions = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/submissions`, reqQuery)
  return helper.reqToV5API(config, 'GET', url)
}

/**
 * Function to HEAD the Submissions with pagination and filter(type, url, memberId, challengeId, legacySubmissionId, legacyUploadId, submissionPhaseId)
 * @param {Object} config Configuration object
 * @param {Object} reqQuery the query object, including page(The page number, default value is 1.),
 *   perPage(The number of items to list per page, default value is 20.), type(the type filter for submissions),
 *   url(the url filter for submissions), memberId(the member id filter for submissions), challengeId(the challenge id filter for submissions)
 *   legacySubmissionId(the legacy submission id filter for submissions), legacyUploadId(the legacy upload id filter for submissions),
 *   and submissionPhaseId(the submission phase id filter for submissions)
 * @returns {Promise} searched Submissions
 */
const headSubmissions = async (config, reqQuery) => {
  const url = helper.buildURLwithParams(`${config.SUBMISSION_API_URL}/submissions`, reqQuery)
  return helper.reqToV5API(config, 'HEAD', url)
}

/**
 * Function to create the Submission.
 * @param {Object} config Configuration object
 * @param {Object} reqBody the request body object, including submission(the submission file to upload), url(submission file url),
 *   fileType(file type of uploaded file or URL provided, Defaults to zip if not provided), type(submission type),
 *   memberId(the member id), challengeId(the challenge id),
 *   legacySubmissionId(the legacy submission id), legacyUploadId(the legacy upload id), submissionPhaseId(the submission phase id)
 * @returns {Promise} created Submission
 */
const createSubmission = async (config, reqBody) => {
  return helper.reqToV5API(config, 'POST', `${config.SUBMISSION_API_URL}/submissions`, reqBody)
}

/**
 * Function to get the Submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the Submission id
 * @returns {Promise}
 */
const getSubmission = async (config, submissionId) => {
  return helper.reqToV5API(config, 'GET', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`)
}

/**
 * Function to HEAD Submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the Submission id
 * @returns {Promise}
 */
const headSubmission = async (config, submissionId) => {
  return helper.reqToV5API(config, 'HEAD', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`)
}

/**
 * Function to fully update Submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the Submission id
 * @param {Object} reqBody the request body object, including submissionId(the submission id), type(the submission type), url(the submission url),
 *   memberId(the submission member id), challengeId(the submission challenge id)
 * @returns {Promise} updated Submission
 */
const updateSubmission = async (config, submissionId, reqBody) => {
  return helper.reqToV5API(config, 'PUT', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`, reqBody)
}

/**
 * Function to partially update Submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the Submission id
 * @param {Object} reqBody the request body object, including submissionId(the submission id), type(the submission type), url(the submission url),
 *   memberId(the submission member id), challengeId(the submission challenge id)
 * @returns {Promise} updated Submission
 */
const patchSubmission = async (config, submissionId, reqBody) => {
  return helper.reqToV5API(config, 'PATCH', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`, reqBody)
}

/**
 * Function to delete Submission by id.
 * @param {Object} config Configuration object
 * @param {String} submissionId the Submission id
 * @returns {Promise}
 */
const deleteSubmission = async (config, submissionId) => {
  return helper.reqToV5API(config, 'DELETE', `${config.SUBMISSION_API_URL}/submissions/${submissionId}`)
}

module.exports = {
  searchSubmissions,
  headSubmissions,
  createSubmission,
  getSubmission,
  headSubmission,
  updateSubmission,
  patchSubmission,
  deleteSubmission
}
