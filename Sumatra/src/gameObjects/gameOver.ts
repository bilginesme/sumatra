module FirstPhaser.Client {
    export class GameOver extends Phaser.Sprite {
   

        constructor(game: Phaser.Game) {
            super(game, game.width / 2, game.height / 2, 'imgGameOver');

            game.add.existing(this);
            this.anchor.set(0.5);
            this.visible = false;
        }

        update() {
        }

        showAndAnimate() {
            this.scale.setTo(0.5, 0.5);
            this.visible = true;
            var durationEnlarge = 500;
            var durationShrink = 1000;

            var tween = this.game.add.tween(this.scale).to({ x: 1.2, y: 1.2 }, durationEnlarge, Phaser.Easing.Cubic.In, true);
            tween.onComplete.add(function () { this.game.add.tween(this.scale).to({ x: 1, y: 1 }, durationShrink, Phaser.Easing.Elastic.Out, true); }, this);
        }
    }

}