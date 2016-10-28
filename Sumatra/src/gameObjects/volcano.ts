module FirstPhaser.Client {

    export class Volcano extends Phaser.Sprite {
        footerText: Phaser.Text;
        volcanoCrest: Phaser.Sprite;
        volcanoSmoke: Phaser.Sprite;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, 0, 0);
            
            game.add.existing(this);
            this.volcanoCrest = new Phaser.Sprite(game, x, y, 'imgVolcanoCrest');
            this.volcanoCrest.anchor.setTo(0.5, 1);

            this.volcanoSmoke = new Phaser.Sprite(game, x, y - this.volcanoCrest.height, 'imgVolcanoSmoke');
            this.volcanoSmoke.anchor.set(0, 1);

            this.addChild(this.volcanoCrest);
            this.addChild(this.volcanoSmoke);

            this.smokeFadeOut();
            
            //this.footerText = this.game.add.text(10, 500, "JeepText", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
        }

        update() {
        }

        private smokeFadeIn() {
            var tween = this.game.add.tween(this.volcanoSmoke).to({ alpha: 1 }, 5000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.smokeFadeOut, this);
        }
        private smokeFadeOut() {
            var tween = this.game.add.tween(this.volcanoSmoke).to({ alpha: 0 }, 5000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.smokeFadeIn, this);
        }
        isInArea(x, y) {
            if (x > this.volcanoCrest.left
                && x < this.volcanoCrest.right
                && y > this.volcanoCrest.top
                && y < this.volcanoCrest.bottom)
                return true;
            else
                return false;
        }
        tickleMe(x, y) {
            if (this.isInArea(x, y)) {
                var tween = this.game.add.tween(this.volcanoCrest.scale).to({ x: 1.05, y: 1.15 }, 200, Phaser.Easing.Bounce.In, true);
                tween.onComplete.add(this.releaseTickle, this);

                return true;
            }
            else {
                return false;
            }
        }
        private releaseTickle() {
            this.game.add.tween(this.volcanoCrest.scale).to({ x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true)
        }
        getFireballLocation() { return new Phaser.Point(this.volcanoCrest.x, this.volcanoCrest.y - this.volcanoCrest.height + 50); }
    }

}