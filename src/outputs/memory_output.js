/** @file memory_output.js
 * @author Authored in 2019 at <https://github.com/nicky-nym/city3d>
 * @license UNLICENSE
 * This is free and unencumbered software released into the public domain.
 * For more information, please refer to <http://unlicense.org>
 */

import { TableOutput } from './table_output.js'

/* global performance */

/**
 * MemoryOutput can display information about JavaScript heap usage.
 * By calling add() before and after a piece of code, an estimate of the memory usage of that
 * code is obtained. See examples/sandbox-memory.html for an example.
 * Measurements are inherently noisy, and occasionally wildly inaccurate due to garbage
 * collection, so repeated measurements should be taken.
 */
class MemoryOutput extends TableOutput {
  constructor (city) {
    super(city, 'JavaScript Heap Usage')
    this.prev = {}
  }

  render () {
    const headers = ['time', 'note', 'active', 'delta(active)', 'total allocated', 'delta(total)']
    this.renderHeaderRow(headers)
    const subheaders = ['', '', '[usedJSHeapSize]', '', '[totalJSHeapSize]', '']
    this.renderHeaderRow(subheaders)
  }

  currentQueueDone () {
    return new Promise(resolve => setTimeout(resolve, 0))
  }

  async add (note) {
    await this.currentQueueDone()
    const stats = performance.memory
    const stringValues = []
    stringValues.push((new Date()).toTimeString().substr(0, 8))
    stringValues.push(note)
    stringValues.push(TableOutput.toStringWithCommas(stats.usedJSHeapSize))
    stringValues.push(TableOutput.toStringWithCommas(stats.usedJSHeapSize - this.prev.usedJSHeapSize))
    stringValues.push(TableOutput.toStringWithCommas(stats.totalJSHeapSize))
    stringValues.push(TableOutput.toStringWithCommas(stats.totalJSHeapSize - this.prev.totalJSHeapSize))
    this.renderBodyRow(stringValues)
    this.prev = stats
  }
}

export { MemoryOutput }
