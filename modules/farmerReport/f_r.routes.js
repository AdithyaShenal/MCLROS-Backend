import * as schemas from './f_r.validator.js'
import * as farmerReportController from './f_r.controller.js'
import express from 'express'

const router = express.Router()

router.post(
  '/reports',
  schemas.bodyValidator(schemas.createReportSchema),
  farmerReportController.create
)

router.delete(
  '/reports/:report_id',
  schemas.paramsValidator(schemas.reportIDSchema),
  farmerReportController.delete_report
)

router.get(
  '/reports',
  schemas.queryValidator(schemas.getAllSchema),
  farmerReportController.getAll
)

router.get(
  '/reports/:report_id',
  schemas.paramsValidator(schemas.reportIDSchema),
  farmerReportController.get_report
)

router.put(
  '/reports/:report_id',
  schemas.paramsValidator(schemas.reportIDSchema),
  schemas.bodyValidator(schemas.updateReportSchema),
  farmerReportController.update_report
)

export default router
