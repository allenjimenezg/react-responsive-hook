export class Device {
  private _mediaQuery: string
  private _name: string
  private _minWidth: number
  private _maxWidth: number

  get mediaQuery() {
    return this._mediaQuery
  }

  get minWidth() {
    return this._minWidth
  }

  get maxWidth() {
    return this._maxWidth
  }

  get name() {
    return this._name
  }

  constructor(name: string, minWidth: number, maxWidth: number) {
    this._name = name
    this._minWidth = minWidth
    this._maxWidth = maxWidth
    this._mediaQuery = this.buildMediaQuery(this.minWidth, this.maxWidth)
  }

  // TODO: Move this to a MediaQueryService class
  private buildMediaQuery(minWidth, maxWidth) {
    return `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
  }

  public equals(device: Device) {
    return device.name === this.name
  }

  public toString() {
    return this.name
  }
}
