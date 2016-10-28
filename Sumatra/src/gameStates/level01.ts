module FirstPhaser.Client {

    export class Level01 extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player1: Player;
        player2: Player;
        footerText: Phaser.Text;

        create() {
            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = this.add.sprite(0, 0, 'level01-sprites','background');
            this.player1 = new Player(this.game, this.world.centerX, 200, 1);
            this.player1.anchor.setTo(0, 5);

            this.player2 = new Player(this.game, this.world.centerX, 500, 2);
            this.player2.anchor.setTo(0, 5);

            //this.game.debug.text("Use Right and Left arrow keys to move the bat", 0, this.world.height, "red");
            
            this.footerText = this.game.add.text(this.world.centerX, this.world.height - 10, "Use Right and Left arrow keys to move the bat", { font: "16px Arial", fill: "#FFFFFF", align: "center" });
            this.footerText.anchor.setTo(0.5);
        }

        update() {
            this.footerText.setText(this.game.rnd.integerInRange(1, 100).toString());
        }

    }

}