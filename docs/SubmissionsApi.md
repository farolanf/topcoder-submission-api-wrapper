# Submissions Api

All URIs are relative to **SUBMISSION_API_URL** configuration variable.

Method | HTTP request | Description
------------- | ------------- | -------------
[**searchSubmissions**](SubmissionsApi.md#searchSubmissions) | **GET** /submissions | Search submissions.
[**headSubmissions**](SubmissionsApi.md#headSubmissions) | **HEAD** /submissions | Same to search submissions, but only response status and headers information return.
[**createSubmission**](SubmissionsApi.md#createSubmission) | **POST** /submissions | Create a submission.
[**getSubmission**](SubmissionsApi.md#getSubmission) | **GET** /submissions/{submissionId} | Get the submission.
[**headSubmission**](SubmissionsApi.md#headSubmission) | **HEAD** /submissions/{submissionId} | Same to get submission, but only response status and headers information return.
[**updateSubmission**](SubmissionsApi.md#updateSubmission) | **PUT** /submissions/{submissionId} | Fully update submission.
[**patchSubmission**](SubmissionsApi.md#patchSubmission) | **PATCH** /submissions/{submissionId} | Partially update submission.
[**deleteSubmission**](SubmissionsApi.md#deleteSubmission) | **DELETE** /submissions/{submissionId} | Delete the submission.

<a name="searchSubmissions"></a>
# **searchSubmissions**
> searchSubmissions(reqQuery)

Search submissions. Link headers are sent back and they have rel set to prev, next, first, last and contain the relevant URL.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 3,
  type: 'ContestSubmission',
  url: 'https://software.topcoder.com/review/actions/DownloadContestSubmission?uid=123456',
  memberId: 'a12a4180-65aa-42ec-a945-5fd21dec0501',
  challengeId: 'a12a4180-65aa-42ec-a945-5fd21dec0502',
  legacySubmissionId: 'b24d4180-65aa-42ec-a945-5fd21dec0502',
  legacyUploadId: 'b24d4180-65aa-42ec-a945-5fd21dec0403',
  submissionPhaseId: 'b24d4180-65aa-42ec-a945-5fd21dec0502'
}

// Promise model
submissionApiClient
  .searchSubmissions(reqQuery)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.searchSubmissions(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchSubmissionsCriteria**](SearchSubmissionsCriteria.md) | the search submissions criteria 

### Return type

Array of [**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headSubmissions"></a>

# **headSubmissions**
> headSubmissions(reqQuery)

Same to search submissions, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqQuery = {
  page: 1,
  perPage: 3,
  type: 'ContestSubmission',
  url: 'https://software.topcoder.com/review/actions/DownloadContestSubmission?uid=123456',
  memberId: 'a12a4180-65aa-42ec-a945-5fd21dec0501',
  challengeId: 'a12a4180-65aa-42ec-a945-5fd21dec0502',
  legacySubmissionId: 'b24d4180-65aa-42ec-a945-5fd21dec0502',
  legacyUploadId: 'b24d4180-65aa-42ec-a945-5fd21dec0403',
  submissionPhaseId: 'b24d4180-65aa-42ec-a945-5fd21dec0502'
}

// Promise model
submissionApiClient
  .headSubmissions(reqQuery)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// Async / await model
await submissionApiClient.headSubmissions(reqQuery)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqQuery** | [**SearchSubmissionsCriteria**](SearchSubmissionsCriteria.md) | the search submissions criteria

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createSubmission"></a>

# **createSubmission**
> createSubmission(reqBody)

Create a submission.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const reqBody = {
  submission: file, // either this or url
  url: 'https://domain.com/file.zip', // either this or submission
  fileType: 'zip',
  type: 'ContestSubmission',
  memberId: 'a12a4180-65aa-42ec-a945-5fd21dec0501',
  challengeId: 'a12a4180-65aa-42ec-a945-5fd21dec0502',
  legacySubmissionId: 'b24d4180-65aa-42ec-a945-5fd21dec0502',
  legacyUploadId: 'b24d4180-65aa-42ec-a945-5fd21dec0403',
  submissionPhaseId: 'b24d4180-65aa-42ec-a945-5fd21dec0502'
}

// Promise model
submissionApiClient
  .createSubmission(reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.createSubmission(reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **reqBody** | [**SubmissionCreationData**](SubmissionCreationData.md) | the submission creation data 

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSubmission"></a>

# **getSubmission**
> getSubmission(submissionId)

Get the submission by id.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .getSubmission(submissionId)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.getSubmission(submissionId)
```
### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id 

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="headSubmission"></a>

# **headSubmission**
> headSubmission(submissionId)

Same to get submission, but only response status and headers information return.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .headSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.headSubmission(submissionId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id 

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateSubmission"></a>

# **updateSubmission**
> updateSubmission(submissionId, reqBody)

Fully update submission.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  type: 'ContestSubmission',
  url: 'https://software.topcoder.com/review/actions/DownloadContestSubmission?uid=123456',
  memberId: 'a12a4180-65aa-42ec-a945-5fd21dec0501',
  challengeId: 'a12a4180-65aa-42ec-a945-5fd21dec0502'
}

// Promise model
submissionApiClient
  .updateSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.updateSubmission(submissionId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id 
 **reqBody** | [**SubmissionData**](SubmissionData.md) | the submission data 

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="patchSubmission"></a>

# **patchSubmission**
> patchSubmission(submissionId, reqBody)

Partially update submission.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'
const reqBody = {
  type: 'ContestSubmission',
  url: 'https://software.topcoder.com/review/actions/DownloadContestSubmission?uid=123456',
  memberId: 'a12a4180-65aa-42ec-a945-5fd21dec0501',
  challengeId: 'a12a4180-65aa-42ec-a945-5fd21dec0502'
}

// Promise model
submissionApiClient
  .patchSubmission(submissionId, reqBody)
  .then(result => console.log(result.body, result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.patchSubmission(submissionId, reqBody)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id 
 **reqBody** | [**SubmissionData**](SubmissionData.md) | the submission data 

### Return type

[**Submission**](Submission.md)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteSubmission"></a>

# **deleteSubmission**
> deleteSubmission(submissionId)

Delete submission by id.

### Example
```javascript
const submissionApi = require('tc-submission-api-wrapper')
const submissionApiClient = submissionApi(_.pick(config,
      ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME',
        'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'SUBMISSION_API_URL',
        'AUTH0_PROXY_SERVER_URL']))

const submissionId = '8f4e8b6a-0ad2-4ff6-ab19-afeb102ff3b4'

// Promise model
submissionApiClient
  .deleteSubmission(submissionId)
  .then(result => console.log(result.status))
  .catch(err => console.log(err))

// async / await model
await submissionApiClient.deleteSubmission(submissionId)
```

### Parameters

Name | Type | Description
------------- | ------------- | -------------
 **submissionId** | String | the submission id 

### Return type

null (empty response body)

### Authorization

[Bearer](../README.md#authorization)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
