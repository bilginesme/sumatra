module FirstPhaser.Client {
    export enum BillboardTypeEnum { Lives, Points }

    export class Billboard extends Phaser.Sprite {
        private txt: Phaser.Text;
        private value: number;

        constructor(game: Phaser.Game, pos: Phaser.Point, billboardType: BillboardTypeEnum) {
            if (billboardType == BillboardTypeEnum.Lives)
                super(game, pos.x, pos.y, 'imgBGLives');
            else
                super(game, pos.x, pos.y, 'imgBGPoints');

            game.add.existing(this);
            this.anchor.set(0.5);

            this.txt = this.game.add.text(pos.x + 20, pos.y, "", { font: "bold 32px Arial", fill: "#FFFFFF", align: "center" });
            this.txt.anchor.setTo(0.5);

            this.value = 0;
        }

        update() {
        }

        private enlarge() {
            var normEnlarge = 300;
            var durationEnlarge = normEnlarge + normEnlarge * 0.25 * (Math.random() - 0.5);

            var normShrink = 500;
            var durationShrink = normShrink + normShrink * 0.25 * (Math.random() - 0.5);

            var tween = this.game.add.tween(this.scale).to({ x: 1.1, y: 1.1 }, durationEnlarge, Phaser.Easing.Bounce.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ x: 1, y: 1 }, durationShrink, Phaser.Easing.Elastic.Out, true); }, this);

            var tweenText = this.game.add.tween(this.txt.scale).to({ x: 1.1, y: 1.1 }, durationEnlarge, Phaser.Easing.Bounce.In, true);
            tweenText.onComplete.add(function () { this.game.add.tween(this.txt.scale).to({ x: 1, y: 1 }, durationShrink, Phaser.Easing.Elastic.Out, true); }, this);
        }

        changeValue(newValue: number, isAnimate: boolean) {
            this.value = newValue;
            this.txt.setText(this.value.toString());
            if (isAnimate)
                this.enlarge();
        }

    }

}