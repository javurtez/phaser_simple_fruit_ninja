export class TBSize extends Phaser.Structs.Size {

    _minAspectRatio;
    _width;
    _height;

    constructor(width, height, aspectMode, parent, minAspectRatio) {
        super(width, height, aspectMode, parent);
        this._minAspectRatio = minAspectRatio;
    }

    setSize(width, height) {
        if (width === undefined) width = 0;
        if (height === undefined) height = width;

        switch (this.aspectMode) {
            case Phaser.Scale.NONE:
                this._width = this.getNewWidth(Phaser.Math.Snap.Floor(width, this.snapTo.x));
                this._height = this.getNewHeight(Phaser.Math.Snap.Floor(height, this.snapTo.y));
                this.setAspectRatio(this._height === 0 ? 1 : this._width / this._height);
                break;

            case Phaser.Scale.WIDTH_CONTROLS_HEIGHT:
                if (height / width < this._minAspectRatio) {
                    let tWidth = height / this._minAspectRatio;
                    this._width = this.getNewWidth(Phaser.Math.Snap.Floor(tWidth, this.snapTo.x));
                    this._height = this.getNewHeight(this._width * (1 / this.aspectRatio), false);
                } else {
                    this._width = this.getNewWidth(Phaser.Math.Snap.Floor(width, this.snapTo.x));
                    this._height = this.getNewHeight(this._width * (1 / this.aspectRatio), false);
                }
                break;

            case Phaser.Scale.HEIGHT_CONTROLS_WIDTH: // CUSTOM
                if (width / height < this._minAspectRatio) {
                    // set it based on the cap
                    let tHeight = width / this._minAspectRatio;
                    this._height = this.getNewHeight(Phaser.Math.Snap.Floor(tHeight, this.snapTo.y));
                    this._width = this.getNewWidth(this._height * this.aspectRatio, false);
                } else {
                    this._height = this.getNewHeight(Phaser.Math.Snap.Floor(height, this.snapTo.y));
                    this._width = this.getNewWidth(this._height * this.aspectRatio, false);
                }
                break;

            case Phaser.Scale.FIT:
                this.constrain(width, height, true);
                break;

            case Phaser.Scale.ENVELOP:
                this.constrain(width, height, false);
                break;
        }

        return this;
    }
}
