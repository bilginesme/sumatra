module FirstPhaser.Client {

    export class Player extends Phaser.Sprite {
        footerText: Phaser.Text;
        num: number;

        constructor(game: Phaser.Game, x: number, y: number, num: number) {
            super(game, x, y,'level01-sprites', 1);
            this.anchor.setTo(0.5);
            this.animations.add('fly', [0, 1], 5, true);
            game.add.existing(this);
            this.num = num;

            // Physics
            game.physics.enable(this);
            this.body.collideWorldBounds = true;
            this.body.setCircle(20);
            
            this.footerText = this.game.add.text(10, 15 * num, "Bilgin Eşme", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
        }

        update() {
            this.body.velocity.x = 0;
            var velocity = this.game.rnd.integerInRange(1, 100);
            this.footerText.setText(velocity.toString());

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -velocity;
                this.animations.play('fly');
                if (this.scale.x === -1) 
                    this.scale.x = 1;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = velocity;
                this.animations.play('fly');
                if (this.scale.x === 1) 
                    this.scale.x = -1;
            } else {
                this.animations.frame = 0;
            }
        }

    }

}