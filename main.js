import { Worker } from 'worker_threads'
import { configs } from './config.js'

// store the workers
const workers = []

configs.forEach((config) => {
  workers.push(new Worker('./worker.js', {
    workerData: config
  }))
})
