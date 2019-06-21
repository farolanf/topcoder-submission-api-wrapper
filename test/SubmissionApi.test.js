/*
 * Tests for Submission APIs
 */

const fs = require('fs')
const FormData = require('form-data')
const _ = require('lodash')
const should = require('chai').should()
const config = require('./testConfig')
const api = require('../index')

const client = api(config)
const failClient = api(_.assign(_.cloneDeep(config), { 'AUTH0_CLIENT_ID': 'invalid' }))
const notFoundId = 'ace32387-8b33-47f1-8b01-6578b817a188'

let createdSubmissionId

let submissionId
let type
let url
let memberId
let challengeId
let type2
let url2
let memberId2
let challengeId2

describe('Submission API Tests', () => {
  describe('Test search submissions', () => {
    it(`search submissions no criteria success`, async () => {
      const res = await client.searchSubmissions({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      for (const item of res.body) {
        should.exist(item.id)
        should.exist(item.type)
        should.exist(item.url)
        should.exist(item.memberId)
        should.exist(item.challengeId)
        should.exist(item.created)
        should.exist(item.updated)
        should.exist(item.createdBy)
        should.exist(item.updatedBy)
      }

      // set test data from searched submissions
      submissionId = res.body[0].id
      type = res.body[0].type
      url = res.body[0].url
      memberId = res.body[0].memberId
      challengeId = res.body[0].challengeId

      for (const item of res.body) {
        if (!type2 || type2 === type) {
          type2 = item.type
        }
        if (!url2 || url2 === url) {
          url2 = item.url
        }
        if (!memberId2 || memberId2 === memberId) {
          memberId2 = item.memberId
        }
        if (!challengeId2 || challengeId2 === challengeId) {
          challengeId2 = item.challengeId
        }
      }
    })

    it('search submissions by criteria success', async () => {
      const res = await client.searchSubmissions({
        page: 1,
        perPage: 3,
        type,
        url,
        memberId,
        challengeId
      })
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('3', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
      should.equal(true, res.body.length > 0)
      for (const item of res.body) {
        should.exist(item.id)
        should.equal(item.type, type)
        should.equal(item.url, url)
        should.equal(item.memberId, memberId)
        should.equal(item.challengeId, challengeId)
      }
    })

    it('failure - search submissions with invalid page', async () => {
      try {
        await client.searchSubmissions({
          page: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"page" must be larger than or equal to 1')
      }
    })

    it(`failure - search submissions with invalid perPage`, async () => {
      try {
        await client.searchSubmissions({
          perPage: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"perPage" must be larger than or equal to 1')
      }
    })

    it(`failure - search submissions with invalid url`, async () => {
      try {
        await client.searchSubmissions({
          url: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"url" must be a valid uri')
      }
    })

    it(`failure - search submissions with invalid memberId`, async () => {
      try {
        await client.searchSubmissions({
          memberId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" must be a number')
      }
    })

    it(`failure - search submissions with invalid challengeId`, async () => {
      try {
        await client.searchSubmissions({
          challengeId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"challengeId" must be a number')
      }
    })

    it(`failure - search submissions with invalid m2m credential`, async () => {
      try {
        await failClient.searchSubmissions({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test head submissions', () => {
    it(`head submissions no criteria success`, async () => {
      const res = await client.headSubmissions({})
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('20', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`head submissions by criteria success`, async () => {
      const res = await client.headSubmissions({
        page: 1,
        perPage: 3,
        type,
        url,
        memberId,
        challengeId
      })
      should.equal(res.status, 200)
      should.equal('1', res.header['x-page'])
      should.equal('3', res.header['x-per-page'])
      should.exist(res.header['x-total'])
      should.exist(res.header['x-total-pages'])
    })

    it(`failure - head submissions with invalid page`, async () => {
      try {
        await client.headSubmissions({
          page: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head submissions with invalid perPage`, async () => {
      try {
        await client.headSubmissions({
          perPage: -1
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head submissions with invalid url`, async () => {
      try {
        await client.headSubmissions({
          url: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head submissions with invalid memberId`, async () => {
      try {
        await client.headSubmissions({
          memberId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head submissions with invalid challengeId`, async () => {
      try {
        await client.headSubmissions({
          challengeId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })

    it(`failure - head submissions with invalid m2m credential`, async () => {
      try {
        await failClient.headSubmissions({})
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })
  })

  describe('Test create submission', () => {
    it(`Create submission with file url success`, async () => {
      const res = await client.createSubmission({
        url,
        fileType: 'zip',
        type,
        memberId,
        challengeId
      })
      createdSubmissionId = res.body.id
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.url, url)
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
    })

    it(`Create submission with file upload success`, async () => {
      const res = await client.createSubmission(req => req
        .attach('submission', './test/common/fileToUpload.zip')
        .field('fileType', 'zip')
        .field('type', type)
        .field('memberId', memberId)
        .field('challengeId', challengeId))
      createdSubmissionId = res.body.id
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.fileType, 'zip')
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
    })

    it(`Create submission with FormData success`, async () => {
      const fd = new FormData()
      fd.append('submission', fs.createReadStream('./test/common/fileToUpload.zip'))
      fd.append('fileType', 'zip')
      fd.append('type', type)
      fd.append('memberId', memberId)
      fd.append('challengeId', challengeId)
      const res = await client.createSubmission(fd)
      createdSubmissionId = res.body.id
      should.equal(res.status, 200)
      should.equal(res.body.type, type)
      should.equal(res.body.fileType, 'zip')
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
    })

    it(`failure - Create submission with invalid m2m credential`, async () => {
      try {
        await failClient.createSubmission({
          url,
          type,
          memberId,
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Create submission with invalid request body, missing submission and url`, async () => {
      try {
        await client.createSubmission({
          fileType: 'zip',
          type,
          memberId,
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Either file to be uploaded or URL should be present')
      }
    })

    it(`failure - Create submission with invalid request body, providing both submission and url`, async () => {
      try {
        await client.createSubmission(req => req
          .attach('submission', './test/common/fileToUpload.zip')
          .field('url', url)
          .field('fileType', 'zip')
          .field('type', type)
          .field('memberId', memberId)
          .field('challengeId', challengeId))
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, 'Either file to be uploaded or URL should be present')
      }
    })

    it(`failure - Create submission with invalid request body, invalid url`, async () => {
      try {
        await client.createSubmission({
          url: 'abc',
          fileType: 'zip',
          type,
          memberId,
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"url" must be a valid uri')
      }
    })

    it(`failure - Create submission with invalid request body, missing type`, async () => {
      try {
        await client.createSubmission({
          url,
          fileType: 'zip',
          memberId,
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"type" is required')
      }
    })

    it(`failure - Create submission with invalid request body, invalid memberId`, async () => {
      try {
        await client.createSubmission({
          url,
          fileType: 'zip',
          type,
          memberId: 'abc',
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" must be a number')
      }
    })

    it(`failure - Create submission with invalid request body, missing memberId`, async () => {
      try {
        await client.createSubmission({
          url,
          fileType: 'zip',
          type,
          challengeId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" is required')
      }
    })

    it(`failure - Create submission with invalid request body, invalid challengeId`, async () => {
      try {
        await client.createSubmission({
          url,
          fileType: 'zip',
          type,
          memberId,
          challengeId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"challengeId" must be a number')
      }
    })

    it(`failure - Create submission with invalid request body, missing challengeId`, async () => {
      try {
        await client.createSubmission({
          url,
          fileType: 'zip',
          type,
          memberId
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"challengeId" is required')
      }
    })
  })

  describe('Test get submission by id', () => {
    it('Get submission by id success', async () => {
      const res = await client.getSubmission(submissionId)
      should.equal(res.status, 200)
      should.equal(res.body.id, submissionId)
      should.equal(res.body.type, type)
      should.equal(res.body.url, url)
      should.equal(res.body.memberId, memberId)
      should.equal(res.body.challengeId, challengeId)
    })

    it(`failure - Get submission with invalid m2m credential`, async () => {
      try {
        await failClient.getSubmission(submissionId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Get submission by id not found`, async () => {
      try {
        await client.getSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Get submission by invalid id`, async () => {
      try {
        await client.getSubmission('abc')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })
  })

  describe('Test head submission by id', () => {
    it(`Head submission by id success`, async () => {
      const res = await client.headSubmission(submissionId)
      should.equal(res.status, 200)
    })

    it(`failure - Head submission with invalid m2m credential`, async () => {
      try {
        await failClient.headSubmission(submissionId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Head submission by id not found`, async () => {
      try {
        await client.headSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
      }
    })

    it(`failure - Head submission by invalid id`, async () => {
      try {
        await client.headSubmission('abc')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
      }
    })
  })

  describe('Test put submission by id', () => {
    it(`Put submission by id success`, async () => {
      const res = await client.updateSubmission(createdSubmissionId, {
        type: type2,
        url: url2,
        memberId: memberId2,
        challengeId: challengeId2
      })
      should.equal(res.status, 200)
      should.equal(res.body.type, type2)
      should.equal(res.body.url, url2)
      should.equal(res.body.memberId, memberId2)
      should.equal(res.body.challengeId, challengeId2)
    })

    it(`failure - Put submission with invalid m2m credential`, async () => {
      try {
        await failClient.updateSubmission(createdSubmissionId, {
          type: type2,
          url: url2,
          memberId: memberId2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Put submission by invalid id`, async () => {
      try {
        await client.updateSubmission('abc', {
          type: type2,
          url: url2,
          memberId: memberId2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })

    it(`failure - Put submission by id not found`, async () => {
      try {
        await client.updateSubmission(notFoundId, {
          type: type2,
          url: url2,
          memberId: memberId2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Put submission by id with invalid type`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: 123,
          url: url2,
          memberId: memberId2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"type" must be a string')
      }
    })

    it(`failure - Put submission by id with invalid url`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: type2,
          url: 'abc',
          memberId: memberId2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"url" must be a valid uri')
      }
    })

    it(`failure - Put submission by id with missing url`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: type2,
          memberId: memberId2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"url" is required')
      }
    })

    it(`failure - Put submission by id with invalid memberId`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: type2,
          url: url2,
          memberId: 'abc',
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" must be a number')
      }
    })

    it(`failure - Put submission by id with missing memberId`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: type2,
          url: url2,
          challengeId: challengeId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" is required')
      }
    })

    it(`failure - Put submission by id with invalid challengeId`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: type2,
          url: url2,
          memberId: memberId2,
          challengeId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"challengeId" must be a number')
      }
    })

    it(`failure - Put submission by id with missing challengeId`, async () => {
      try {
        await client.updateSubmission(createdSubmissionId, {
          type: type2,
          url: url2,
          memberId: memberId2
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"challengeId" is required')
      }
    })
  })

  describe('Test patch submission by id', () => {
    it(`Patch submission by id success 1`, async () => {
      const res = await client.patchSubmission(createdSubmissionId, {
        url,
        type
      })
      should.equal(res.status, 200)
      should.equal(res.body.id, createdSubmissionId)
      should.equal(res.body.url, url)
      should.equal(res.body.type, type)
    })

    it(`Patch submission by id success 2`, async () => {
      const res = await client.patchSubmission(createdSubmissionId, {
        url: url2,
        type: type2,
      })
      should.equal(res.status, 200)
      should.equal(res.body.id, createdSubmissionId)
      should.equal(res.body.url, url2)
      should.equal(res.body.type, type2)
    })

    it(`failure - Patch submission with invalid m2m credential`, async () => {
      try {
        await failClient.patchSubmission(createdSubmissionId, {
          type
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Patch submission by invalid id`, async () => {
      try {
        await client.patchSubmission('abc', {
          type
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })

    it(`failure - Patch submission by id not found`, async () => {
      try {
        await client.patchSubmission(notFoundId, {
          type
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Patch submission by id with invalid url`, async () => {
      try {
        await client.patchSubmission(createdSubmissionId, {
          url: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"url" must be a valid uri')
      }
    })

    it(`failure - Patch submission by id with invalid type`, async () => {
      try {
        await client.patchSubmission(createdSubmissionId, {
          type: 123
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"type" must be a string')
      }
    })

    it(`failure - Patch submission by id with invalid memberId`, async () => {
      try {
        await client.patchSubmission(createdSubmissionId, {
          memberId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"memberId" must be a number')
      }
    })

    it(`failure - Patch submission by id with invalid challengeId`, async () => {
      try {
        await client.patchSubmission(createdSubmissionId, {
          challengeId: 'abc'
        })
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"challengeId" must be a number')
      }
    })
  })

  describe('Test delete submission by id', () => {
    it(`Delete submission by id success`, async () => {
      const res = await client.deleteSubmission(createdSubmissionId)
      should.equal(res.status, 204)
    })

    it(`failure - Delete submission with invalid m2m credential`, async () => {
      try {
        await failClient.deleteSubmission(submissionId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.message, 'Unknown Error')
      }
    })

    it(`failure - Delete submission by id not found`, async () => {
      try {
        await client.deleteSubmission(notFoundId)
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 404)
        should.equal(err.response.body.message, `Submission with ID = ${notFoundId} is not found`)
      }
    })

    it(`failure - Delete submission by invalid id`, async () => {
      try {
        await client.deleteSubmission('abc')
        throw new Error('should not throw error here')
      } catch (err) {
        should.equal(err.status, 400)
        should.equal(err.response.body.message, '"submissionId" must be a valid GUID')
      }
    })
  })
})
