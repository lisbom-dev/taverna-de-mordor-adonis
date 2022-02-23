export default () => ({
  temp: 0,
  orig: 0,
  modifyTempValue(value) {
    this.temp = value
  },
  modifyOrigValue(value) {
    this.orig = value
  },
})
