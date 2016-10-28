module FirstPhaser.Client {
    enum LeftOrRightEnum { Left, Right }

    export class Cloud extends Phaser.Sprite {
        velocity: number;
        footerText: Phaser.Text;
        leftOrRight: LeftOrRightEnum;

        constructor(game: Phaser.Game) {
            var strCloudImageName = '';
            if (game.rnd.sign() == -1)
                strCloudImageName = 'imgCloudSmall';
            else
                strCloudImageName = 'imgCloudLarge';

            super(game, 0, 0, strCloudImageName);

            if (game.rnd.sign() == -1) {
                this.leftOrRight = LeftOrRightEnum.Left;
                this.velocity = game.rnd.between(0, 5);
            }
            else {
                this.leftOrRight = LeftOrRightEnum.Right;
                
                this.velocity = -game.rnd.between(0, 5);
            }

            this.x = game.rnd.between(0, game.width);
            this.y = game.rnd.between(0, game.height / 2);

            this.anchor.setTo(0.5);
            this.alpha = 0.5 + game.rnd.realInRange(0, 0.1 * this.velocity);
            if (game.rnd.sign() == -1)
                this.scale.x = -1;
            else
                this.scale.x = 1;

            game.add.existing(this);

            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = false;
            this.body.setCircle(20);
            
            this.body.velocity.x = this.velocity;

            //this.footerText = this.game.add.text(0, 100, this.leftOrRight.toString(), { font: "12px Arial", fill: "#FFFFFF", align: "center" });
        }

        update() {
        }

    }

}